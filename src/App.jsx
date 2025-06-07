import "tailwindcss/tailwind.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/auth/PrivateRoute";
import Login from "./components/admin/Login";

import Nav from "./components/nav";
import ChatBot from "./components/ChatBot";
import Portfolio from "./components/pages/v1/portofolio";
import BlogList from "./components/pages/v1/BlogList";
import WritesPage from "./components/pages/v1/writes";
import AdminBlog from "./components/admin/AdminBlog";
import ProjectDetail from "./components/portofolio/ProjectDetail";

function App() {
  return (
    <HelmetProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AuthProvider>
          <div className="select-none scrollbar-hide h-screen overflow-auto">
            <Nav />
            <Routes>
              <Route path="/" element={<Portfolio />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
              <Route path="/writes" element={<BlogList />} />
              <Route path="/writes/:slug" element={<WritesPage />} />
              <Route path="/admin/login" element={<Login />} />
              <Route
                path="/admin/blog"
                element={
                  <PrivateRoute>
                    <AdminBlog />
                  </PrivateRoute>
                }
              />
            </Routes>
            <ChatBot />
          </div>
        </AuthProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;
