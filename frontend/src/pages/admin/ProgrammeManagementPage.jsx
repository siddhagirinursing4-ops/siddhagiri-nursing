import { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Plus, Trash2, Edit2, GraduationCap, Search, X } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../lib/axios';

// Edit Modal Component
function ProgrammeModal({ programme, onClose, onSuccess, isEdit = true }) {
  const [formData, setFormData] = useState({
    title: programme?.title || '',
    shortDescription: programme?.shortDescription || '',
    fullDescription: programme?.fullDescription || '',
    duration: programme?.duration || '',
    seats: programme?.seats || 0,
    eligibility: programme?.eligibility || '',
    
    // Eligibility Details
    eligibilityAgeLimit: programme?.eligibilityDetails?.ageLimit || '',
    eligibilityAcademic: programme?.eligibilityDetails?.academicRequirements || '',
    eligibilityOther: programme?.eligibilityDetails?.otherRequirements || '',
    
    // Admission Process
    admissionPeriod: programme?.admissionProcess?.applicationPeriod || '',
    selectionCriteria: programme?.admissionProcess?.selectionCriteria || '',
    admissionDocuments: programme?.admissionProcess?.documents?.join('\n') || '',
    admissionSteps: programme?.admissionProcess?.steps?.join('\n') || '',
    
    // Course Structure
    courseOverview: programme?.courseStructure?.overview || '',
    courseSubjects: programme?.courseStructure?.subjects?.join('\n') || '',
    
    // Career Prospects
    careerOverview: programme?.careerProspects?.overview || '',
    careerOpportunities: programme?.careerProspects?.opportunities?.join('\n') || '',
    
    // Fees
    tuitionFee: programme?.fees?.tuitionFee || '',
    otherFees: programme?.fees?.otherFees || '',
    scholarships: programme?.fees?.scholarships || '',
    
    features: programme?.features?.join(', ') || '',
    highlights: programme?.highlights?.join(', ') || '',
    icon: programme?.icon || 'graduation-cap',
    isActive: programme?.isActive ?? true
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = {
        title: formData.title,
        shortDescription: formData.shortDescription,
        fullDescription: formData.fullDescription,
        duration: formData.duration,
        seats: formData.seats,
        eligibility: formData.eligibility,
        eligibilityDetails: {
          ageLimit: formData.eligibilityAgeLimit,
          academicRequirements: formData.eligibilityAcademic,
          otherRequirements: formData.eligibilityOther
        },
        admissionProcess: {
          applicationPeriod: formData.admissionPeriod,
          selectionCriteria: formData.selectionCriteria,
          documents: formData.admissionDocuments.split('\n').map(d => d.trim()).filter(Boolean),
          steps: formData.admissionSteps.split('\n').map(s => s.trim()).filter(Boolean)
        },
        courseStructure: {
          overview: formData.courseOverview,
          subjects: formData.courseSubjects.split('\n').map(s => s.trim()).filter(Boolean)
        },
        careerProspects: {
          overview: formData.careerOverview,
          opportunities: formData.careerOpportunities.split('\n').map(o => o.trim()).filter(Boolean)
        },
        fees: {
          tuitionFee: formData.tuitionFee,
          otherFees: formData.otherFees,
          scholarships: formData.scholarships
        },
        features: formData.features.split(',').map(f => f.trim()).filter(Boolean),
        highlights: formData.highlights.split(',').map(h => h.trim()).filter(Boolean),
        icon: formData.icon,
        isActive: formData.isActive
      };

      if (isEdit) {
        await api.put(`/programmes/${programme._id}`, submitData);
        toast.success('Programme updated successfully!');
      } else {
        await api.post('/programmes', submitData);
        toast.success('Programme created successfully!');
      }
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || `${isEdit ? 'Update' : 'Create'} failed`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-2xl w-full my-8">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {isEdit ? 'Edit Programme' : 'Add New Programme'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Short Description *
            </label>
            <textarea
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Full Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Description
            </label>
            <textarea
              value={formData.fullDescription}
              onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Duration and Seats */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration *
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="e.g., 4 Years"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seats *
              </label>
              <input
                type="number"
                value={formData.seats}
                onChange={(e) => setFormData({ ...formData, seats: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* Eligibility */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Eligibility *
            </label>
            <textarea
              value={formData.eligibility}
              onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Features (comma-separated)
            </label>
            <input
              type="text"
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              placeholder="e.g., MUHS Affiliated, Clinical Training, Hospital Exposure"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Highlights */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Highlights (comma-separated)
            </label>
            <input
              type="text"
              value={formData.highlights}
              onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
              placeholder="e.g., MUHS approved, Experienced faculty, Modern infrastructure"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Icon */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Icon
            </label>
            <select
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="graduation-cap">Graduation Cap</option>
              <option value="heart">Heart</option>
              <option value="stethoscope">Stethoscope</option>
              <option value="award">Award</option>
            </select>
          </div>

          {/* Eligibility Details Section */}
          <div className="pt-4 border-t">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Eligibility Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age Limit
                </label>
                <input
                  type="text"
                  value={formData.eligibilityAgeLimit}
                  onChange={(e) => setFormData({ ...formData, eligibilityAgeLimit: e.target.value })}
                  placeholder="e.g., Minimum 17 years as on 31st December"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Academic Requirements
                </label>
                <textarea
                  value={formData.eligibilityAcademic}
                  onChange={(e) => setFormData({ ...formData, eligibilityAcademic: e.target.value })}
                  rows={3}
                  placeholder="e.g., Passed 10+2 with Physics, Chemistry, Biology..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Other Requirements
                </label>
                <textarea
                  value={formData.eligibilityOther}
                  onChange={(e) => setFormData({ ...formData, eligibilityOther: e.target.value })}
                  rows={2}
                  placeholder="e.g., Medically fit as per nursing council norms"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Admission Process Section */}
          <div className="pt-4 border-t">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Admission Process</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Application Period
                </label>
                <input
                  type="text"
                  value={formData.admissionPeriod}
                  onChange={(e) => setFormData({ ...formData, admissionPeriod: e.target.value })}
                  placeholder="e.g., May to June every year"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selection Criteria
                </label>
                <input
                  type="text"
                  value={formData.selectionCriteria}
                  onChange={(e) => setFormData({ ...formData, selectionCriteria: e.target.value })}
                  placeholder="e.g., Based on NEET score and counseling"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Required Documents (one per line)
                </label>
                <textarea
                  value={formData.admissionDocuments}
                  onChange={(e) => setFormData({ ...formData, admissionDocuments: e.target.value })}
                  rows={6}
                  placeholder="10th and 12th mark sheets&#10;Transfer certificate&#10;Aadhar card&#10;Passport size photographs"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Admission Steps (one per line)
                </label>
                <textarea
                  value={formData.admissionSteps}
                  onChange={(e) => setFormData({ ...formData, admissionSteps: e.target.value })}
                  rows={5}
                  placeholder="Fill online application form&#10;Appear for entrance examination&#10;Document verification&#10;Fee payment"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Course Structure Section */}
          <div className="pt-4 border-t">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Structure</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Overview
                </label>
                <textarea
                  value={formData.courseOverview}
                  onChange={(e) => setFormData({ ...formData, courseOverview: e.target.value })}
                  rows={3}
                  placeholder="Brief overview of the course structure..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Subjects (one per line)
                </label>
                <textarea
                  value={formData.courseSubjects}
                  onChange={(e) => setFormData({ ...formData, courseSubjects: e.target.value })}
                  rows={8}
                  placeholder="Anatomy and Physiology&#10;Microbiology&#10;Fundamentals of Nursing&#10;Medical-Surgical Nursing"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Career Prospects Section */}
          <div className="pt-4 border-t">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Career Prospects</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Overview
                </label>
                <textarea
                  value={formData.careerOverview}
                  onChange={(e) => setFormData({ ...formData, careerOverview: e.target.value })}
                  rows={2}
                  placeholder="Brief overview of career opportunities..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Career Opportunities (one per line)
                </label>
                <textarea
                  value={formData.careerOpportunities}
                  onChange={(e) => setFormData({ ...formData, careerOpportunities: e.target.value })}
                  rows={6}
                  placeholder="Staff Nurse in hospitals&#10;Community Health Nurse&#10;Nursing Supervisor&#10;Nursing Tutor"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Fees Structure Section */}
          <div className="pt-4 border-t">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Fees Structure</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tuition Fee
                </label>
                <input
                  type="text"
                  value={formData.tuitionFee}
                  onChange={(e) => setFormData({ ...formData, tuitionFee: e.target.value })}
                  placeholder="e.g., As per government norms"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Other Fees
                </label>
                <input
                  type="text"
                  value={formData.otherFees}
                  onChange={(e) => setFormData({ ...formData, otherFees: e.target.value })}
                  placeholder="e.g., Hostel, library, and other charges as applicable"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Scholarships
                </label>
                <input
                  type="text"
                  value={formData.scholarships}
                  onChange={(e) => setFormData({ ...formData, scholarships: e.target.value })}
                  placeholder="e.g., Government scholarships available for eligible students"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Active Status */}
          <div className="flex items-center gap-2 pt-4 border-t">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
              Active (visible on website)
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
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
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : (isEdit ? 'Update Programme' : 'Create Programme')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function ProgrammeManagementPage() {
  const [programmes, setProgrammes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProgramme, setEditingProgramme] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchProgrammes();
  }, []);

  const fetchProgrammes = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/programmes');
      setProgrammes(data.data);
    } catch (error) {
      toast.error('Failed to fetch programmes');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this programme?')) return;

    try {
      await api.delete(`/programmes/${id}`);
      toast.success('Programme deleted successfully!');
      fetchProgrammes();
    } catch (error) {
      toast.error('Failed to delete programme');
    }
  };

  const filteredProgrammes = programmes.filter(prog =>
    prog.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Programme Management</h1>
          <p className="text-slate-600 mt-1">Manage nursing programmes and courses</p>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 w-full sm:max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search programmes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Programme
          </button>
        </div>

        {/* Programmes List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredProgrammes.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No programmes found</h3>
            <p className="text-gray-600 mb-4">Get started by adding your first programme</p>
            <button
              onClick={() => setIsCreating(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Programme
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProgrammes.map((programme) => (
              <div
                key={programme._id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{programme.title}</h3>
                        <p className="text-sm text-gray-500">{programme.duration}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {programme.shortDescription || programme.description}
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                      {programme.seats} Seats
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      programme.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {programme.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingProgramme(programme)}
                      className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(programme._id)}
                      className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingProgramme && (
        <ProgrammeModal
          programme={editingProgramme}
          onClose={() => setEditingProgramme(null)}
          onSuccess={() => {
            setEditingProgramme(null);
            fetchProgrammes();
          }}
          isEdit={true}
        />
      )}

      {/* Create Modal */}
      {isCreating && (
        <ProgrammeModal
          onClose={() => setIsCreating(false)}
          onSuccess={() => {
            setIsCreating(false);
            fetchProgrammes();
          }}
          isEdit={false}
        />
      )}
    </AdminLayout>
  );
}
