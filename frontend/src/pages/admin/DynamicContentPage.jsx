import { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Plus, Edit2, Trash2, FileText, Search, Eye, EyeOff, Type, Image, X } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../lib/axios';

export function DynamicContentPage() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sectionFilter, setSectionFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingContent, setEditingContent] = useState(null);

  const [formData, setFormData] = useState({
    key: '',
    title: '',
    content: '',
    section: 'banner',
    isActive: true,
    order: 0,
    image: null,
    imagePreview: null
  });

  const sections = [
    { value: 'banner', label: 'Banner', color: 'bg-orange-100 text-orange-700' },
    { value: 'announcement', label: 'Announcement', color: 'bg-red-100 text-red-700' },
    { value: 'other', label: 'Other', color: 'bg-purple-100 text-purple-700' }
  ];

  useEffect(() => {
    fetchContents();
  }, [sectionFilter]);

  const fetchContents = async () => {
    try {
      setLoading(true);
      const params = sectionFilter !== 'all' ? { section: sectionFilter } : {};
      const { data } = await api.get('/dynamic-content/admin/all', { params });
      setContents(data.data);
    } catch (error) {
      toast.error('Failed to fetch content');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      key: '',
      title: '',
      content: '',
      section: 'banner',
      isActive: true,
      order: 0,
      image: null,
      imagePreview: null
    });
    setEditingContent(null);
  };

  const handleEdit = (content) => {
    setEditingContent(content);
    setFormData({
      key: content.key,
      title: content.title,
      content: content.content,
      section: content.section,
      isActive: content.isActive,
      order: content.order,
      image: null,
      imagePreview: content.image?.url || null
    });
    setShowModal(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }

      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Image size must be less than 10MB');
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: file, imagePreview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const submitData = new FormData();
      
      if (editingContent) {
        // Update existing content
        submitData.append('title', formData.title);
        submitData.append('content', formData.content || '');
        submitData.append('section', formData.section);
        submitData.append('isActive', formData.isActive);
        submitData.append('order', formData.order);
        
        if (formData.image) {
          submitData.append('image', formData.image);
        }

        await api.put(`/dynamic-content/${editingContent._id}`, submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Content updated successfully!');
      } else {
        // Create new content
        submitData.append('key', formData.key);
        submitData.append('title', formData.title);
        submitData.append('content', formData.content || '');
        submitData.append('section', formData.section);
        submitData.append('isActive', formData.isActive);
        submitData.append('order', formData.order);
        
        if (formData.image) {
          submitData.append('image', formData.image);
        }

        await api.post('/dynamic-content', submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Content created successfully!');
      }

      setShowModal(false);
      resetForm();
      fetchContents();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this content?')) return;

    try {
      await api.delete(`/dynamic-content/${id}`);
      toast.success('Content deleted successfully!');
      fetchContents();
    } catch (error) {
      toast.error('Failed to delete content');
    }
  };

  const filteredContents = contents.filter(content =>
    content.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    content.key?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    content.content?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSectionColor = (section) => {
    return sections.find(s => s.value === section)?.color || 'bg-gray-100 text-gray-700';
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Dynamic Content</h1>
          <p className="text-slate-600 mt-1">Manage text content displayed across the website</p>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex-1 w-full sm:max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Content
          </button>
        </div>

        {/* Section Filter */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setSectionFilter('all')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              sectionFilter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            All Sections
          </button>
          {sections.map(section => (
            <button
              key={section.value}
              onClick={() => setSectionFilter(section.value)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                sectionFilter === section.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Content List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredContents.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Type className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No content found</h3>
            <p className="text-gray-600 mb-4">Create your first dynamic content</p>
            <button
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Content
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredContents.map((content) => (
              <div
                key={content._id}
                className="bg-white rounded-lg border border-slate-200 p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-slate-900 truncate">
                        {content.title}
                      </h3>
                      {content.isActive ? (
                        <Eye className="w-4 h-4 text-green-600 flex-shrink-0" title="Active" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-slate-400 flex-shrink-0" title="Inactive" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${getSectionColor(content.section)}`}>
                        {sections.find(s => s.value === content.section)?.label}
                      </span>
                      <span className="text-xs text-slate-500 font-mono bg-slate-50 px-2 py-1 rounded">
                        {content.key}
                      </span>
                      {content.order !== 0 && (
                        <span className="text-xs text-slate-500">
                          Order: {content.order}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {content.image?.url && (
                  <div className="mb-3">
                    <img
                      src={content.image.url}
                      alt={content.title}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                )}

                <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                  {content.content}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <span className="text-xs text-slate-500">
                    Updated {new Date(content.updatedAt).toLocaleDateString()}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEdit(content)}
                      className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(content._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
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

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 my-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {editingContent ? 'Edit Content' : 'Add New Content'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Key (only for new content) */}
              {!editingContent && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unique Key * <span className="text-xs text-gray-500">(e.g., entrance_exam_date)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.key}
                    onChange={(e) => setFormData({ ...formData, key: e.target.value.toLowerCase().replace(/\s+/g, '_') })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                    placeholder="unique_content_key"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Used to identify this content. Cannot be changed later.
                  </p>
                </div>
              )}

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
                  placeholder="e.g., Entrance Exam Date"
                  required
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content {formData.section !== 'banner' && '*'}
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Enter the text content here..."
                  required={formData.section !== 'banner'}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.content?.length || 0} / 10000 characters
                </p>
              </div>

              {/* Image Upload (only for banner section) */}
              {formData.section === 'banner' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Banner Image {!editingContent && '*'}
                  </label>
                  <div className="space-y-3">
                    {/* Image Preview */}
                    {formData.imagePreview && (
                      <div className="relative w-full h-48 border-2 border-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={formData.imagePreview}
                          alt="Preview"
                          className="w-full h-full object-contain bg-gray-50"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, image: null, imagePreview: null })}
                          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    
                    {/* Upload Button */}
                    {!formData.imagePreview && (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                          id="image-upload"
                          required={!editingContent && formData.section === 'banner'}
                        />
                        <label htmlFor="image-upload" className="cursor-pointer">
                          <Image className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">
                            Click to upload banner image
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            PNG, JPG, WEBP (Max 10MB)
                          </p>
                        </label>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Recommended size: 1200x800px or similar aspect ratio
                  </p>
                </div>
              )}

              {/* Section and Order */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section *
                  </label>
                  <select
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    {sections.map(section => (
                      <option key={section.value} value={section.value}>
                        {section.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Active Status */}
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-gray-700 cursor-pointer">
                  Active (visible on website)
                </label>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingContent ? 'Update Content' : 'Create Content'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
