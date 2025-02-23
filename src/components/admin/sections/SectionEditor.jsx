import { useState, useEffect } from "react";
import { Trash2, Plus, Bold, Italic, Underline, Code, Link as LinkIcon, ListIcon } from "lucide-react";

const TextFormatButton = ({ icon: Icon, label, onClick, className = "" }) => (
  <button type="button" onClick={onClick} className={`p-1.5 rounded hover:bg-neutral-700 transition-colors ${className}`} title={label}>
    <Icon size={16} />
  </button>
);

const SectionEditor = ({ section, onUpdate, onDelete }) => {
  const [sectionData, setSectionData] = useState(section);
  const [selectedText, setSelectedText] = useState({ start: 0, end: 0, text: "" });

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

  const insertFormatting = (startTag, endTag) => {
    const textarea = document.getElementById(`section-content-${section.id}`);
    if (!textarea) return;

    const currentContent = textarea.value;
    const { start, end } = selectedText;

    if (startTag.includes('href="URL"')) {
      const url = prompt("Enter URL:", "https://");
      if (!url) return;
      startTag = startTag.replace("URL", url);
    }

    const newContent = currentContent.substring(0, start) + startTag + currentContent.substring(start, end) + endTag + currentContent.substring(end);

    const newData = { ...sectionData, content: newContent };
    setSectionData(newData);
    onUpdate(newData);

    // Reset selection
    textarea.focus();
    textarea.setSelectionRange(start + startTag.length, end + startTag.length);
  };

  return (
    <div className="border border-neutral-700 p-4 rounded-lg mb-4 bg-neutral-800/50">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <select value={sectionData.type} onChange={(e) => handleTypeChange(e.target.value)} className="bg-neutral-800 border border-neutral-600 rounded px-2 py-1">
            <option value="section">Text Section</option>
            <option value="image">Image</option>
            <option value="introduction">Introduction</option>
            <option value="disclaimer">Disclaimer</option>
            <option value="footnote">Footnote</option>
          </select>
        </div>
        <button onClick={() => onDelete()} className="text-red-500 hover:text-red-400">
          <Trash2 size={20} />
        </button>
      </div>

      {sectionData.type === "image" ? (
        <div className="space-y-2">
          {(sectionData.images || [{}]).map((img, idx) => (
            <div key={idx} className="flex gap-2">
              <input type="text" value={img.src || ""} onChange={(e) => handleImageChange(idx, "src", e.target.value)} placeholder="Image URL" className="flex-1 bg-neutral-800 border border-neutral-600 rounded px-2 py-1" />
              <input type="text" value={img.altText || ""} onChange={(e) => handleImageChange(idx, "altText", e.target.value)} placeholder="Alt text" className="flex-1 bg-neutral-800 border border-neutral-600 rounded px-2 py-1" />
            </div>
          ))}
          <button onClick={() => handleImageChange(sectionData.images?.length || 0, "src", "")} className="text-blue-500 hover:text-blue-400 flex items-center gap-1">
            <Plus size={16} /> Add Image
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <input type="text" value={sectionData.title || ""} onChange={handleTitleChange} placeholder="Section Title (optional)" className="w-full bg-neutral-800 border border-neutral-600 rounded px-2 py-1" />

          {/* Text Formatting Toolbar */}
          <div className="flex gap-1 p-1 bg-neutral-800 border border-neutral-600 rounded">
            <TextFormatButton icon={Bold} label="Bold" onClick={() => insertFormatting('<strong class="font-bold">', "</strong>")} />
            <TextFormatButton icon={Italic} label="Italic" onClick={() => insertFormatting("<i>", "</i>")} />
            <TextFormatButton icon={Underline} label="Underline" onClick={() => insertFormatting("<u>", "</u>")} />
            <TextFormatButton icon={Code} label="Code" onClick={() => insertFormatting("<code>", "</code>")} />
            <TextFormatButton icon={LinkIcon} label="Link" onClick={() => insertFormatting('<a href="URL" target="_blank" rel="noopener noreferrer">', "</a>")} />
            <TextFormatButton icon={ListIcon} label="List Item" onClick={() => insertFormatting("<li>", "</li>")} />
          </div>

          <textarea id={`section-content-${section.id}`} value={sectionData.content || ""} onChange={handleContentChange} onSelect={handleSelect} placeholder="Section Content" rows={5} className="w-full bg-neutral-800 border border-neutral-600 rounded px-2 py-1" />
        </div>
      )}
    </div>
  );
};

export default SectionEditor;
