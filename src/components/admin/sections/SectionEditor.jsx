import { useState, useEffect } from "react";
import { Trash2, Plus, Bold, Italic, Underline, Code, Link as LinkIcon, ListIcon, Eye, Maximize2, Minimize2, EyeOff } from "lucide-react";
import SectionPreview from "./SectionPreview";

const TextFormatButton = ({ icon: Icon, label, onClick }) => (
  <button type="button" onClick={onClick} className="btn btn-ghost btn-sm" title={label}>
    <Icon size={16} />
  </button>
);

const SectionEditor = ({ section, index, onUpdate, onDelete, onAddAbove, onAddBelow }) => {
  const [sectionData, setSectionData] = useState(section);
  const [selectedText, setSelectedText] = useState({ start: 0, end: 0, text: "" });
  const [isPreview, setIsPreview] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    setSectionData(section);
  }, [section]);

  const handleTypeChange = (type) => {
    const newData = { ...sectionData, type };
    setSectionData(newData);
    onUpdate(newData);
  };

  const handleTitleChange = (e) => {
    const newData = { ...sectionData, title: e.target.value };
    setSectionData(newData);
    onUpdate(newData);
  };

  const handleContentChange = (e) => {
    const newData = { ...sectionData, content: e.target.value };
    setSectionData(newData);
    onUpdate(newData);
  };

  const handleImageChange = (index, field, value) => {
    const newImages = [...(sectionData.images || [])];
    newImages[index] = { ...newImages[index], [field]: value };
    const newData = { ...sectionData, images: newImages };
    setSectionData(newData);
    onUpdate(newData);
  };

  const handleSelect = (e) => {
    const target = e.target;
    const start = target.selectionStart;
    const end = target.selectionEnd;
    const text = target.value.substring(start, end);
    setSelectedText({ start, end, text });
  };

  const insertFormatting = (e, startTag, endTag) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling

    // Generate unique textarea ID using section ID and index
    const textareaId = `section-content-${section.id}-${index}`;
    const textarea = document.getElementById(textareaId);
    if (!textarea) return;

    const content = sectionData.content || "";
    const { start, end } = selectedText;

    let newStartTag = startTag;
    if (startTag.includes('href="URL"')) {
      const url = prompt("Enter URL:", "https://");
      if (!url) return;
      newStartTag = startTag.replace("URL", url);
    }

    const newContent = content.substring(0, start) + newStartTag + content.substring(start, end) + endTag + content.substring(end);

    const newData = { ...sectionData, content: newContent };
    setSectionData(newData);
    onUpdate(newData);

    // Reset selection after formatting using requestAnimationFrame
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(start + newStartTag.length, end + newStartTag.length);
    });
  };

  const togglePreview = () => setIsPreview(!isPreview);
  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

  const renderPreview = () => {
    return (
      <div className={`preview-wrapper ${isFullscreen ? "p-4" : ""}`}>
        <SectionPreview section={sectionData} />
      </div>
    );
  };

  const editorClasses = `card bg-base-300 mb-4 scroll-m-32 ${isFullscreen ? "fixed inset-0 z-50 m-0 rounded-none overflow-auto" : "relative"}`;

  return (
    <div id={`section-${index}`} className={editorClasses}>
      {/* Add Above Button */}
      {!isFullscreen && (
        <div className="absolute left-1/2 -top-3 -translate-x-1/2 z-10">
          <button onClick={() => onAddAbove(index)} className="btn btn-circle btn-md btn-ghost bg-base-300 hover:bg-primary/20" title="Add section above">
            +
          </button>
        </div>
      )}

      <div className="card-body p-4">
        <div className="flex items-center gap-2">
          <select value={sectionData.type} onChange={(e) => handleTypeChange(e.target.value)} className="select select-bordered flex-1">
            <option value="section">Text Section</option>
            <option value="image">Image</option>
            <option value="introduction">Introduction</option>
            <option value="disclaimer">Disclaimer</option>
            <option value="footnote">Footnote</option>
            <option value="lyric">Lyric</option>
            <option value="divider">Divider</option>
          </select>
          <button onClick={togglePreview} className="btn btn-ghost btn-square" title={isPreview ? "Edit mode" : "Preview mode"}>
            {isPreview ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          <button onClick={toggleFullscreen} className="btn btn-ghost btn-square" title={isFullscreen ? "Exit fullscreen" : "Fullscreen mode"}>
            {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>
          <button onClick={() => onDelete()} className="btn btn-error btn-square">
            <Trash2 size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {isPreview ? (
            renderPreview()
          ) : sectionData.type === "image" ? (
            <div className="space-y-3">
              {(sectionData.images || [{}]).map((img, idx) => (
                <div key={idx} className="space-y-2">
                  <input type="text" value={img.src || ""} onChange={(e) => handleImageChange(idx, "src", e.target.value)} placeholder="Image URL" className="input input-bordered w-full" />
                  <input type="text" value={img.altText || ""} onChange={(e) => handleImageChange(idx, "altText", e.target.value)} placeholder="Alt text" className="input input-bordered w-full" />
                </div>
              ))}
              <button onClick={() => handleImageChange(sectionData.images?.length || 0, "src", "")} className="btn btn-primary btn-sm">
                <Plus size={16} /> Add Image
              </button>
            </div>
          ) : sectionData.type === "lyric" ? (
            <div className="space-y-3">
              <input type="text" value={sectionData.title || ""} onChange={handleTitleChange} placeholder="Song Title" className="input input-bordered w-full" />

              {/* Add formatting tools for lyrics */}
              <div className="join">
                {[
                  { icon: Bold, label: "Bold", tag: '<strong class="font-bold">', endTag: "</strong>" },
                  { icon: Italic, label: "Italic", tag: "<i>", endTag: "</i>" },
                ].map((tool) => (
                  <button key={tool.label} onClick={(e) => insertFormatting(e, tool.tag, tool.endTag)} className="btn btn-sm join-item" type="button">
                    <tool.icon size={20} />
                  </button>
                ))}
              </div>

              <textarea id={`section-content-${section.id}-${index}`} value={sectionData.content || ""} onChange={handleContentChange} onSelect={handleSelect} placeholder="Enter lyrics here... Use line breaks for new lines" rows={8} className="textarea textarea-bordered w-full font-mono" />
            </div>
          ) : sectionData.type === "divider" ? (
            <div className="space-y-3">
              <input type="text" value={sectionData.title || ""} onChange={handleTitleChange} placeholder="Optional divider label" className="input input-bordered w-full" />
              <div className="bg-base-200 p-4 rounded-md border border-base-300 flex items-center justify-center">
                <div className="w-full h-0.5 bg-base-content opacity-20 relative">{sectionData.title && <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-base-200 px-4 text-sm">{sectionData.title}</span>}</div>
              </div>
              <p className="text-xs opacity-70">This will render a horizontal divider line. Add optional text to display in the middle of the divider.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <input type="text" value={sectionData.title || ""} onChange={handleTitleChange} placeholder="Section Title" className="input input-bordered w-full" />

              <div className="join">
                {[
                  { icon: Bold, label: "Bold", tag: '<strong class="font-bold">', endTag: "</strong>" },
                  { icon: Italic, label: "Italic", tag: "<i>", endTag: "</i>" },
                  { icon: Underline, label: "Underline", tag: "<u>", endTag: "</u>" },
                  { icon: Code, label: "Code", tag: "<code>", endTag: "</code>" },
                  { icon: LinkIcon, label: "Link", tag: '<a href="URL" class="text-blue-400 hover:underline">', endTag: "</a>" },
                  { icon: ListIcon, label: "List", tag: "<li>", endTag: "</li>" },
                ].map((tool) => (
                  <button
                    key={tool.label}
                    onClick={(e) => insertFormatting(e, tool.tag, tool.endTag)}
                    className="btn btn-sm join-item"
                    type="button" // Explicitly set type to prevent form submission
                  >
                    <tool.icon size={20} />
                  </button>
                ))}
              </div>

              <textarea id={`section-content-${section.id}-${index}`} value={sectionData.content || ""} onChange={handleContentChange} onSelect={handleSelect} placeholder="Section Content" rows={5} className="textarea textarea-bordered w-full" />
            </div>
          )}
        </div>
      </div>

      {/* Add Below Button */}
      {!isFullscreen && (
        <div className="absolute left-1/2 -bottom-3 -translate-x-1/2 z-10">
          <button onClick={() => onAddBelow(index)} className="btn btn-circle btn-md btn-ghost bg-base-300 hover:bg-primary/20" title="Add section below">
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default SectionEditor;
