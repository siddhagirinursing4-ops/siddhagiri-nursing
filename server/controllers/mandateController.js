import Mandate from '../models/Mandate.js';
import AcademicYear from '../models/AcademicYear.js';
import { uploadToCloudinary, deleteFromCloudinary, copyCloudinaryFile } from '../config/cloudinary.js';

export const getMandates = async (req, res, next) => {
  try {
    const { year } = req.query;
    const filter = year ? { academicYear: year } : {};
    
    const mandates = await Mandate.find(filter)
      .sort('-createdAt')
      .populate('uploadedBy', 'name email');

    res.status(200).json({
      success: true,
      count: mandates.length,
      data: mandates
    });
  } catch (error) {
    next(error);
  }
};

export const getMandate = async (req, res, next) => {
  try {
    const mandate = await Mandate.findById(req.params.id).populate('uploadedBy', 'name email');

    if (!mandate) {
      return res.status(404).json({
        success: false,
        message: 'Mandate not found'
      });
    }

    res.status(200).json({
      success: true,
      data: mandate
    });
  } catch (error) {
    next(error);
  }
};

export const createMandate = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a PDF file'
      });
    }

    if (!req.body.academicYear) {
      return res.status(400).json({
        success: false,
        message: 'Academic year is required'
      });
    }
    
    const result = await uploadToCloudinary(req.file, `mandates/${req.body.academicYear}`);

    const mandate = await Mandate.create({
      ...req.body,
      pdfFile: {
        url: result.secure_url,
        publicId: result.public_id,
        filename: req.file.originalname,
        size: result.bytes ?? req.file.size
      },
      uploadedBy: req.user.id
    });

    res.status(201).json({
      success: true,
      data: mandate
    });
  } catch (error) {
    next(error);
  }
};

export const updateMandate = async (req, res, next) => {
  try {
    let mandate = await Mandate.findById(req.params.id);

    if (!mandate) {
      return res.status(404).json({
        success: false,
        message: 'Mandate not found'
      });
    }

    const updateData = { ...req.body };

    if (req.file) {
      if (mandate.pdfFile?.publicId) {
        await deleteFromCloudinary(mandate.pdfFile.publicId, 'raw');
      }

      const result = await uploadToCloudinary(req.file, `mandates/${req.body.academicYear || mandate.academicYear}`);
      
      updateData.pdfFile = {
        url: result.secure_url,
        publicId: result.public_id,
        filename: req.file.originalname,
        size: result.bytes ?? req.file.size
      };
    }

    mandate = await Mandate.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: mandate
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMandate = async (req, res, next) => {
  try {
    const mandate = await Mandate.findById(req.params.id);

    if (!mandate) {
      return res.status(404).json({
        success: false,
        message: 'Mandate not found'
      });
    }

    if (mandate.pdfFile?.publicId) {
      await deleteFromCloudinary(mandate.pdfFile.publicId, 'raw');
    }

    await mandate.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Mandate deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const getAcademicYears = async (req, res, next) => {
  try {
    // Fetch all academic years from database
    const years = await AcademicYear.find().sort({ academicYear: 1 });
    
    // For each year, aggregate count of associated mandates
    const yearsWithCounts = await Promise.all(
      years.map(async (year) => {
        const mandateCount = await Mandate.countDocuments({ 
          academicYear: year.academicYear 
        });
        
        return {
          academicYear: year.academicYear,
          isCurrent: false,
          mandateCount
        };
      })
    );
    
    // Mark most recent year as current
    if (yearsWithCounts.length > 0) {
      yearsWithCounts[yearsWithCounts.length - 1].isCurrent = true;
    }
    
    res.status(200).json({
      success: true,
      data: yearsWithCounts
    });
  } catch (error) {
    next(error);
  }
};

export const createAcademicYear = async (req, res, next) => {
  try {
    const { academicYear } = req.body;
    
    // Validate year format using regex
    const yearFormatRegex = /^\d{4}-\d{4}$/;
    if (!yearFormatRegex.test(academicYear)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid year format. Use YYYY-YYYY (e.g., 2026-2027)'
      });
    }
    
    // Validate end year is start year + 1
    const [startYear, endYear] = academicYear.split('-').map(Number);
    if (endYear !== startYear + 1) {
      return res.status(400).json({
        success: false,
        message: 'End year must be exactly one year after start year'
      });
    }
    
    // Check if year already exists (return 409 if duplicate)
    const existingYear = await AcademicYear.findOne({ academicYear });
    if (existingYear) {
      return res.status(409).json({
        success: false,
        message: `Academic year ${academicYear} already exists`
      });
    }
    
    // Create new AcademicYear record
    const newYear = await AcademicYear.create({
      academicYear,
      createdBy: req.user.id
    });
    
    // Find previous year
    const previousYear = await AcademicYear.getPreviousYear(academicYear);
    
    let mandatesCopied = 0;
    let previousYearString = null;
    const failures = [];
    
    // If previous year exists, copy its PDFs
    if (previousYear) {
      previousYearString = previousYear.academicYear;
      const previousMandates = await Mandate.find({ 
        academicYear: previousYear.academicYear 
      });

      // Copy each mandate file into the new year folder in Cloudinary
      for (const mandate of previousMandates) {
        try {
          let newFile = null;

          if (mandate.pdfFile?.publicId) {
            // Copy within Cloudinary (preferred)
            newFile = await copyCloudinaryFile(
              mandate.pdfFile.publicId,
              `mandates/${academicYear}`
            );
          }

          // If we can't copy (older local-storage mandates), just reference the same URL.
          // This still makes the "new year" usable without losing access.
          await Mandate.create({
            title: mandate.title,
            academicYear: academicYear,
            annexureNumber: mandate.annexureNumber,
            pdfFile: newFile
              ? {
                  url: newFile.url,
                  publicId: newFile.publicId,
                  filename: mandate.pdfFile.filename,
                  size: newFile.size ?? mandate.pdfFile.size
                }
              : {
                  url: mandate.pdfFile.url,
                  publicId: mandate.pdfFile.publicId,
                  filename: mandate.pdfFile.filename,
                  size: mandate.pdfFile.size
                },
            uploadedBy: req.user.id,
            migratedFrom: previousYear.academicYear
          });

          mandatesCopied++;
        } catch (error) {
          console.error(`Failed to copy mandate ${mandate._id}:`, error);
          failures.push({
            mandateId: mandate._id,
            title: mandate.title,
            error: error.message
          });
        }
      }
    }
    
    // Return success with migration summary
    res.status(201).json({
      success: true,
      data: {
        academicYear: newYear.academicYear,
        isCurrent: true,
        mandatesCopied,
        previousYear: previousYearString,
        failures: failures.length > 0 ? failures : undefined
      }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAcademicYear = async (req, res, next) => {
  try {
    const { year } = req.params;
    
    // Find the academic year
    const academicYear = await AcademicYear.findOne({ academicYear: year });
    
    if (!academicYear) {
      return res.status(404).json({
        success: false,
        message: `Academic year ${year} not found`
      });
    }
    
    // Prevent deletion of current year
    if (academicYear.isCurrent) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete the current academic year'
      });
    }
    
    // Find all mandates for this year
    const mandates = await Mandate.find({ academicYear: year });
    const mandateCount = mandates.length;

    // Delete assets from Cloudinary (best-effort) then delete DB records
    for (const mandate of mandates) {
      if (mandate.pdfFile?.publicId) {
        await deleteFromCloudinary(mandate.pdfFile.publicId, 'raw');
      }
    }

    await Mandate.deleteMany({ academicYear: year });
    
    // Delete the academic year record
    await academicYear.deleteOne();
    
    res.status(200).json({
      success: true,
      message: `Academic year ${year} deleted successfully`,
      data: {
        academicYear: year,
        mandatesDeleted: mandateCount
      }
    });
  } catch (error) {
    next(error);
  }
};
