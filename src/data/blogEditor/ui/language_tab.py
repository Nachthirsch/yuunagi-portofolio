import tkinter as tk
from tkinter import ttk
from typing import List, Dict
from .scrollable_frame import ScrollableFrame
from .section import Section

class LanguageTab:
    """Represents a language tab in the editor"""
    def __init__(self, notebook, language):
        self.frame = ScrollableFrame(notebook)
        notebook.add(self.frame, text=language)
        
        self.sections: List[Section] = []
        self._create_metadata_frame()
        self._create_sections_frame()

    def _create_metadata_frame(self):
        # Create metadata frame
        metadata_frame = ttk.LabelFrame(self.frame.scrollable_frame, text="Metadata", padding="10")
        metadata_frame.pack(fill=tk.X, padx=10, pady=5)
        
        # Create metadata entries
        self.title_var, _ = self._create_entry(metadata_frame, "Title", True)
        self.description_var, _ = self._create_entry(metadata_frame, "Description", True)
        self.date_var, _ = self._create_entry(metadata_frame, "Date")
        self.author_var, _ = self._create_entry(metadata_frame, "Author")
        self.tags_var, _ = self._create_entry(metadata_frame, "Tags")
        self.thumbnail_var, _ = self._create_entry(metadata_frame, "Thumbnail")

    def _create_entry(self, parent, label, full_width=False):
        frame = ttk.Frame(parent)
        frame.pack(fill=tk.X, pady=2)
        
        label_widget = ttk.Label(frame, text=f"{label}:", width=15)
        label_widget.pack(side=tk.LEFT)
        
        var = tk.StringVar()
        entry = ttk.Entry(frame, textvariable=var)
        entry.pack(side=tk.LEFT, fill=tk.X, expand=full_width, padx=5)
        
        return var, entry

    def _create_sections_frame(self):
        # Create sections container
        self.sections_frame = ttk.LabelFrame(self.frame.scrollable_frame, text="Sections", padding="10")
        self.sections_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=5)
        
        # Add section button
        ttk.Button(self.sections_frame, text="Add Section", 
                  command=self.add_section).pack(pady=5)

    def add_section(self):
        section = Section(self.sections_frame, self.delete_section)
        self.sections.append(section)

    def delete_section(self, section):
        if section in self.sections:
            section.frame.destroy()
            self.sections.remove(section)

    def get_data(self):
        return {
            "metadata": {
                "title": self.title_var.get(),
                "description": self.description_var.get(),
                "date": self.date_var.get(),
                "author": self.author_var.get(),
                "tags": self.tags_var.get(),
                "thumbnail": self.thumbnail_var.get()
            },
            "sections": [section.get_data() for section in self.sections]
        }

    def set_data(self, data: Dict):
        # Set metadata
        metadata = data.get("metadata", {})
        self.title_var.set(metadata.get("title", ""))
        self.description_var.set(metadata.get("description", ""))
        self.date_var.set(metadata.get("date", ""))
        self.author_var.set(metadata.get("author", ""))
        self.tags_var.set(metadata.get("tags", ""))
        self.thumbnail_var.set(metadata.get("thumbnail", ""))
        
        # Clear existing sections
        for section in self.sections:
            section.frame.destroy()
        self.sections.clear()
        
        # Create new sections
        for section_data in data.get("sections", []):
            section = Section(self.sections_frame, self.delete_section)
            section.set_data(section_data)
            self.sections.append(section)
