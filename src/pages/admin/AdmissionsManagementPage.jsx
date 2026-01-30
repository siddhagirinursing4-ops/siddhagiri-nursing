import { useState, useEffect } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { 
  Save, 
  Plus, 
  Trash2, 
  Edit2, 
  GraduationCap,
  FileText,
  Calendar,
  IndianRupee,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../../lib/axios";

export function AdmissionsManagementPage() {
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("hero");
  
  // Hero Section State
  const [heroData, setHeroData] = useState({
    title: "Begin Your Nursing Journey",
    subtitle: "Join Siddhagiri Nursing Institute and embark on a rewarding career in healthcare. Admissions through Maharashtra CET Counseling.",
    cetLink: "https://cetcell.mahacet.org"
  });

  // Fee Structure State - Multiple Cards
  const [feeData, setFeeData] = useState([
    {
      code: "BSCN09180",
      name: "Siddhagiri Nursing Institute, Kolhapur",
      annualFee: "67,500/-",
      course: "B.Sc. Nursing",
      duration: "4 Years",
      seats: "40",
      location: "Kaneri, Kolhapur, Maharashtra"
    },
    {
      code: "BSCN09180",
      name: "Siddhagiri Nursing Institute, Kolhapur",
      annualFee: "67,500/-",
      course: "B.Sc. Nursing",
      duration: "4 Years",
      seats: "40",
      location: "Kaneri, Kolhapur, Maharashtra"
    },
    {
      code: "BSCN09180",
      name: "Siddhagiri Nursing Institute, Kolhapur",
      annualFee: "67,500/-",
      course: "B.Sc. Nursing",
      duration: "4 Years",
      seats: "40",
      location: "Kaneri, Kolhapur, Maharashtra"
    },
    {
      code: "BSCN09180",
      name: "Siddhagiri Nursing Institute, Kolhapur",
      annualFee: "67,500/-",
      course: "B.Sc. Nursing",
      duration: "4 Years",
      seats: "40",
      location: "Kaneri, Kolhapur, Maharashtra"
    }
  ]);

  // Comparison Colleges
  const [comparisonColleges, setComparisonColleges] = useState([
    { code: "BSCN0049", name: "MES College of Nursing, Ratnagiri", course: "B.Sc. Nursing", fee: "1,20,500/-" },
    { code: "BSCN0014", name: "SSPM College of Nursing, Barshi, Solapur", course: "B.Sc. Nursing", fee: "34,500/-" },
    { code: "BSCN0036", name: "MIT Nursing College, Aurangabad", course: "B.Sc. Nursing", fee: "88,000/-" },
  ]);

  // Eligibility Criteria
  const [eligibility, setEligibility] = useState([
    "Age: 17 to 35 years as on 31st December of admitting year",
    "10+2 with Physics, Chemistry, Biology & English",
    "Minimum 45% aggregate marks (40% for reserved categories)",
    "Valid NEET Score",
    "Medically fit candidate",
  ]);

  // Documents Required
  const [documents, setDocuments] = useState([
    "NEET Score Card",
    "10th Marksheet & Certificate",
    "12th Marksheet & Certificate",
    "Transfer Certificate",
    "Migration Certificate",
    "Caste Certificate (if applicable)",
    "Domicile Certificate",
    "Aadhar Card",
    "Passport Size Photos (8)",
  ]);

  // Admission Steps
  const [admissionSteps, setAdmissionSteps] = useState([
    { step: 1, title: "Appear for NEET Exam", description: "Student should appear for NEET exam for the current academic year as per schedule." },
    { step: 2, title: "Register at Maharashtra CET", description: "After NEET and 12th Science result, register at Maharashtra CET website for counseling." },
    { step: 3, title: "Document Verification", description: "Complete document verification process by Maharashtra CET as per schedule." },
    { step: 4, title: "Preference Form Filling", description: "Fill preference form with your desired colleges and courses in order of priority." },
    { step: 5, title: "Attend Counseling Rounds", description: "Participate in counseling rounds conducted by Maharashtra CET for seat allotment." },
    { step: 6, title: "Confirm Admission", description: "Report to allotted college, complete fee payment and confirm your admission." },
  ]);

  // Important Dates
  const [importantDates, setImportantDates] = useState([
    { event: "NEET Exam", date: "As per NTA Schedule" },
    { event: "CET Registration Opens", date: "After NEET Results" },
    { event: "Document Verification", date: "As per CET Schedule" },
    { event: "Counseling Rounds", date: "June - August" },
    { event: "Classes Commence", date: "As per MUHS Calendar" },
  ]);

  // Fetch admissions content on mount
  useEffect(() => {
    fetchAdmissionsContent();
  }, []);

  const fetchAdmissionsContent = async () => {
    try {
      setFetchLoading(true);
      const response = await api.get('/admissions');

      if (response.data.success) {
        const data = response.data.data;
        
        // Update all state with fetched data
        if (data.hero) {
          setHeroData(data.hero);
        }
        if (data.feeStructure) {
          setFeeData(data.feeStructure);
        }
        if (data.eligibility) {
          setEligibility(data.eligibility);
        }
        if (data.documents) {
          setDocuments(data.documents);
        }
        if (data.admissionSteps) {
          setAdmissionSteps(data.admissionSteps);
        }
        if (data.importantDates) {
          setImportantDates(data.importantDates);
        }
        if (data.comparisonColleges) {
          setComparisonColleges(data.comparisonColleges);
        }
      }
    } catch (error) {
      console.error('Error fetching admissions content:', error);
      toast.error('Failed to load admissions content');
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSaveHero = async () => {
    setLoading(true);
    try {
      const response = await api.put('/admissions/hero', heroData);

      if (response.data.success) {
        toast.success("Hero section updated successfully!");
      }
    } catch (error) {
      console.error('Error updating hero section:', error);
      toast.error(error.response?.data?.message || "Failed to update hero section");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveFeeStructure = async () => {
    setLoading(true);
    try {
      const response = await api.put('/admissions/fee-structure', { feeStructure: feeData });

      if (response.data.success) {
        toast.success("Fee structure updated successfully!");
      }
    } catch (error) {
      console.error('Error updating fee structure:', error);
      toast.error(error.response?.data?.message || "Failed to update fee structure");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEligibility = async () => {
    setLoading(true);
    try {
      const response = await api.put(
        '/admissions/eligibility',
        { eligibility: eligibility.filter(item => item.trim() !== '') }
      );

      if (response.data.success) {
        toast.success("Eligibility criteria updated successfully!");
      }
    } catch (error) {
      console.error('Error updating eligibility:', error);
      toast.error(error.response?.data?.message || "Failed to update eligibility criteria");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDocuments = async () => {
    setLoading(true);
    try {
      const response = await api.put(
        '/admissions/documents',
        { documents: documents.filter(item => item.trim() !== '') }
      );

      if (response.data.success) {
        toast.success("Documents list updated successfully!");
      }
    } catch (error) {
      console.error('Error updating documents:', error);
      toast.error(error.response?.data?.message || "Failed to update documents list");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAdmissionSteps = async () => {
    setLoading(true);
    try {
      const response = await api.put('/admissions/admission-steps', { admissionSteps });

      if (response.data.success) {
        toast.success("Admission steps updated successfully!");
      }
    } catch (error) {
      console.error('Error updating admission steps:', error);
      toast.error(error.response?.data?.message || "Failed to update admission steps");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveImportantDates = async () => {
    setLoading(true);
    try {
      const response = await api.put(
        '/admissions/important-dates',
        { importantDates: importantDates.filter(item => item.event.trim() !== '' && item.date.trim() !== '') }
      );

      if (response.data.success) {
        toast.success("Important dates updated successfully!");
      }
    } catch (error) {
      console.error('Error updating important dates:', error);
      toast.error(error.response?.data?.message || "Failed to update important dates");
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "hero", label: "Hero Section", icon: GraduationCap },
    { id: "fee", label: "Fee Structure", icon: IndianRupee },
    { id: "eligibility", label: "Eligibility", icon: CheckCircle },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "steps", label: "Admission Steps", icon: Calendar },
    { id: "dates", label: "Important Dates", icon: Calendar },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Admissions Management</h1>
          <p className="text-gray-600">Manage all admissions page content and information</p>
        </div>

        {fetchLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          
          {/* Hero Section */}
          {activeTab === "hero" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Main Title
                </label>
                <input
                  type="text"
                  value={heroData.title}
                  onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subtitle
                </label>
                <textarea
                  value={heroData.subtitle}
                  onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CET Cell Link
                </label>
                <input
                  type="url"
                  value={heroData.cetLink}
                  onChange={(e) => setHeroData({ ...heroData, cetLink: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={handleSaveHero}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <Save className="h-5 w-5" />
                Save Hero Section
              </button>
            </div>
          )}

          {/* Fee Structure */}
          {activeTab === "fee" && (
            <div className="space-y-8">
              {feeData.map((card, cardIndex) => (
                <div key={cardIndex} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Fee Card {cardIndex + 1}</h3>
                    {feeData.length > 1 && (
                      <button
                        onClick={() => setFeeData(feeData.filter((_, i) => i !== cardIndex))}
                        className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg text-sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        College Code
                      </label>
                      <input
                        type="text"
                        value={card.code}
                        onChange={(e) => {
                          const newFeeData = [...feeData];
                          newFeeData[cardIndex].code = e.target.value;
                          setFeeData(newFeeData);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Annual Fee
                      </label>
                      <input
                        type="text"
                        value={card.annualFee}
                        onChange={(e) => {
                          const newFeeData = [...feeData];
                          newFeeData[cardIndex].annualFee = e.target.value;
                          setFeeData(newFeeData);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Course
                      </label>
                      <input
                        type="text"
                        value={card.course}
                        onChange={(e) => {
                          const newFeeData = [...feeData];
                          newFeeData[cardIndex].course = e.target.value;
                          setFeeData(newFeeData);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duration
                      </label>
                      <input
                        type="text"
                        value={card.duration}
                        onChange={(e) => {
                          const newFeeData = [...feeData];
                          newFeeData[cardIndex].duration = e.target.value;
                          setFeeData(newFeeData);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Total Seats
                      </label>
                      <input
                        type="text"
                        value={card.seats}
                        onChange={(e) => {
                          const newFeeData = [...feeData];
                          newFeeData[cardIndex].seats = e.target.value;
                          setFeeData(newFeeData);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={card.location}
                        onChange={(e) => {
                          const newFeeData = [...feeData];
                          newFeeData[cardIndex].location = e.target.value;
                          setFeeData(newFeeData);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      College Name
                    </label>
                    <input
                      type="text"
                      value={card.name}
                      onChange={(e) => {
                        const newFeeData = [...feeData];
                        newFeeData[cardIndex].name = e.target.value;
                        setFeeData(newFeeData);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              ))}

              <button
                onClick={() => setFeeData([...feeData, {
                  code: "BSCN09180",
                  name: "Siddhagiri Nursing Institute, Kolhapur",
                  annualFee: "67,500/-",
                  course: "B.Sc. Nursing",
                  duration: "4 Years",
                  seats: "40",
                  location: "Kaneri, Kolhapur, Maharashtra"
                }])}
                className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
              >
                <Plus className="h-5 w-5" />
                Add Fee Card
              </button>

              <button
                onClick={handleSaveFeeStructure}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <Save className="h-5 w-5" />
                Save Fee Structure
              </button>
            </div>
          )}

          {/* Eligibility */}
          {activeTab === "eligibility" && (
            <div className="space-y-6">
              <div className="space-y-3">
                {eligibility.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const newEligibility = [...eligibility];
                        newEligibility[index] = e.target.value;
                        setEligibility(newEligibility);
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => setEligibility(eligibility.filter((_, i) => i !== index))}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setEligibility([...eligibility, ""])}
                className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
              >
                <Plus className="h-5 w-5" />
                Add Criterion
              </button>

              <button
                onClick={handleSaveEligibility}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <Save className="h-5 w-5" />
                Save Eligibility
              </button>
            </div>
          )}

          {/* Documents */}
          {activeTab === "documents" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-3">
                {documents.map((doc, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={doc}
                      onChange={(e) => {
                        const newDocuments = [...documents];
                        newDocuments[index] = e.target.value;
                        setDocuments(newDocuments);
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => setDocuments(documents.filter((_, i) => i !== index))}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setDocuments([...documents, ""])}
                className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
              >
                <Plus className="h-5 w-5" />
                Add Document
              </button>

              <button
                onClick={handleSaveDocuments}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <Save className="h-5 w-5" />
                Save Documents
              </button>
            </div>
          )}

          {/* Admission Steps */}
          {activeTab === "steps" && (
            <div className="space-y-6">
              <div className="space-y-4">
                {admissionSteps.map((step, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        {step.step}
                      </span>
                      <input
                        type="text"
                        value={step.title}
                        onChange={(e) => {
                          const newSteps = [...admissionSteps];
                          newSteps[index].title = e.target.value;
                          setAdmissionSteps(newSteps);
                        }}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                      />
                      <button
                        onClick={() => setAdmissionSteps(admissionSteps.filter((_, i) => i !== index))}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    <textarea
                      value={step.description}
                      onChange={(e) => {
                        const newSteps = [...admissionSteps];
                        newSteps[index].description = e.target.value;
                        setAdmissionSteps(newSteps);
                      }}
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={() => setAdmissionSteps([...admissionSteps, { step: admissionSteps.length + 1, title: "", description: "" }])}
                className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
              >
                <Plus className="h-5 w-5" />
                Add Step
              </button>

              <button
                onClick={handleSaveAdmissionSteps}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <Save className="h-5 w-5" />
                Save Admission Steps
              </button>
            </div>
          )}

          {/* Important Dates */}
          {activeTab === "dates" && (
            <div className="space-y-6">
              <div className="space-y-3">
                {importantDates.map((item, index) => (
                  <div key={index} className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={item.event}
                      onChange={(e) => {
                        const newDates = [...importantDates];
                        newDates[index].event = e.target.value;
                        setImportantDates(newDates);
                      }}
                      placeholder="Event"
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={item.date}
                        onChange={(e) => {
                          const newDates = [...importantDates];
                          newDates[index].date = e.target.value;
                          setImportantDates(newDates);
                        }}
                        placeholder="Date"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={() => setImportantDates(importantDates.filter((_, i) => i !== index))}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setImportantDates([...importantDates, { event: "", date: "" }])}
                className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
              >
                <Plus className="h-5 w-5" />
                Add Date
              </button>

              <button
                onClick={handleSaveImportantDates}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <Save className="h-5 w-5" />
                Save Important Dates
              </button>
            </div>
          )}
        </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
