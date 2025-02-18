import tkinter as tk
from tkinter import ttk, messagebox, filedialog
import tkinterweb
import os
from typing import Dict
from datetime import datetime
from git import Repo
from git.exc import GitCommandError

from ui import ScrollableFrame, LanguageTab
from utils import load_json_file, save_json_file, validate_project_id, handle_error

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
        self.file_path = os.path.join(os.path.dirname(__file__), "blog_data.json")

    def _configure_styles(self):
        style = ttk.Style()
        style.configure("TButton", padding=5)
        style.configure("TFrame", padding=5)
        style.configure("TLabelframe", padding=10)

    def _create_preview_window(self):
        self.preview_window = None

    def show_preview(self):
        if self.preview_window and self.preview_window.winfo_exists():
            self.preview_window.focus_force()
            return

        self.preview_window = tk.Toplevel(self.root)
        self.preview_window.title("Preview")
        self.preview_window.geometry("800x600")

        frame = ttk.Frame(self.preview_window)
        frame.pack(fill=tk.BOTH, expand=True)

        html_frame = tkinterweb.HtmlFrame(frame)
        html_frame.pack(fill=tk.BOTH, expand=True)

        if self.current_project_id and self.current_project_id in self.data:
            html_content = self._generate_preview_html(self.data[self.current_project_id])
            html_frame.load_html(html_content)

    def _generate_preview_html(self, data):
        html = ["<!DOCTYPE html><html><head><meta charset='utf-8'></head><body>"]
        
        for lang, content in data.items():
            html.append(f"<h1>Language: {lang}</h1>")
            metadata = content.get("metadata", {})
            html.append(f"<h2>{metadata.get('title', '')}</h2>")
            html.append(f"<p>{metadata.get('description', '')}</p>")
            
            for section in content.get("sections", []):
                if section["type"] == "image":
                    html.append(f"<img src='{section.get('image_path', '')}' alt='{section.get('alt_text', '')}'>")
                else:
                    if section.get("title"):
                        html.append(f"<h3>{section['title']}</h3>")
                    html.append(f"<div>{section.get('content', '')}</div>")
        
        html.append("</body></html>")
        return "\n".join(html)

    def _create_project_management(self):
        """Create the project management section of the UI with minimizable feature"""
        self.project_frame = ttk.LabelFrame(self.main_frame, text="Project Management", padding="10")
        self.project_frame.pack(fill=tk.X, padx=10, pady=5)
        
        # Add toggle button
        toggle_btn = ttk.Button(self.project_frame, text="▼", width=3,
                              command=self._toggle_project_frame)
        toggle_btn.pack(anchor=tk.E)
        
        # Create content frame
        self.project_content_frame = ttk.Frame(self.project_frame)
        self.project_content_frame.pack(fill=tk.X)
        
        # Create project selection
        selection_frame = ttk.Frame(self.project_content_frame)
        selection_frame.pack(fill=tk.X, pady=5)
        
        ttk.Label(selection_frame, text="Project:").pack(side=tk.LEFT)
        self.project_var = tk.StringVar()
        self.project_combo = ttk.Combobox(selection_frame, textvariable=self.project_var)
        self.project_combo.pack(side=tk.LEFT, padx=5, fill=tk.X, expand=True)
        self.project_combo.bind('<<ComboboxSelected>>', self.load_project)
        
        # Create project management buttons
        self._create_project_buttons(self.project_content_frame)

    def _toggle_project_frame(self):
        """Toggle the visibility of project management frame"""
        if self.project_frame_expanded:
            self.project_content_frame.pack_forget()
        else:
            self.project_content_frame.pack(fill=tk.X)
        self.project_frame_expanded = not self.project_frame_expanded

    def _create_project_buttons(self, parent):
        """Create buttons for project management"""
        btn_frame = ttk.Frame(parent)
        btn_frame.pack(fill=tk.X, pady=5)
        
        ttk.Button(btn_frame, text="New Project", 
                  command=self.new_project).pack(side=tk.LEFT, padx=2)
        ttk.Button(btn_frame, text="Save Project", 
                  command=lambda: self.save_project(True)).pack(side=tk.LEFT, padx=2)
        ttk.Button(btn_frame, text="Delete Project", 
                  command=self.delete_project).pack(side=tk.LEFT, padx=2)
        ttk.Button(btn_frame, text="Rename Project", 
                  command=self.rename_project).pack(side=tk.LEFT, padx=2)
        ttk.Button(btn_frame, text="Export Project", 
                  command=self.export_project).pack(side=tk.LEFT, padx=2)
        ttk.Button(btn_frame, text="Import Project", 
                  command=self.import_project).pack(side=tk.LEFT, padx=2)
        ttk.Button(btn_frame, text="Preview", 
                  command=self.show_preview).pack(side=tk.LEFT, padx=2)

    def _create_language_management(self):
        """Create the language management section"""
        lang_frame = ttk.LabelFrame(self.main_frame, text="Language Management", padding="10")
        lang_frame.pack(fill=tk.X, padx=10, pady=5)
        
        # Language input
        input_frame = ttk.Frame(lang_frame)
        input_frame.pack(fill=tk.X, pady=5)
        
        ttk.Label(input_frame, text="Language Code:").pack(side=tk.LEFT)
        self.lang_code_var = tk.StringVar()
        ttk.Entry(input_frame, textvariable=self.lang_code_var, width=10).pack(side=tk.LEFT, padx=5)
        
        ttk.Label(input_frame, text="Language Name:").pack(side=tk.LEFT, padx=(10, 0))
        self.lang_name_var = tk.StringVar()
        ttk.Entry(input_frame, textvariable=self.lang_name_var, width=20).pack(side=tk.LEFT, padx=5)
        
        # Buttons
        btn_frame = ttk.Frame(lang_frame)
        btn_frame.pack(fill=tk.X, pady=5)
        
        ttk.Button(btn_frame, text="Add Language Tab", 
                  command=lambda: self.add_language_tab(
                      self.lang_code_var.get(), 
                      self.lang_name_var.get()
                  )).pack(side=tk.LEFT, padx=2)
        
        ttk.Button(btn_frame, text="Delete Language Tab", 
                  command=self.delete_language_tab).pack(side=tk.LEFT, padx=2)

    def _create_language_tabs(self):
        """Create the language tabs notebook"""
        self.notebook = ttk.Notebook(self.main_frame)
        self.notebook.pack(fill=tk.BOTH, expand=True, padx=10, pady=5)

    def add_language_tab(self, lang_code=None, lang_name=None):
        """Add a new language tab"""
        if not lang_code or not lang_name:
            return
            
        tab_name = f"{lang_code} - {lang_name}"
        if tab_name in self.language_tabs:
            messagebox.showwarning("Warning", f"Tab for {tab_name} already exists!")
            return
            
        tab = LanguageTab(self.notebook, tab_name)
        self.language_tabs[tab_name] = tab

    def delete_language_tab(self):
        """Delete the currently selected language tab"""
        current = self.notebook.select()
        if not current:
            return
            
        tab_name = self.notebook.tab(current, "text")
        if tab_name in self.language_tabs:
            del self.language_tabs[tab_name]
            self.notebook.forget(current)

    def load_project(self, event=None):
        """Load the selected project"""
        project_id = self.project_var.get()
        if not project_id or project_id not in self.data:
            return
            
        self.current_project_id = project_id
        project_data = self.data[project_id]
        
        # Clear existing tabs
        for tab_name in list(self.language_tabs.keys()):
            self.notebook.forget(self.notebook.tabs()[0])
        self.language_tabs.clear()
        
        # Create tabs and load data
        for lang, content in project_data.items():
            self.add_language_tab(*lang.split(" - ", 1))
            if lang in self.language_tabs:
                self.language_tabs[lang].set_data(content)

    def save_project(self, show_message=True):
        """Save the current project"""
        if not self.current_project_id:
            return
            
        # Collect data from all tabs
        project_data = {}
        for tab_name, tab in self.language_tabs.items():
            project_data[tab_name] = tab.get_data()
            
        self.data[self.current_project_id] = project_data
        
        # Save to file
        if save_json_file(self.file_path, self.data):
            if show_message:
                messagebox.showinfo("Success", "Project saved successfully!")
            self.git_push_changes()

    def delete_project(self):
        """Delete the current project"""
        if not self.current_project_id:
            return
            
        if messagebox.askyesno("Confirm Delete", 
                              f"Are you sure you want to delete project '{self.current_project_id}'?"):
            del self.data[self.current_project_id]
            save_json_file(self.file_path, self.data)
            self.current_project_id = None
            self.clear_forms()
            self.update_project_list()
            self.git_push_changes()

    def rename_project(self):
        """Rename the current project"""
        if not self.current_project_id:
            return
            
        new_id = messagebox.askstring("Rename Project", 
                                    "Enter new project ID:",
                                    initialvalue=self.current_project_id)
                                    
        if new_id and new_id != self.current_project_id:
            if not validate_project_id(new_id):
                messagebox.showerror("Error", "Invalid project ID format!")
                return
                
            if new_id in self.data:
                messagebox.showerror("Error", "Project ID already exists!")
                return
                
            self.data[new_id] = self.data.pop(self.current_project_id)
            self.current_project_id = new_id
            save_json_file(self.file_path, self.data)
            self.update_project_list()
            self.project_var.set(new_id)
            self.git_push_changes()

    def export_project(self):
        """Export the current project to a separate JSON file"""
        if not self.current_project_id:
            return
            
        file_path = filedialog.asksaveasfilename(
            defaultextension=".json",
            filetypes=[("JSON files", "*.json")],
            initialfile=f"{self.current_project_id}.json"
        )
        
        if file_path:
            project_data = {self.current_project_id: self.data[self.current_project_id]}
            save_json_file(file_path, project_data)

    def import_project(self):
        """Import a project from a JSON file"""
        file_path = filedialog.askopenfilename(
            filetypes=[("JSON files", "*.json")]
        )
        
        if file_path:
            imported_data = load_json_file(file_path)
            if not imported_data:
                return
                
            project_id = list(imported_data.keys())[0]
            if project_id in self.data:
                if not messagebox.askyesno("Confirm Override", 
                                         f"Project '{project_id}' already exists. Override?"):
                    return
                    
            self.data[project_id] = imported_data[project_id]
            save_json_file(self.file_path, self.data)
            self.update_project_list()
            self.project_var.set(project_id)
            self.load_project()
            self.git_push_changes()

    def clear_forms(self):
        """Clear all form fields"""
        for tab in self.language_tabs.values():
            tab.frame.destroy()
        self.language_tabs.clear()
        self.notebook.destroy()
        self._create_language_tabs()

    def _setup_autosave(self):
        """Set up automatic saving every 5 minutes"""
        self._autosave()

    def _autosave(self):
        """Perform automatic saving of the current project"""
        self.save_project(show_message=False)
        self.root.after(300000, self._autosave)  # 5 minutes = 300000 ms

    def load_data(self):
        """Load data from JSON file"""
        self.data = load_json_file(self.file_path)

    def git_push_changes(self):
        """Push changes to GitHub repository"""
        if not self.repo:
            return
            
        try:
            # Stage changes
            self.repo.index.add([self.file_path])
            
            # Commit changes
            commit_message = f"Update blog data - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
            self.repo.index.commit(commit_message)
            
            # Push changes
            origin = self.repo.remote(name='origin')
            origin.push()
            
        except GitCommandError as e:
            handle_error("Failed to push changes to GitHub", e)

    def update_project_list(self):
        """Update the project dropdown list"""
        project_list = sorted(self.data.keys())
        self.project_combo['values'] = project_list
        
        if self.current_project_id in project_list:
            self.project_var.set(self.current_project_id)
        elif project_list:
            self.project_var.set(project_list[0])
        else:
            self.project_var.set('')

    def new_project(self):
        """Create a new project"""
        project_id = messagebox.askstring("New Project", "Enter project ID:")
        if not project_id:
            return
            
        if not validate_project_id(project_id):
            messagebox.showerror("Error", "Invalid project ID format!")
            return
            
        if project_id in self.data:
            messagebox.showerror("Error", "Project ID already exists!")
            return
            
        self.data[project_id] = {}
        self.current_project_id = project_id
        self.clear_forms()
        self.update_project_list()
        save_json_file(self.file_path, self.data)
        self.git_push_changes()

if __name__ == "__main__":
    root = tk.Tk()
    app = BlogPostEditor(root)
    root.mainloop()
