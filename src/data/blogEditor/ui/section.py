import tkinter as tk
from tkinter import ttk
from .fullscreen_editor import FullscreenEditor

class Section:
    """Represents a section in the blog post"""
    def __init__(self, parent, delete_callback):
        self.frame = ttk.Frame(parent)
        self.frame.pack(fill=tk.X, padx=10, pady=10)
        
        # Create main container with improved styling
        self.border_frame = ttk.LabelFrame(self.frame, text="Section", padding="10")
        self.border_frame.pack(fill=tk.X, padx=5, pady=5)

        # Add visual separator
        ttk.Separator(self.frame, orient='horizontal').pack(fill=tk.X, pady=5)

        # Create type selector
        self._create_type_selector()
        
        # Create content frames
        self._create_content_frames()
        
        # Create delete button
        ttk.Button(self.border_frame, text="Delete Section", 
                  command=lambda: delete_callback(self)).pack(pady=5)

        # Initialize type
        self.on_type_change()

    def _create_type_selector(self):
        type_frame = ttk.Frame(self.border_frame)
        type_frame.pack(fill=tk.X, pady=5)
        ttk.Label(type_frame, text="Type:", width=10).pack(side=tk.LEFT)
        self.type_var = tk.StringVar(value="section")
        types = ["introduction", "section", "disclaimer", "image"]
        self.type_combo = ttk.Combobox(type_frame, textvariable=self.type_var, 
                                     values=types, state="readonly")
        self.type_combo.pack(side=tk.LEFT, padx=5)
        self.type_var.trace_add("write", lambda *args: self.on_type_change())

    def _create_content_frames(self):
        # Regular content frame
        self.regular_content_frame = ttk.Frame(self.border_frame)
        self._create_regular_content()
        
        # Image content frame
        self.image_content_frame = ttk.Frame(self.border_frame)
        self._create_image_content()

    def _create_regular_content(self):
        # Title section
        self.title_frame = ttk.Frame(self.regular_content_frame)
        self.title_frame.pack(fill=tk.X, pady=5)
        ttk.Label(self.title_frame, text="Title:", width=10).pack(side=tk.LEFT)
        self.title_var = tk.StringVar()
        self.title_entry = ttk.Entry(self.title_frame, textvariable=self.title_var)
        self.title_entry.pack(side=tk.LEFT, fill=tk.X, expand=True, padx=5)

        # Content section
        content_frame = ttk.Frame(self.regular_content_frame)
        content_frame.pack(fill=tk.BOTH, expand=True, pady=5)
        ttk.Label(content_frame, text="Content:").pack(anchor=tk.W)
        
        # Create text widget with scrollbar
        self.content_text = tk.Text(content_frame, wrap=tk.WORD, height=10)
        scrollbar = ttk.Scrollbar(content_frame, orient="vertical", command=self.content_text.yview)
        self.content_text.configure(yscrollcommand=scrollbar.set)
        
        self.content_text.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)

        # Toolbar
        toolbar_frame = ttk.LabelFrame(self.regular_content_frame, text="Formatting Tools", padding="5")
        toolbar_frame.pack(fill=tk.X, pady=5)
        
        # Add fullscreen button to toolbar
        ttk.Button(toolbar_frame, text="📺 Fullscreen", 
                  command=self._open_fullscreen_editor).pack(side=tk.RIGHT, padx=5)

    def _create_image_content(self):
        # Image path
        path_frame = ttk.Frame(self.image_content_frame)
        path_frame.pack(fill=tk.X, pady=5)
        ttk.Label(path_frame, text="Image Path:", width=10).pack(side=tk.LEFT)
        self.image_path_var = tk.StringVar()
        self.image_path_entry = ttk.Entry(path_frame, textvariable=self.image_path_var)
        self.image_path_entry.pack(side=tk.LEFT, fill=tk.X, expand=True, padx=5)

        # Alt text
        alt_frame = ttk.Frame(self.image_content_frame)
        alt_frame.pack(fill=tk.X, pady=5)
        ttk.Label(alt_frame, text="Alt Text:", width=10).pack(side=tk.LEFT)
        self.alt_text_var = tk.StringVar()
        self.alt_text_entry = ttk.Entry(alt_frame, textvariable=self.alt_text_var)
        self.alt_text_entry.pack(side=tk.LEFT, fill=tk.X, expand=True, padx=5)

    def _open_fullscreen_editor(self):
        FullscreenEditor(self.frame, self.content_text, self.title_var)

    def on_type_change(self, *args):
        # Hide both frames first
        self.regular_content_frame.pack_forget()
        self.image_content_frame.pack_forget()
        
        # Show appropriate frame based on type
        if self.type_var.get() == "image":
            self.image_content_frame.pack(fill=tk.BOTH, expand=True)
        else:
            self.regular_content_frame.pack(fill=tk.BOTH, expand=True)

    def get_data(self):
        data = {
            "type": self.type_var.get()
        }
        
        if self.type_var.get() == "image":
            data.update({
                "image_path": self.image_path_var.get(),
                "alt_text": self.alt_text_var.get()
            })
        else:
            data.update({
                "title": self.title_var.get(),
                "content": self.content_text.get("1.0", tk.END).strip()
            })
        
        return data

    def set_data(self, data):
        self.type_var.set(data.get("type", "section"))
        
        if data.get("type") == "image":
            self.image_path_var.set(data.get("image_path", ""))
            self.alt_text_var.set(data.get("alt_text", ""))
        else:
            self.title_var.set(data.get("title", ""))
            self.content_text.delete("1.0", tk.END)
            self.content_text.insert("1.0", data.get("content", ""))
