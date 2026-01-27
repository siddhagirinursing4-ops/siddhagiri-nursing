import { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Plus, Trash2, Edit2, FileText, Search, Download, Eye, Calendar, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../lib/axios';

// AddYearModal Component
function AddYearModal({ onClose, onSuccess }) {
  const [yearInput, setYearInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);

  const validateYearFormat = (year) => {
    const yearRegex = /^\d{4}-\d{4}$/;
    if (!yearRegex.test(year)) {
      return 'Invalid format. Use YYYY-YYYY (e.g., 2026-2027)';
    }

    const [startYear, endYear] = year.split('-').map(Number);
    if (endYear !== startYear + 1) {
      return 'End year must be exactly one year after start year';
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(null);

    // Client-side validation
    const validationError = validateYearFormat(yearInput);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post('/mandates/years', {
        academicYear: yearInput
      });

      // Show success message with migration summary
      setSuccess(data.data);
      toast.success(
        `Academic year ${data.data.academicYear} created successfully! ${
          data.data.mandatesMigrated > 0
            ? `Migrated ${data.data.mandatesMigrated} mandates from ${data.data.previousYear}.`
            : 'No previous year found - empty year created.'
        }`
      );

      // Wait a moment to show success message, then close and refresh
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to create academic year';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Calendar className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Add New Academic Year</h2>
        </div>

        {success ? (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">
                    Year Created Successfully!
                  </h3>
                  <p className="text-sm text-green-700">
                    Academic year <span className="font-semibold">{success.academicYear}</span> has been created.
                  </p>
                  {success.mandatesMigrated > 0 && (
                    <div className="mt-3 pt-3 border-t border-green-200">
                      <p className="text-sm text-green-700 font-medium mb-1">Migration Summary:</p>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Migrated from: {success.previousYear}</li>
                        <li>• Mandates copied: {success.mandatesMigrated}</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Academic Year *
              </label>
              <input
                type="text"
                value={yearInput}
                onChange={(e) => {
                  setYearInput(e.target.value);
                  setError('');
                }}
                placeholder="2026-2027"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  error ? 'border-red-300' : 'border-gray-300'
                }`}
                disabled={loading}
                autoFocus
              />
              <p className="text-xs text-gray-500 mt-1">
                Format: YYYY-YYYY (e.g., 2026-2027)
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs text-blue-700">
                <strong>Note:</strong> If a previous year exists, all mandate PDFs will be automatically copied to the new year.
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !yearInput}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creating...
                  </span>
                ) : (
                  'Create Year'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export function MandateManagementPage() {
  const [mandates, setMandates] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [yearFilter, setYearFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddYearModal, setShowAddYearModal] = useState(false);
  const [showDeleteYearModal, setShowDeleteYearModal] = useState(false);
  const [yearToDelete, setYearToDelete] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [editingMandate, setEditingMandate] = useState(null);

  // Upload form state
  const [uploadData, setUploadData] = useState({
    title: '',
    academicYear: '',
    annexureNumber: '',
    pdf: null
  });

  // Edit form state
  const [editData, setEditData] = useState({
    title: '',
    academicYear: '',
    annexureNumber: ''
  });

  useEffect(() => {
    fetchAcademicYears();
    fetchMandates();
  }, [yearFilter]);

  const fetchAcademicYears = async () => {
    try {
      const { data } = await api.get('/mandates/years');
      setAcademicYears(data.data);
    } catch (error) {
      toast.error('Failed to fetch academic years');
    }
  };

  const fetchMandates = async () => {
    try {
      setLoading(true);
      const params = yearFilter !== 'all' ? { year: yearFilter } : {};
      const { data } = await api.get('/mandates', { params });
      setMandates(data.data);
    } catch (error) {
      toast.error('Failed to fetch mandates');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (file.type !== 'application/pdf') {
        toast.error('Please upload a PDF file');
        return;
      }

      // Validate file size (50MB max)
      if (file.size > 50 * 1024 * 1024) {
        toast.error('File size must be less than 50MB');
        return;
      }

      setUploadData({ ...uploadData, pdf: file });
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!uploadData.pdf) {
      toast.error('Please select a PDF file');
      return;
    }

    if (!uploadData.title || !uploadData.academicYear) {
      toast.error('Please fill all required fields');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('pdf', uploadData.pdf);
    formData.append('title', uploadData.title);
    formData.append('academicYear', uploadData.academicYear);
    if (uploadData.annexureNumber) {
      formData.append('annexureNumber', uploadData.annexureNumber);
    }

    try {
      await api.post('/mandates', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      toast.success('Mandate uploaded successfully!');
      setShowUploadModal(false);
      setUploadData({ title: '', academicYear: '', annexureNumber: '', pdf: null });
      fetchMandates();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (mandate) => {
    setEditingMandate(mandate);
    setEditData({
      title: mandate.title || '',
      academicYear: mandate.academicYear || '',
      annexureNumber: mandate.annexureNumber || ''
    });
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    setUploading(true);
    try {
      await api.put(`/mandates/${editingMandate._id}`, editData);
      toast.success('Mandate updated successfully!');
      setShowEditModal(false);
      setEditingMandate(null);
      fetchMandates();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure? This will delete the PDF from server.')) return;

    try {
      await api.delete(`/mandates/${id}`);
      toast.success('Mandate deleted successfully!');
      fetchMandates();
    } catch (error) {
      toast.error('Failed to delete mandate');
    }
  };

  const handleDeleteYear = async () => {
    if (!yearToDelete) return;

    try {
      setUploading(true);
      await api.delete(`/mandates/years/${yearToDelete.academicYear}`);
      toast.success(`Academic year ${yearToDelete.academicYear} deleted successfully!`);
      setShowDeleteYearModal(false);
      setYearToDelete(null);
      
      // Reset filter if deleted year was selected
      if (yearFilter === yearToDelete.academicYear) {
        setYearFilter('all');
      }
      
      fetchAcademicYears();
      fetchMandates();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete academic year');
    } finally {
      setUploading(false);
    }
  };

  const filteredMandates = mandates.filter(mandate =>
    mandate.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mandate.annexureNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Mandate Management</h1>
          <p className="text-slate-600 mt-1">Manage mandate PDFs by academic year</p>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex-1 w-full sm:max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search mandates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAddYearModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Year
            </button>
            <button
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Upload PDF
            </button>
          </div>
        </div>

        {/* Year Filter */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setYearFilter('all')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              yearFilter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            All Years
          </button>
          {academicYears.map(yearData => (
            <div key={yearData.academicYear} className="flex items-center gap-1">
              <button
                onClick={() => setYearFilter(yearData.academicYear)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  yearFilter === yearData.academicYear
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {yearData.academicYear}
                {yearData.isCurrent && (
                  <span className="ml-2 text-xs px-2 py-0.5 bg-green-500 text-white rounded font-semibold">
                    CURRENT
                  </span>
                )}
              </button>
              {!yearData.isCurrent && (
                <button
                  onClick={() => {
                    setYearToDelete(yearData);
                    setShowDeleteYearModal(true);
                  }}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete year"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Mandates List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredMandates.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No mandates found</h3>
            <p className="text-gray-600 mb-4">Upload your first mandate PDF</p>
            <button
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Upload Now
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Academic Year
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Annexure
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      File Size
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Uploaded
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                  {filteredMandates.map((mandate) => (
                    <tr key={mandate._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-red-600" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-medium text-slate-900 truncate">{mandate.title}</div>
                            <div className="text-xs text-slate-500 truncate">{mandate.pdfFile.filename}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                          {mandate.academicYear}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700 font-medium">
                        {mandate.annexureNumber || '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {formatFileSize(mandate.pdfFile.size)}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {new Date(mandate.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-1">
                          <a
                            href={mandate.pdfFile.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="View PDF"
                          >
                            <Eye className="w-4 h-4" />
                          </a>
                          <a
                            href={mandate.pdfFile.url}
                            download
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Download PDF"
                          >
                            <Download className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => handleEdit(mandate)}
                            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Edit details"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(mandate._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Upload Mandate PDF</h2>
            
            <form onSubmit={handleUpload} className="space-y-4">
              {/* PDF Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PDF File *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="pdf-upload"
                  />
                  <label htmlFor="pdf-upload" className="cursor-pointer">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      {uploadData.pdf ? uploadData.pdf.name : 'Click to upload PDF'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PDF files only (Max 50MB)
                    </p>
                  </label>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={uploadData.title}
                  onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Seat Matrix"
                  required
                />
              </div>

              {/* Academic Year */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Academic Year *
                </label>
                <select
                  value={uploadData.academicYear}
                  onChange={(e) => setUploadData({ ...uploadData, academicYear: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select academic year</option>
                  {academicYears.map(yearData => (
                    <option key={yearData.academicYear} value={yearData.academicYear}>
                      {yearData.academicYear}
                      {yearData.isCurrent ? ' (Current)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Annexure Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annexure Number (Optional)
                </label>
                <input
                  type="text"
                  value={uploadData.annexureNumber}
                  onChange={(e) => setUploadData({ ...uploadData, annexureNumber: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Annexure I"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowUploadModal(false);
                    setUploadData({ title: '', academicYear: '', annexureNumber: '', pdf: null });
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={uploading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading || !uploadData.pdf}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Uploading...
                    </span>
                  ) : (
                    'Upload PDF'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingMandate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Edit Mandate</h2>
            
            <form onSubmit={handleUpdate} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Academic Year */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Academic Year *
                </label>
                <select
                  value={editData.academicYear}
                  onChange={(e) => setEditData({ ...editData, academicYear: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  {academicYears.map(yearData => (
                    <option key={yearData.academicYear} value={yearData.academicYear}>
                      {yearData.academicYear}
                      {yearData.isCurrent ? ' (Current)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Annexure Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annexure Number (Optional)
                </label>
                <input
                  type="text"
                  value={editData.annexureNumber}
                  onChange={(e) => setEditData({ ...editData, annexureNumber: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* File Info */}
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Current PDF:</p>
                <p className="text-sm text-gray-700 font-mono truncate">{editingMandate.pdfFile.filename}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Size: {formatFileSize(editingMandate.pdfFile.size)}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingMandate(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={uploading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Updating...
                    </span>
                  ) : (
                    'Update'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Year Modal */}
      {showAddYearModal && (
        <AddYearModal
          onClose={() => setShowAddYearModal(false)}
          onSuccess={() => {
            setShowAddYearModal(false);
            fetchAcademicYears();
            fetchMandates();
          }}
        />
      )}

      {/* Delete Year Confirmation Modal */}
      {showDeleteYearModal && yearToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Delete Academic Year</h2>
            </div>

            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-800 mb-2">
                  <strong>Warning:</strong> This action cannot be undone!
                </p>
                <p className="text-sm text-red-700">
                  You are about to delete academic year <strong>{yearToDelete.academicYear}</strong>.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">What will be deleted:</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Academic year record</li>
                  <li>• {yearToDelete.mandateCount || 0} mandate PDF(s) from database</li>
                  <li>• All PDF files from local storage</li>
                  <li>• Folder: /public/{yearToDelete.academicYear}-Mandates/</li>
                </ul>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowDeleteYearModal(false);
                    setYearToDelete(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={uploading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteYear}
                  disabled={uploading}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Deleting...
                    </span>
                  ) : (
                    'Delete Year'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
