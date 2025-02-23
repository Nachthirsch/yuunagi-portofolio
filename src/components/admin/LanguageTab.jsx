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

  return (
    <div className="space-y-6 p-4">
      {/* Metadata Section */}
      <div className="bg-neutral-800/50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Metadata</h3>
        <div className="grid grid-cols-2 gap-4">
          <input type="text" value={data.title || ""} onChange={(e) => onChange({ ...data, title: e.target.value })} placeholder="Post Title" className="bg-neutral-800 border border-neutral-600 rounded px-2 py-1" />
          <input type="text" value={data.metadata?.author || ""} onChange={(e) => handleMetadataChange("author", e.target.value)} placeholder="Author" className="bg-neutral-800 border border-neutral-600 rounded px-2 py-1" />
          <input type="date" value={data.metadata?.date || ""} onChange={(e) => handleMetadataChange("date", e.target.value)} className="bg-neutral-800 border border-neutral-600 rounded px-2 py-1" />
          <input type="text" value={data.metadata?.category || ""} onChange={(e) => handleMetadataChange("category", e.target.value)} placeholder="Category" className="bg-neutral-800 border border-neutral-600 rounded px-2 py-1" />
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
            className="bg-neutral-800 border border-neutral-600 rounded px-2 py-1 col-span-2"
          />
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Sections</h3>
          <button onClick={handleAddSection} className="flex items-center gap-1 text-blue-500 hover:text-blue-400">
            <Plus size={20} /> Add Section
          </button>
        </div>

        {data.sections?.map((section, index) => (
          <SectionEditor key={index} section={section} onUpdate={(newSection) => handleSectionUpdate(index, newSection)} onDelete={() => handleDeleteSection(index)} />
        ))}
      </div>
    </div>
  );
};

export default LanguageTab;
