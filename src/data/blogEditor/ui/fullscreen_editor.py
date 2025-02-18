import tkinter as tk
from tkinter import ttk, simpledialog

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
