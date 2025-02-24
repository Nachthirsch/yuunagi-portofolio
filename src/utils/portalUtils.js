import { createPortal } from "react-dom";

export const createPortalRoot = (id) => {
  const root = document.createElement("div");
  root.setAttribute("id", id);
  document.body.appendChild(root);
  return root;
};

export const removePortalRoot = (id) => {
  const root = document.getElementById(id);
  if (root) {
    document.body.removeChild(root);
  }
};

export const Portal = ({ children, containerId }) => {
  const container = document.getElementById(containerId);
  return container ? createPortal(children, container) : null;
};
