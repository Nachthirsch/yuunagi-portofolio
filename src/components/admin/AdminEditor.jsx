import { useState, useEffect } from "react";
import { Eye, Save, ArrowLeft, Loader2 } from "lucide-react";
import PostPreview from "./PostPreview";
import SectionEditor from "./sections/SectionEditor";

const AdminEditor = ({ initialData, onSave, onBack, isLoading = false }) => {
  const [postData, setPostData] = useState(
    initialData || {
      title: "",
      description: "",
      content: "",
      featuredImage: "",
      author: "",
      category: "",
      status: "draft",
      tags: [],
      sections: [],
    }
  );
  const [showPreview, setShowPreview] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (initialData) {
      setPostData(initialData);
    }
  }, [initialData]);

  const handleUpdateSection = (index, newSection) => {
    const newSections = [...postData.sections];
    newSections[index] = newSection;
    setPostData((prev) => ({ ...prev, sections: newSections }));
    setIsDirty(true);
  };

  const handleDeleteSection = (index) => {
    const newSections = postData.sections.filter((_, idx) => idx !== index);
    setPostData((prev) => ({ ...prev, sections: newSections }));
    setIsDirty(true);
  };

  const handleAddSection = (index, position = "below") => {
    const newSection = {
      type: "section",
      title: "",
      content: "",
      id: `section-${Date.now()}`,
    };

    const newSections = [...postData.sections];
    const insertIndex = position === "below" ? index + 1 : index;
    newSections.splice(insertIndex, 0, newSection);

    setPostData((prev) => ({ ...prev, sections: newSections }));
    setIsDirty(true);
  };

  const handleInputChange = (field, value) => {
    setPostData((prev) => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    if (onSave) {
      await onSave(postData);
      setIsDirty(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Toolbar */}
      <div className="sticky top-0 z-40 bg-base-100 border-b shadow-sm">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <button onClick={onBack} className="btn btn-ghost">
              <ArrowLeft size={20} />
              Back
            </button>
            <div className="flex gap-2">
              <button onClick={handleSave} className="btn btn-primary" disabled={isLoading || !isDirty}>
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid gap-4">
            <input type="text" value={postData.title} onChange={(e) => handleInputChange("title", e.target.value)} placeholder="Post Title" className="input input-bordered w-full text-xl" />
            <textarea value={postData.description} onChange={(e) => handleInputChange("description", e.target.value)} placeholder="Post Description" className="textarea textarea-bordered w-full" rows={3} />
            <input type="text" value={postData.featuredImage} onChange={(e) => handleInputChange("featuredImage", e.target.value)} placeholder="Featured Image URL" className="input input-bordered w-full" />
          </div>

          {/* Sections */}
          <div className="space-y-8">
            {postData.sections.map((section, index) => (
              <SectionEditor key={section.id || index} section={section} index={index} onUpdate={(newSection) => handleUpdateSection(index, newSection)} onDelete={() => handleDeleteSection(index)} onAddAbove={() => handleAddSection(index, "above")} onAddBelow={() => handleAddSection(index, "below")} />
            ))}
            {postData.sections.length === 0 && (
              <button onClick={() => handleAddSection(-1, "below")} className="btn btn-outline w-full">
                Add First Section
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Floating Preview Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button onClick={() => setShowPreview(true)} className="btn btn-circle btn-lg btn-primary shadow-lg" title="Preview Post">
          <Eye size={24} />
        </button>
      </div>

      {/* Preview Modal */}
      {showPreview && <PostPreview post={postData} onClose={() => setShowPreview(false)} />}
    </div>
  );
};

export default AdminEditor;
