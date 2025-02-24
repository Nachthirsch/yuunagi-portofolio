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
    <div className="p-4 space-y-6">
      {/* Metadata Section */}
      <div className="card bg-base-200 shadow-lg">
        <div className="card-body gap-4">
          <h3 className="card-title text-lg font-bold">Metadata</h3>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Title</span>
            </label>
            <input type="text" value={data.title || ""} onChange={(e) => onChange({ ...data, title: e.target.value })} placeholder="Enter post title" className="input input-bordered w-full" aria-label="Post title" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Author</span>
              </label>
              <input type="text" value={data.metadata?.author || ""} onChange={(e) => handleMetadataChange("author", e.target.value)} placeholder="Enter author name" className="input input-bordered" aria-label="Author name" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Publication Date</span>
              </label>
              <input type="date" value={data.metadata?.date || ""} onChange={(e) => handleMetadataChange("date", e.target.value)} className="input input-bordered" aria-label="Publication date" />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Category</span>
            </label>
            <input type="text" value={data.metadata?.category || ""} onChange={(e) => handleMetadataChange("category", e.target.value)} placeholder="Enter post category" className="input input-bordered" aria-label="Post category" />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Tags</span>
              <span className="label-text-alt text-base-content/70">Separate with commas</span>
            </label>
            <input
              type="text"
              value={data.metadata?.tags?.join(", ") || ""}
              onChange={(e) =>
                handleMetadataChange(
                  "tags",
                  e.target.value.split(",").map((tag) => tag.trim())
                )
              }
              placeholder="e.g. technology, programming, web"
              className="input input-bordered"
              aria-label="Post tags"
            />
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="card bg-base-200 shadow-lg">
        <div className="card-body gap-4">
          <div className="flex justify-between items-center">
            <h3 className="card-title text-lg font-bold">Sections</h3>
            <button onClick={handleAddSection} className="btn btn-primary btn-sm gap-2" aria-label="Add new section">
              <Plus size={16} />
              Add Section
            </button>
          </div>

          <div className="space-y-6">
            {data.sections?.map((section, index) => (
              <div key={index} className="card bg-base-100 shadow-sm" role="region" aria-label={`Section ${index + 1}`}>
                <SectionEditor index={index} section={section} onUpdate={(newSection) => handleSectionUpdate(index, newSection)} onDelete={() => handleDeleteSection(index)} onAddAbove={(idx) => handleAddSectionAt(idx, "above")} onAddBelow={(idx) => handleAddSectionAt(idx, "below")} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageTab;
