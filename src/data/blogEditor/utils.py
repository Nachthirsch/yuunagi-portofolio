import os
import json
import traceback
from typing import Dict, Any
from tkinter import messagebox

def load_json_file(file_path: str) -> Dict[str, Any]:
    """Load data from a JSON file with error handling"""
    try:
        if os.path.exists(file_path):
            with open(file_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        return {}
    except Exception as e:
        handle_error(f"Error loading data from {file_path}", e)
        return {}

def save_json_file(file_path: str, data: Dict[str, Any]) -> bool:
    """Save data to a JSON file with error handling"""
    try:
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
        return True
    except Exception as e:
        handle_error(f"Error saving data to {file_path}", e)
        return False

def validate_project_id(project_id: str) -> bool:
    """Validate the project ID format"""
    return bool(project_id and project_id.strip() and all(c.isalnum() or c in '-_' for c in project_id))

def handle_error(message: str, error: Exception) -> None:
    """Handle and log errors"""
    error_message = f"{message}\n\nError details:\n{str(error)}\n\nTraceback:\n{traceback.format_exc()}"
    print(error_message)  # Log to console
    messagebox.showerror("Error", error_message)
