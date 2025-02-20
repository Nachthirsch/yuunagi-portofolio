import tkinter as tk
from tkinter import ttk, messagebox, simpledialog, filedialog
import tkinterweb
from tkinter import font
import json
from datetime import datetime
import os
from typing import Dict, List
import traceback
from git import Repo
from git.exc import GitCommandError

class ScrollableFrame(ttk.Frame):
    """A custom frame that implements scrolling functionality"""
    def __init__(self, container, *args, **kwargs):
        super().__init__(container, *args, **kwargs)
        # Create canvas and scrollbar
        self.canvas = tk.Canvas(self)
        self.scrollbar = ttk.Scrollbar(self, orient="vertical", command=self.canvas.yview)
        self.scrollable_frame = ttk.Frame(self.canvas)

        # Configure scroll behavior
        self.scrollable_frame.bind(
            "<Configure>",
            lambda e: self.canvas.configure(scrollregion=self.canvas.bbox("all"))
        )
        self.canvas.bind('<Configure>', self._configure_canvas)
        
        # Create canvas window
        self.canvas_frame = self.canvas.create_window((0, 0), window=self.scrollable_frame, anchor="nw")
        
        # Configure canvas scroll
        self.canvas.configure(yscrollcommand=self.scrollbar.set)
        
        # Pack elements
        self.scrollbar.pack(side="right", fill="y")
        self.canvas.pack(side="left", fill="both", expand=True)
        
        # Bind mouse wheel
        self.scrollable_frame.bind('<Enter>', self._bound_to_mousewheel)
        self.scrollable_frame.bind('<Leave>', self._unbound_to_mousewheel)

    def _bound_to_mousewheel(self, event):
        self.canvas.bind_all("<MouseWheel>", self._on_mousewheel)

    def _unbound_to_mousewheel(self, event):
        self.canvas.unbind_all("<MouseWheel>")

    def _on_mousewheel(self, event):
        self.canvas.yview_scroll(int(-1*(event.delta/120)), "units")

    def _configure_canvas(self, event):
        self.canvas.itemconfig(self.canvas_frame, width=event.width)

class FullscreenEditor(tk.Toplevel):
    """A fullscreen editor window for content writing"""
    def __init__(self, parent, content_text, title_var=None):
        super().__init__(parent)
        self.content_text = content_text
        self.title_var = title_var
        
        # Configure window
        self.title("Fullscreen Editor")
        self.state('zoomed')  # Make window fullscreen
        self.configure(bg='#1e1e1e')  # Dark theme background
        
        # Create main container
        main_frame = ttk.Frame(self)
        main_frame.pack(fill=tk.BOTH, expand=True, padx=20, pady=20)
        
        # Add title if provided
        if title_var:
            title_frame = ttk.Frame(main_frame)
            title_frame.pack(fill=tk.X, pady=(0, 10))
            ttk.Label(title_frame, text="Title:").pack(side=tk.LEFT)
            ttk.Entry(title_frame, textvariable=title_var, width=60).pack(side=tk.LEFT, padx=5)

        # Create toolbar
        self._create_toolbar(main_frame)
        
        # Create text widget
        self.editor = tk.Text(main_frame, wrap=tk.WORD, font=('Arial', 12), height=30)
        self.editor.pack(fill=tk.BOTH, expand=True, pady=5)
        
        # Copy content from original text widget
        self.editor.insert('1.0', self.content_text.get('1.0', tk.END))
        
        # Add scrollbar
        scrollbar = ttk.Scrollbar(main_frame, orient="vertical", command=self.editor.yview)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        self.editor.configure(yscrollcommand=scrollbar.set)
        
        # Exit button
        ttk.Button(main_frame, text="Save and Exit", command=self.save_and_exit).pack(pady=10)
        
        # Bind escape key to exit fullscreen
        self.bind('<Escape>', lambda e: self.save_and_exit())

    def _create_toolbar(self, parent):
        toolbar = ttk.Frame(parent)
        toolbar.pack(fill=tk.X, pady=(0, 5))
        
        style_buttons = [
            ("Bold", "<b>", "</b>"),
            ("Italic", "<i>", "</i>"),
            ("Underline", "<u>", "</u>"),
            ("Code", "<code>", "</code>"),
            ("Link", '<a href="URL">', "</a>"),
            ("List Item", "<li>", "</li>"),
        ]
        
        for label, start_tag, end_tag in style_buttons:
            ttk.Button(toolbar, text=label,
                      command=lambda s=start_tag, e=end_tag: 
                      self._apply_style(s, e)).pack(side=tk.LEFT, padx=2)

    def _apply_style(self, start_tag: str, end_tag: str):
        try:
            selected = self.editor.get("sel.first", "sel.last")
            if selected:
                if start_tag == '<a href="URL">':
                    url = simpledialog.askstring("Input", "Enter URL:")
                    if url:
                        start_tag = f'<a href="{url}" target="_blank" rel="noopener noreferrer">'
                    else:
                        return
                
                self.editor.delete("sel.first", "sel.last")
                self.editor.insert("insert", f"{start_tag}{selected}{end_tag}")
        except tk.TclError:
            pass

    def save_and_exit(self):
        # Update original text widget
        self.content_text.delete('1.0', tk.END)
        self.content_text.insert('1.0', self.editor.get('1.0', tk.END))
        self.destroy()

class Section:
    """Represents a section in the blog post"""
    def __init__(self, parent, delete_callback, add_below_callback):
        self.frame = ttk.Frame(parent)
        self.frame.pack(fill=tk.X, padx=10, pady=10)  # Increased padding
        
        # Create main container with improved styling
        self.border_frame = ttk.LabelFrame(self.frame, text="Section", padding="10")
        self.border_frame.pack(fill=tk.X, padx=5, pady=5)

        # Add visual separator
        ttk.Separator(self.frame, orient='horizontal').pack(fill=tk.X, pady=5)

        # Create type selector
        self._create_type_selector()
        
        # Create content frames
        self._create_content_frames()
        
        # Create button container
        button_frame = ttk.Frame(self.border_frame)
        button_frame.pack(pady=5)
        
        # Create delete button
        ttk.Button(button_frame, text="Delete Section", 
                  command=lambda: delete_callback(self)).pack(side=tk.LEFT, padx=2)
                  
        # Add "Add Below" button
        ttk.Button(button_frame, text="Add Below", 
                  command=lambda: add_below_callback(self)).pack(side=tk.LEFT, padx=2)

        # Initialize type
        self.on_type_change()

    def _create_type_selector(self):
        type_frame = ttk.Frame(self.border_frame)
        type_frame.pack(fill=tk.X, pady=5)  # Added vertical padding
        ttk.Label(type_frame, text="Type:", width=10).pack(side=tk.LEFT)
        self.type_var = tk.StringVar(value="section")
        types = ["introduction", "section", "disclaimer", "image", "footnote"]  # Added footnote
        self.type_combo = ttk.Combobox(type_frame, textvariable=self.type_var, 
                                     values=types, state="readonly")
        self.type_combo.pack(side=tk.LEFT, padx=5)
        self.type_var.trace_add("write", self.on_type_change)

    def _create_content_frames(self):
        # Regular content frame
        self.regular_content_frame = ttk.Frame(self.border_frame)
        self._create_regular_content()
        
        # Image content frame
        self.image_content_frame = ttk.Frame(self.border_frame)
        self._create_image_content()

    def _create_regular_content(self):  
        # Improved styling for title section
        self.title_frame = ttk.Frame(self.regular_content_frame)
        self.title_frame.pack(fill=tk.X, pady=5)
        ttk.Label(self.title_frame, text="Title:", width=10).pack(side=tk.LEFT)
        self.title_var = tk.StringVar()
        self.title_entry = ttk.Entry(self.title_frame, textvariable=self.title_var)
        self.title_entry.pack(side=tk.LEFT, fill=tk.X, expand=True, padx=5)

        # Improved styling for toolbar
        toolbar_frame = ttk.LabelFrame(self.regular_content_frame, text="Formatting Tools", padding="5")
        toolbar_frame.pack(fill=tk.X, pady=5)
        
        # Add fullscreen button to toolbar
        ttk.Button(toolbar_frame, text="📺 Fullscreen", 
                  command=self._open_fullscreen_editor).pack(side=tk.RIGHT, padx=5)
        
        style_buttons = [
            ("Bold", "font-bold", "<b>", "</b>"),
            ("Italic", "italic", "<i>", "</i>"),
            ("Underline", "underline", "<u>", "</u>"),  # Added underline
            ("Code", "font-mono bg-neutral-800 px-1 rounded", "<code>", "</code>"),
            ("Link", "text-blue-400 hover:underline", '<a href="URL">', "</a>"),
            ("List Item", "list-disc ml-4", "<li>", "</li>"),
        ]
        
        for label, css_class, start_tag, end_tag in style_buttons:
            btn = ttk.Button(toolbar_frame, text=label,
                           command=lambda s=start_tag, e=end_tag: 
                           self._apply_style(s, e))
            btn.pack(side=tk.LEFT, padx=2)

        # Improved content section
        content_frame = ttk.Frame(self.regular_content_frame)
        content_frame.pack(fill=tk.BOTH, expand=True, pady=5)
        ttk.Label(content_frame, text="Content:", width=10).pack(anchor=tk.W)
        self.content_text = tk.Text(content_frame, height=6, wrap=tk.WORD)  # Increased height
        self.content_text.pack(fill=tk.BOTH, expand=True, padx=5)

        # Add scrollbar to content
        scrollbar = ttk.Scrollbar(content_frame, orient="vertical", command=self.content_text.yview)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        self.content_text.configure(yscrollcommand=scrollbar.set)

    def _open_fullscreen_editor(self):
        """Open the fullscreen editor window"""
        FullscreenEditor(self.frame, self.content_text, self.title_var)

    def _apply_style(self, start_tag: str, end_tag: str):
        """Apply HTML styling to selected text"""
        try:
            selected = self.content_text.get("sel.first", "sel.last")
            if selected:
                if start_tag == '<a href="URL">':
                    url = simpledialog.askstring("Input", "Enter URL:")
                    if url:
                        start_tag = f'<a href="{url}" target="_blank" rel="noopener noreferrer">'
                    else:
                        return
                
                self.content_text.delete("sel.first", "sel.last")
                self.content_text.insert("insert", f"{start_tag}{selected}{end_tag}")
        except tk.TclError:
            # No selection, ignore
            pass

    def _create_image_content(self):
        self.images_frame = ttk.Frame(self.image_content_frame)
        self.images_frame.pack(fill=tk.BOTH, expand=True)
        
        # List to store image entry pairs
        self.image_entries = []
        
        # Add buttons
        btn_frame = ttk.Frame(self.image_content_frame)
        btn_frame.pack(fill=tk.X, pady=5)
        ttk.Button(btn_frame, text="Add Image", command=self._add_image_entry).pack(side=tk.LEFT, padx=5)
        ttk.Button(btn_frame, text="Remove Last", command=self._remove_image_entry).pack(side=tk.LEFT)
        
        # Add first image entry by default
        self._add_image_entry()

    def _add_image_entry(self):
        """Add a new image URL and alt text entry pair"""
        frame = ttk.Frame(self.images_frame)
        frame.pack(fill=tk.X, pady=2)
        
        # Image number label
        ttk.Label(frame, text=f"Image {len(self.image_entries) + 1}:").pack(side=tk.LEFT)
        
        # URL entry
        src_var = tk.StringVar()
        ttk.Entry(frame, textvariable=src_var, width=40).pack(side=tk.LEFT, padx=5)
        
        # Alt text entry
        alt_var = tk.StringVar()
        ttk.Label(frame, text="Alt:").pack(side=tk.LEFT)
        ttk.Entry(frame, textvariable=alt_var, width=20).pack(side=tk.LEFT, padx=5)
        
        self.image_entries.append((frame, src_var, alt_var))

    def _remove_image_entry(self):
        """Remove the last image entry pair"""
        if len(self.image_entries) > 1:  # Keep at least one entry
            frame, _, _ = self.image_entries.pop()
            frame.destroy()

    def on_type_change(self, *args):
        """Handle section type changes"""
        self.regular_content_frame.pack_forget()
        self.image_content_frame.pack_forget()

        if self.type_var.get() == "image":
            self.image_content_frame.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)
        else:
            self.regular_content_frame.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)

    def _format_content(self, content: str) -> str:
        """Format content by properly handling line breaks"""
        if not content.strip():
            return ""

        # Split content into paragraphs based on double newlines
        paragraphs = content.split('\n\n')
        formatted_paragraphs = []

        for paragraph in paragraphs:
            # Handle single newlines within paragraphs
            lines = paragraph.strip().split('\n')
            # Filter out empty lines and join with <br>
            lines = [line.strip() for line in lines if line.strip()]
            if lines:
                # Join lines within paragraph with <br>
                paragraph_content = '<br>'.join(lines)
                # Wrap in <p> tags if not already wrapped
                if not paragraph_content.startswith('<p>'):
                    paragraph_content = f"<p>{paragraph_content}</p>"
                formatted_paragraphs.append(paragraph_content)

        # Join paragraphs with newlines for better readability
        return '\n'.join(formatted_paragraphs)

    def get_data(self) -> Dict:
        """Return section data in dictionary format"""
        if self.type_var.get() == "image":
            images = []
            for _, src_var, alt_var in self.image_entries:
                src = src_var.get().strip()
                if src:  # Only include non-empty URLs
                    images.append({
                        "src": src,
                        "altText": alt_var.get().strip()
                    })
            return {
                "type": "image",
                "images": images
            }
        else:
            # Regular content handling
            content = self.content_text.get("1.0", tk.END).strip()
            if content:
                # Format content with proper line breaks
                content = self._format_content(content)
            
            data = {
                "type": self.type_var.get(),
                "content": content
            }
            if self.title_var.get().strip():
                data["title"] = self.title_var.get().strip()
            return data

    def set_data(self, data: Dict):
        """Set section data from dictionary"""
        self.type_var.set(data.get("type", "section"))
        if data["type"] == "image":
            # Clear existing entries
            for frame, _, _ in self.image_entries:
                frame.destroy()
            self.image_entries.clear()
            
            # Add entries for each image
            images = data.get("images", [])
            if not images:  # If no images, add one empty entry
                self._add_image_entry()
            else:
                for img in images:
                    self._add_image_entry()
                    _, src_var, alt_var = self.image_entries[-1]
                    src_var.set(img.get("src", ""))
                    alt_var.set(img.get("altText", ""))
        else:
            self.title_var.set(data.get("title", ""))
            # Process content for display
            content = data.get("content", "")
            content = content.replace("<p>", "").replace("</p>", "")
            # Replace <br> with newlines for editing
            content = content.replace("<br>", "\n")
            self.content_text.delete("1.0", tk.END)
            self.content_text.insert("1.0", content.strip())

class LanguageTab:
    """Represents a language tab in the editor"""
    def __init__(self, notebook, language):
        self.frame = ScrollableFrame(notebook)
        notebook.add(self.frame, text=language)
        
        self.sections: List[Section] = []
        self._create_metadata_frame()
        self._create_sections_frame()
        self.button_frame = ttk.Frame(self.sections_frame)
        self.button_frame.pack(fill=tk.X, pady=5)
        
        # Add buttons for both top and bottom section addition
        ttk.Button(self.button_frame, text="Add Section at Top", 
                  command=lambda: self.add_section(at_top=True)).pack(side=tk.LEFT, padx=5)
        self.add_button = ttk.Button(self.sections_frame, text="Add New Section", 
                                   command=lambda: self.add_section(at_top=False))
        self.add_button.pack(pady=5)

    def _create_metadata_frame(self):
        meta_frame = ttk.LabelFrame(self.frame.scrollable_frame, text="Metadata", padding="10")
        meta_frame.pack(fill=tk.X, padx=10, pady=10)

        # Create two-column layout for metadata
        left_frame = ttk.Frame(meta_frame)
        left_frame.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        right_frame = ttk.Frame(meta_frame)
        right_frame.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)

        # Distribute fields between columns
        self.vars = {
            'title': self._create_entry(left_frame, "Title:"),
            'date': self._create_entry(left_frame, "Date (YYYY-MM-DD):"),
            'author': self._create_entry(right_frame, "Author:"),
            'category': self._create_entry(right_frame, "Category:"),
            'tags': self._create_entry(meta_frame, "Tags (comma-separated):", full_width=True)
        }

    def _create_entry(self, parent, label, full_width=False) -> tk.StringVar:
        frame = ttk.Frame(parent)
        frame.pack(fill=tk.X, pady=2, padx=5)
        ttk.Label(frame, text=label, width=20).pack(side=tk.LEFT)
        var = tk.StringVar()
        entry = ttk.Entry(frame, textvariable=var)
        if full_width:
            entry.pack(fill=tk.X, expand=True)
        else:
            entry.pack(side=tk.LEFT, fill=tk.X, expand=True)
        return var

    def _create_sections_frame(self):
        """Create the sections container frame"""
        self.sections_frame = ttk.LabelFrame(self.frame.scrollable_frame, text="Sections")
        self.sections_frame.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)
        
        # Create a container for sections and button
        self.sections_container = ttk.Frame(self.sections_frame)
        self.sections_container.pack(fill=tk.BOTH, expand=True)
        
        # Button will be added at the bottom after sections
        self.add_button = ttk.Button(self.sections_frame, text="Add New Section", 
                                   command=lambda: self.add_section())

    def add_section(self, after_section=None, at_top=False):
        """Add a new section to the tab, optionally at top or after a specific section"""
        # Hide the button temporarily
        self.add_button.pack_forget()
        
        # Create new section
        new_section = Section(self.sections_container, self.delete_section, self.add_section)
        
        if at_top:
            # Insert at beginning of list
            self.sections.insert(0, new_section)
            self._repack_sections()
        elif after_section:
            # Insert after specified section
            idx = self.sections.index(after_section)
            self.sections.insert(idx + 1, new_section)
            self._repack_sections()
        else:
            # Add to end as before
            self.sections.append(new_section)
        
        # Show the button at the bottom
        self.add_button.pack(pady=5)

    def _repack_sections(self):
        """Repack all sections in the correct order"""
        # Unpack all sections
        for section in self.sections:
            section.frame.pack_forget()
        
        # Repack in the correct order
        for section in self.sections:
            section.frame.pack(fill=tk.X, padx=10, pady=10)

    def set_data(self, data: Dict):
        """Set tab data from dictionary"""
        self.vars['title'].set(data.get("title", ""))
        metadata = data.get("metadata", {})
        self.vars['date'].set(metadata.get("date", ""))  # Set date from metadata
        self.vars['author'].set(metadata.get("author", ""))
        self.vars['category'].set(metadata.get("category", ""))
        self.vars['tags'].set(", ".join(metadata.get("tags", [])))

        # Clear existing sections
        for section in self.sections:
            section.frame.destroy()
        self.sections.clear()

        # Create new sections
        for section_data in data.get("sections", []):
            new_section = Section(self.sections_container, self.delete_section, self.add_section)
            self.sections.append(new_section)
            new_section.set_data(section_data)
        
        # Make sure button is at the bottom
        self.add_button.pack(pady=5)

    def delete_section(self, section):
        """Delete a section from the tab"""
        if section in self.sections:
            self.sections.remove(section)
            section.frame.destroy()
            # Re-pack the add button to keep it at the bottom
            self.add_button.pack_forget()
            self.add_button.pack(pady=5)

    def get_data(self) -> Dict:
        """Get all data from the tab"""
        # Validate date format
        date_str = self.vars['date'].get().strip()
        try:
            if date_str:
                datetime.strptime(date_str, "%Y-%m-%d")
            else:
                date_str = datetime.now().strftime("%Y-%m-%d")  # Default to current date if empty
        except ValueError:
            messagebox.showwarning("Warning", "Invalid date format. Using current date instead.")
            date_str = datetime.now().strftime("%Y-%m-%d")

        return {
            "title": self.vars['title'].get().strip(),
            "metadata": {
                "date": date_str,
                "author": self.vars['author'].get().strip(),
                "category": self.vars['category'].get().strip(),
                "tags": [tag.strip() for tag in self.vars['tags'].get().split(',') if tag.strip()]
            },
            "sections": [section.get_data() for section in self.sections]
        }

class BlogPostEditor:
    """Main application class for the Blog Post Editor"""
    def __init__(self, root):
        self.root = root
        self.root.title("Blog Post Editor")
        self.root.geometry("1000x800")
        
        # Initialize data storage
        self.data = {}
        self.current_project_id = None
        self.setup_file_path()
        
        # Add toggle state for project management
        self.project_frame_expanded = True
        
        # Create main application frame
        self.main_frame = ttk.Frame(root)
        self.main_frame.pack(fill=tk.BOTH, expand=True)
        
        # Initialize language tabs dictionary
        self.language_tabs = {}
        
        # Create UI components
        self._create_project_management()
        self._create_language_management()
        self._create_language_tabs()
        
        # Set up automatic saving
        self._setup_autosave()
        
        # Load initial data
        self.load_data()
        self.update_project_list()

        # Initialize git repository
        self.repo_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../'))
        try:
            self.repo = Repo(self.repo_path)
        except Exception as e:
            messagebox.showerror("Git Error", f"Failed to initialize git repository: {str(e)}")
            self.repo = None

        # Configure style
        self._configure_styles()
        
        # Add preview window
        self._create_preview_window()

    def setup_file_path(self):
        """Set up the path for the JSON storage file"""
        current_dir = os.path.dirname(os.path.abspath(__file__))
        self.json_file_path = os.path.join(current_dir, 'blogPosts.json')
        os.makedirs(current_dir, exist_ok=True)

    def _configure_styles(self):
        style = ttk.Style()
        style.configure('TLabelframe', padding=5)
        style.configure('TButton', padding=5)
        style.configure('Preview.TButton', background='#4CAF50')

    def _create_preview_window(self):
        self.preview_window = None

    def show_preview(self):
        if self.preview_window is None or not tk.Toplevel.winfo_exists(self.preview_window):
            self.preview_window = tk.Toplevel(self.root)
            self.preview_window.title("Blog Preview")
            self.preview_window.geometry("800x600")

            # Create HTML viewer
            preview_frame = ttk.Frame(self.preview_window)
            preview_frame.pack(fill=tk.BOTH, expand=True)
            
            self.html_viewer = tkinterweb.HtmlFrame(preview_frame)
            self.html_viewer.pack(fill=tk.BOTH, expand=True)

        # Generate and display preview
        if self.current_project_id:
            current_tab = self.notebook.select()
            if current_tab:
                tab_id = self.notebook.index(current_tab)
                tab_text = self.notebook.tab(tab_id, "text")
                lang_code = tab_text.split("(")[1].split(")")[0].lower()  # Fixed double quotes
                
                if lang_code in self.language_tabs:
                    tab_data = self.language_tabs[lang_code].get_data()
                    html_content = self._generate_preview_html(tab_data)
                    self.html_viewer.load_html(html_content)

    def _generate_preview_html(self, data):
        html = f"""
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }}
                img {{ max-width: 100%; height: auto; }}
                .metadata {{ color: #666; margin-bottom: 20px; }}
                .section {{ margin-bottom: 30px; }}
            </style>
        </head>
        <body>
            <h1>{data['title']}</h1>
            <div class="metadata">
                <p>Date: {data['metadata']['date']}</p>
                <p>Author: {data['metadata']['author']}</p>
                <p>Category: {data['metadata']['category']}</p>
                <p>Tags: {', '.join(data['metadata']['tags'])}</p>
            </div>
        """
        
        for section in data['sections']:
            html += '<div class="section">'
            if section['type'] == 'image':
                for img in section['images']:
                    html += f'<img src="{img["src"]}" alt="{img["altText"]}">'
            else:
                if 'title' in section:
                    html += f'<h2>{section["title"]}</h2>'
                html += f'{section["content"]}'
            html += '</div>'
        
        html += "</body></html>"
        return html

    def save_project(self, show_message=True):
        """Save the current project"""
        if not self.current_project_id:
            messagebox.showerror("Error", "No project selected")
            return

        # Get current project data from all language tabs
        translations = {}
        for lang_code, tab in self.language_tabs.items():
            translations[lang_code] = tab.get_data()

        self.data[self.current_project_id] = {
            "translations": translations
        }

        # Ask user about GitHub push
        push_to_github = messagebox.askyesno(
            "Save Options",
            "Do you want to push changes to GitHub?\nClick 'No' to save locally only."
        )

        # Save to file
        try:
            with open(self.json_file_path, 'w', encoding='utf-8') as f:
                json.dump(self.data, f, indent=2, ensure_ascii=False)

            if push_to_github and self.git_push_changes():
                if show_message:
                    messagebox.showinfo("Success", "Project saved and pushed to GitHub successfully")
            elif show_message:
                messagebox.showinfo("Success", "Project saved locally")
            
            return True
        except Exception as e:
            self._handle_error("Error saving data", e)
            return False

    def _create_project_management(self):
        """Create the project management section of the UI with minimizable feature"""
        # Create outer frame for project management
        self.project_outer_frame = ttk.Frame(self.main_frame)
        self.project_outer_frame.pack(fill=tk.X, padx=10, pady=5)
        
        # Create header frame with toggle button
        header_frame = ttk.Frame(self.project_outer_frame)
        header_frame.pack(fill=tk.X)
        
        # Create toggle button
        self.toggle_btn = ttk.Button(header_frame, text="▼", width=3, 
                                   command=self._toggle_project_frame)
        self.toggle_btn.pack(side=tk.LEFT)
        
        # Add section label
        ttk.Label(header_frame, text="Project Management").pack(side=tk.LEFT, padx=5)
        
        # Create main project frame that will be toggled
        self.project_frame = ttk.LabelFrame(self.project_outer_frame, padding="10")
        self.project_frame.pack(fill=tk.X, pady=5)

        # Three-column layout
        left_frame = ttk.Frame(self.project_frame)
        left_frame.pack(side=tk.LEFT, fill=tk.X, expand=True)
        
        middle_frame = ttk.Frame(self.project_frame)
        middle_frame.pack(side=tk.LEFT, padx=10)
        
        right_frame = ttk.Frame(self.project_frame)
        right_frame.pack(side=tk.LEFT)

        # Project selector in left frame
        ttk.Label(left_frame, text="Current Project:").pack(anchor=tk.W)
        self.project_id_combo = ttk.Combobox(left_frame, width=50, state="readonly")
        self.project_id_combo.pack(fill=tk.X, pady=2)
        self.project_id_combo.bind("<<ComboboxSelected>>", self.load_project)

        # Action buttons in middle frame
        for text, command in [
            ("Save", self.save_project),
            ("Delete", self.delete_project),
            ("Rename", self.rename_project),
            ("Export", self.export_project),
            ("Import", self.import_project),
            ("Preview", self.show_preview)
        ]:
            ttk.Button(middle_frame, text=text, command=command, width=15).pack(pady=2)

        # New project controls in right frame
        ttk.Label(right_frame, text="New Project ID:").pack(anchor=tk.W)
        self.new_project_id_var = tk.StringVar()
        ttk.Entry(right_frame, textvariable=self.new_project_id_var, width=30).pack(pady=2)
        ttk.Button(right_frame, text="Create New", command=self.new_project, width=15).pack(pady=2)

    def _toggle_project_frame(self):
        """Toggle the visibility of project management frame"""
        self.project_frame_expanded = not self.project_frame_expanded
        if self.project_frame_expanded:
            self.project_frame.pack(fill=tk.X, pady=5)
            self.toggle_btn.configure(text="▼")
        else:
            self.project_frame.pack_forget()
            self.toggle_btn.configure(text="▶")

    def _create_project_buttons(self, parent):
        """Create buttons for project management"""
        button_frame = ttk.Frame(parent)
        button_frame.pack(side=tk.LEFT, padx=5)
        
        buttons = [
            ("Save", self.save_project),
            ("Delete", self.delete_project),
            ("Rename", self.rename_project),
            ("Export", self.export_project),
            ("Import", self.import_project)
        ]
        
        for text, command in buttons:
            ttk.Button(button_frame, text=text, command=command).pack(side=tk.LEFT, padx=2)

    def _create_language_management(self):
        """Create the language management section"""
        lang_frame = ttk.Frame(self.main_frame)
        lang_frame.pack(fill=tk.X, padx=10, pady=5)
        
        # Language management
        ttk.Label(lang_frame, text="Add Language:").pack(side=tk.LEFT, padx=5)
        self.new_lang_var = tk.StringVar()
        self.lang_entry = ttk.Entry(lang_frame, textvariable=self.new_lang_var, width=20)
        self.lang_entry.pack(side=tk.LEFT, padx=5)
        ttk.Button(lang_frame, text="Add Language", command=self.add_language_tab).pack(side=tk.LEFT, padx=5)
        
        # Add Delete Language button
        ttk.Button(lang_frame, text="Delete Language", command=self.delete_language_tab).pack(side=tk.LEFT, padx=5)

    def delete_language_tab(self):
        """Delete the currently selected language tab"""
        current_tab = self.notebook.select()
        if not current_tab:
            messagebox.showerror("Error", "No language tab selected")
            return

        tab_id = self.notebook.index(current_tab)
        tab_text = self.notebook.tab(tab_id, "text")
        lang_code = tab_text.split("(")[1].split(")")[0].lower()

        if messagebox.askyesno("Confirm Delete", f"Are you sure you want to delete the {tab_text} language tab?"):
            # Remove from notebook
            self.notebook.forget(current_tab)
            
            # Remove from language tabs dictionary
            if lang_code in self.language_tabs:
                del self.language_tabs[lang_code]

            # Remove translations from data
            if self.current_project_id and lang_code in self.data[self.current_project_id]["translations"]:
                del self.data[self.current_project_id]["translations"][lang_code]
                self.save_data()

    def _create_language_tabs(self):
        """Create the language tabs notebook"""
        self.notebook = ttk.Notebook(self.main_frame)
        self.notebook.pack(fill=tk.BOTH, expand=True, padx=10, pady=5)
        
        # Remove default Indonesian tab creation
        # The notebook starts empty now

    def add_language_tab(self, lang_code=None, lang_name=None):
        """Add a new language tab"""
        if lang_code is None:
            # Get input from entry if not provided
            lang_input = self.new_lang_var.get().strip()
            if not lang_input:
                messagebox.showerror("Error", "Please enter a language code and name (e.g., 'en:English')")
                return
                
            try:
                lang_code, lang_name = lang_input.split(':')
                lang_code = lang_code.strip().lower()
                lang_name = lang_name.strip()
            except ValueError:
                messagebox.showerror("Error", "Invalid format. Use 'code:name' (e.g., 'en:English')")
                return

        # Check if language already exists
        if lang_code in self.language_tabs:
            messagebox.showerror("Error", f"Language '{lang_code}' already exists")
            return

        # Create new tab
        new_tab = LanguageTab(self.notebook, f"{lang_name} ({lang_code.upper()})")
        self.language_tabs[lang_code] = new_tab
        
        # Clear input field
        self.new_lang_var.set("")

    def load_project(self, event=None):
        """Load the selected project"""
        project_id = self.project_id_combo.get()
        if project_id in self.data:
            self.current_project_id = project_id
            project_data = self.data[project_id].get("translations", {})
            
            # Clear existing tabs
            for tab in self.notebook.tabs():
                self.notebook.forget(tab)
            self.language_tabs.clear()
            
            # Create language tabs for existing translations
            language_names = {
                "id": "Indonesian",
                "en": "English",
                "jp": "Japanese",
                # Add more language mappings as needed
            }
            
            # Create tabs for each existing translation
            for lang_code in project_data.keys():
                lang_name = language_names.get(lang_code, lang_code.upper())
                self.add_language_tab(lang_code, lang_name)
            
            # Initialize empty translation template
            empty_translation = {
                "title": "",
                "metadata": {
                    "date": datetime.now().strftime("%Y-%m-%d"),
                    "author": "",
                    "category": "",
                    "tags": []
                },
                "sections": []
            }
            
            # Load data for each language tab
            for lang_code, tab in self.language_tabs.items():
                tab.set_data(project_data.get(lang_code, empty_translation.copy()))

    def save_project(self, show_message=True):
        """Save the current project"""
        if not self.current_project_id:
            messagebox.showerror("Error", "No project selected")
            return

        # Get current project data from all language tabs
        translations = {}
        for lang_code, tab in self.language_tabs.items():
            translations[lang_code] = tab.get_data()

        self.data[self.current_project_id] = {
            "translations": translations
        }

        # Ask user about GitHub push
        push_to_github = messagebox.askyesno(
            "Save Options",
            "Do you want to push changes to GitHub?\nClick 'No' to save locally only."
        )

        # Save to file
        try:
            with open(self.json_file_path, 'w', encoding='utf-8') as f:
                json.dump(self.data, f, indent=2, ensure_ascii=False)

            if push_to_github and self.git_push_changes():
                if show_message:
                    messagebox.showinfo("Success", "Project saved and pushed to GitHub successfully")
            elif show_message:
                messagebox.showinfo("Success", "Project saved locally")
            
            return True
        except Exception as e:
            self._handle_error("Error saving data", e)
            return False

    def delete_project(self):
        """Delete the current project"""
        if not self.current_project_id:
            messagebox.showerror("Error", "No project selected")
            return

        if messagebox.askyesno("Confirm Delete", 
                             f"Are you sure you want to delete '{self.current_project_id}'?"):
            del self.data[self.current_project_id]
            self.current_project_id = None
            self.update_project_list()
            self.clear_forms()
            self.save_data()

    def rename_project(self):
        """Rename the current project"""
        if not self.current_project_id:
            messagebox.showerror("Error", "No project selected")
            return
            
        new_id = simpledialog.askstring("Rename Project", 
                                      "Enter new project ID:",
                                      initialvalue=self.current_project_id)
        
        if new_id and new_id != self.current_project_id:
            if new_id in self.data:
                messagebox.showerror("Error", "Project ID already exists")
                return
                
            self.data[new_id] = self.data.pop(self.current_project_id)
            self.current_project_id = new_id
            self.update_project_list()
            self.project_id_combo.set(new_id)
            self.save_data()

    def export_project(self):
        """Export the current project to a separate JSON file"""
        if not self.current_project_id:
            messagebox.showerror("Error", "No project selected")
            return

        try:
            filename = f"{self.current_project_id}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(self.data[self.current_project_id], f, indent=2, ensure_ascii=False)
            messagebox.showinfo("Success", f"Project exported to {filename}")
        except Exception as e:
            self._handle_error("Error exporting project", e)

    def import_project(self):
        """Import a project from a JSON file"""
        try:
            filename = filedialog.askopenfilename(filetypes=[("JSON files", "*.json")])
            if not filename:
                return

            with open(filename, 'r', encoding='utf-8') as f:
                project_data = json.load(f)

            project_id = os.path.splitext(os.path.basename(filename))[0]
            if project_id in self.data:
                project_id = f"{project_id}_{datetime.now().strftime('%Y%m%d_%H%M%S')}"

            self.data[project_id] = project_data
            self.update_project_list()
            self.project_id_combo.set(project_id)
            self.load_project()
            self.save_data()
            
            messagebox.showinfo("Success", f"Project imported as {project_id}")
        except Exception as e:
            self._handle_error("Error importing project", e)

    def clear_forms(self):
        """Clear all form fields"""
        empty_data = {"title": "", "metadata": {}, "sections": []}
        for tab in self.language_tabs.values():
            tab.set_data(empty_data)

    def _setup_autosave(self):
        """Set up automatic saving every 5 minutes"""
        self.root.after(300000, self._autosave)  # 300000 ms = 5 minutes

    def _autosave(self):
        """Perform automatic saving of the current project"""
        if self.current_project_id:
            self.save_project(show_message=False)
        self.root.after(300000, self._autosave)

    def load_data(self):
        """Load data from JSON file with error handling"""
        try:
            if os.path.exists(self.json_file_path):
                with open(self.json_file_path, 'r', encoding='utf-8') as f:
                    self.data = json.load(f)
            else:
                self.data = {}
        except Exception as e:
            self._handle_error("Error loading data", e)
            self.data = {}

    def save_data(self):
        """Save all data to JSON file and push to GitHub"""
        try:
            with open(self.json_file_path, 'w', encoding='utf-8') as f:
                json.dump(self.data, f, indent=2, ensure_ascii=False)
            
            # After successful save, push to GitHub
            if self.git_push_changes():
                return True
            return False
        except Exception as e:
            self._handle_error("Error saving data", e)
            return False

    def git_push_changes(self):
        """Push changes to GitHub repository"""
        if not self.repo:
            return False

        try:
            # Stage the changes
            self.repo.index.add(['src/data/blogPosts.json'])
            
            # Create commit
            commit_message = f"feat(blog): update blog posts - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
            self.repo.index.commit(commit_message)
            
            # Push changes
            origin = self.repo.remote('origin')
            origin.push()
            
            return True
        except GitCommandError as e:
            messagebox.showerror("Git Error", f"Failed to push changes: {str(e)}")
            return False
        except Exception as e:
            messagebox.showerror("Error", f"An unexpected error occurred: {str(e)}")
            return False

    def update_project_list(self):
        """Update the project dropdown list"""
        project_ids = sorted(self.data.keys())
        self.project_id_combo['values'] = project_ids
        if project_ids and not self.current_project_id:
            self.project_id_combo.set(project_ids[0])
            self.load_project()

    def new_project(self):
        """Create a new project"""
        project_id = self.new_project_id_var.get().strip()
        
        if not self._validate_project_id(project_id):
            return
            
        # Initialize with empty translations dictionary
        self.data[project_id] = {
            "translations": {}  # No default languages
        }
        
        self.update_project_list()
        self.project_id_combo.set(project_id)
        self.load_project()
        self.new_project_id_var.set("")

    def _validate_project_id(self, project_id: str) -> bool:
        """Validate the project ID"""
        if not project_id:
            messagebox.showerror("Error", "Please enter a Project ID")
            return False
        if project_id in self.data:
            messagebox.showerror("Error", "Project ID already exists")
            return False
        return True

    def _handle_error(self, message: str, error: Exception):
        """Handle and log errors"""
        error_message = f"{message}:\n{str(error)}\n\n{traceback.format_exc()}"
        messagebox.showerror("Error", error_message)
        
        # Log error to file
        with open('error_log.txt', 'a', encoding='utf-8') as f:
            f.write(f"\n{datetime.now()}: {error_message}\n")

if __name__ == "__main__":
    root = tk.Tk()
    app = BlogPostEditor(root)
    root.mainloop()