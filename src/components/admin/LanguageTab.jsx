import { useState } from "react";
import SectionEditor from "./sections/SectionEditor";
import { Plus } from "lucide-react";

const LanguageTab = ({ data, onChange }) => {
  const handleMetadataChange = (field, value) => {
    onChange({
      ...data,
      metadata: {
        ...data.metadata,
        [field]: value,
      },
    });
  };

  const handleSectionUpdate = (index, newSection) => {
    const newSections = [...data.sections];
    newSections[index] = newSection;
    onChange({ ...data, sections: newSections });
  };

  const handleAddSection = () => {
    const newSections = [
      ...data.sections,
      {
        type: "section",
        content: "",
        title: "",
      },
    ];
    onChange({ ...data, sections: newSections });
  };

  const handleDeleteSection = (index) => {
    const newSections = data.sections.filter((_, i) => i !== index);
    onChange({ ...data, sections: newSections });
  };

  const handleAddSectionAt = (index, position = "below") => {
    const newSections = [...data.sections];
    const newSection = {
      type: "section",
      content: "",
      title: "",
    };

    if (position === "above") {
      newSections.splice(index, 0, newSection);
    } else {
      newSections.splice(index + 1, 0, newSection);
    }

    onChange({ ...data, sections: newSections });
  };

  return (
    <div className="px-4 py-2 space-y-4">
      {/* Metadata Section */}
      <div className="bg-neutral-800/50 rounded-lg">
        <div className="p-3 border-b border-neutral-700">
          <h3 className="text-lg font-semibold">Metadata</h3>
        </div>
        <div className="p-3 space-y-3">
          <div className="space-y-2">
            <label className="text-sm text-neutral-400">Title</label>
            <input type="text" value={data.title || ""} onChange={(e) => onChange({ ...data, title: e.target.value })} placeholder="Post Title" className="w-full bg-neutral-700 px-3 py-2 rounded-lg text-base" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-sm text-neutral-400">Author</label>
              <input type="text" value={data.metadata?.author || ""} onChange={(e) => handleMetadataChange("author", e.target.value)} placeholder="Author" className="w-full bg-neutral-700 px-3 py-2 rounded-lg text-base" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-neutral-400">Date</label>
              <input type="date" value={data.metadata?.date || ""} onChange={(e) => handleMetadataChange("date", e.target.value)} className="w-full bg-neutral-700 px-3 py-2 rounded-lg text-base" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-neutral-400">Category</label>
            <input type="text" value={data.metadata?.category || ""} onChange={(e) => handleMetadataChange("category", e.target.value)} placeholder="Category" className="w-full bg-neutral-700 px-3 py-2 rounded-lg text-base" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-neutral-400">Tags (comma-separated)</label>
            <input
              type="text"
              value={data.metadata?.tags?.join(", ") || ""}
              onChange={(e) =>
                handleMetadataChange(
                  "tags",
                  e.target.value.split(",").map((tag) => tag.trim())
                )
              }
              placeholder="Tags (comma-separated)"
              className="w-full bg-neutral-700 px-3 py-2 rounded-lg text-base"
            />
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="bg-neutral-800/50 rounded-lg">
        <div className="p-3 border-b border-neutral-700 flex justify-between items-center">
          <h3 className="text-lg font-semibold">Sections</h3>
          <button onClick={handleAddSection} className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center gap-1">
            <Plus size={18} /> Add
          </button>
        </div>
        <div className="p-3 space-y-4">
          {data.sections?.map((section, index) => (
            <SectionEditor
              key={index}
              index={index} // Pastikan index diteruskan
              section={section}
              onUpdate={(newSection) => handleSectionUpdate(index, newSection)}
              onDelete={() => handleDeleteSection(index)}
              onAddAbove={(idx) => handleAddSectionAt(idx, "above")}
              onAddBelow={(idx) => handleAddSectionAt(idx, "below")}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageTab;
