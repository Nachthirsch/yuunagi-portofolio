import { useState, useEffect } from "react";
import { Trash2, Plus, Bold, Italic, Underline, Code, Link as LinkIcon, ListIcon } from "lucide-react";

const TextFormatButton = ({ icon: Icon, label, onClick, className = "" }) => (
  <button type="button" onClick={onClick} className={`p-2 rounded hover:bg-neutral-700 active:bg-neutral-600 touch-manipulation ${className}`} title={label}>
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
    <div className="border border-neutral-700 rounded-lg bg-neutral-900/50">
      <div className="p-3 border-b border-neutral-700 flex items-center gap-2">
        <select value={sectionData.type} onChange={(e) => handleTypeChange(e.target.value)} className="flex-1 bg-neutral-700 px-3 py-2 rounded-lg text-base">
          <option value="section">Text Section</option>
          <option value="image">Image</option>
          <option value="introduction">Introduction</option>
          <option value="disclaimer">Disclaimer</option>
          <option value="footnote">Footnote</option>
        </select>
        <button onClick={() => onDelete()} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg">
          <Trash2 size={20} />
        </button>
      </div>

      <div className="p-3 space-y-3">
        {sectionData.type === "image" ? (
          <div className="space-y-3">
            {(sectionData.images || [{}]).map((img, idx) => (
              <div key={idx} className="space-y-2">
                <input type="text" value={img.src || ""} onChange={(e) => handleImageChange(idx, "src", e.target.value)} placeholder="Image URL" className="w-full bg-neutral-700 px-3 py-2 rounded-lg text-base" />
                <input type="text" value={img.altText || ""} onChange={(e) => handleImageChange(idx, "altText", e.target.value)} placeholder="Alt text" className="w-full bg-neutral-700 px-3 py-2 rounded-lg text-base" />
              </div>
            ))}
            <button onClick={() => handleImageChange(sectionData.images?.length || 0, "src", "")} className="text-blue-500 hover:text-blue-400 flex items-center gap-1">
              <Plus size={16} /> Add Image
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <input type="text" value={sectionData.title || ""} onChange={handleTitleChange} placeholder="Section Title" className="w-full bg-neutral-700 px-3 py-2 rounded-lg text-base" />

            {/* Mobile-optimized formatting toolbar */}
            <div className="flex gap-1 p-1 bg-neutral-700 rounded-lg overflow-x-auto snap-x snap-mandatory">
              {[
                { icon: Bold, label: "Bold", tag: '<strong class="font-bold">', endTag: "</strong>" },
                { icon: Italic, label: "Italic", tag: "<i>", endTag: "</i>" },
                { icon: Underline, label: "Underline", tag: "<u>", endTag: "</u>" },
                { icon: Code, label: "Code", tag: "<code>", endTag: "</code>" },
                { icon: LinkIcon, label: "Link", tag: '<a href="URL">', endTag: "</a>" },
                { icon: ListIcon, label: "List", tag: "<li>", endTag: "</li>" },
              ].map((tool) => (
                <button key={tool.label} onClick={() => insertFormatting(tool.tag, tool.endTag)} className="flex-none snap-start p-2 hover:bg-neutral-600 rounded-lg">
                  <tool.icon size={20} />
                </button>
              ))}
            </div>

            <textarea id={`section-content-${section.id}`} value={sectionData.content || ""} onChange={handleContentChange} onSelect={handleSelect} placeholder="Section Content" rows={5} className="w-full bg-neutral-700 px-3 py-2 rounded-lg text-base" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionEditor;
