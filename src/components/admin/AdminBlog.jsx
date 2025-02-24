import { useState, useEffect, useRef } from "react";
import { Tab } from "@headlessui/react";
import { getAllBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from "../../utils/blogUtils";
import { useNavigate } from "react-router-dom";
import LanguageTab from "./LanguageTab";
import PostPreview from "./PostPreview"; // Add this import
import { Plus, Save, Trash2, Eye, RefreshCw, LogOut, User, ChevronDown, Menu, X } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import TOCSidebar from "./sections/TOCSidebar";
import PostSidebar from "./PostSidebar";

const AdminBlog = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPost, setCurrentPost] = useState(null);
  const [selectedLanguages, setSelectedLanguages] = useState([]); // Changed: Initialize as empty array
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const tabPanelsRef = useRef(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    if (currentPost?.translations) {
      setSelectedLanguages(Object.keys(currentPost.translations));
    }
  }, [currentPost]);

  useEffect(() => {
    // Debug log to verify authentication
    console.log("Current user:", user);
  }, [user]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      console.log("Loading posts...");
      const fetchedPosts = await getAllBlogPosts();
      console.log("Fetched posts:", fetchedPosts);
      setPosts(fetchedPosts);
    } catch (err) {
      console.error("Error loading posts:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createNewPost = () => {
    const newPost = {
      slug: "",
      translations: {
        en: {
          title: "",
          metadata: {
            date: new Date().toISOString().split("T")[0],
            author: "",
            category: "",
            tags: [],
          },
          sections: [],
        },
      },
    };
    setCurrentPost(newPost);
  };

  const handleSave = async () => {
    try {
      if (!currentPost.slug) {
        alert("Please enter a slug for the post");
        return;
      }

      console.log("Saving post:", currentPost);

      const result = await (currentPost.id ? updateBlogPost(currentPost.slug, currentPost) : createBlogPost(currentPost));

      console.log("Save result:", result);
      await loadPosts();
      alert("Post saved successfully!");
    } catch (err) {
      console.error("Error saving post:", err);
      alert(`Error saving post: ${err.message}`);
    }
  };

  const handleDelete = async (slug) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deleteBlogPost(slug);
        await loadPosts();
        setCurrentPost(null);
      } catch (err) {
        alert(`Error deleting post: ${err.message}`);
      }
    }
  };

  const addLanguage = (lang) => {
    if (!currentPost.translations[lang]) {
      setCurrentPost({
        ...currentPost,
        translations: {
          ...currentPost.translations,
          [lang]: {
            title: "",
            metadata: {
              date: new Date().toISOString().split("T")[0],
              author: "",
              category: "",
              tags: [],
            },
            sections: [],
          },
        },
      });
      setSelectedLanguages([...selectedLanguages, lang]);
    }
  };

  const handleSelectPost = (post) => {
    console.log("Selected post:", post);
    setCurrentPost(post);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/admin/login");
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  const scrollToSection = (index) => {
    const element = document.getElementById(`section-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });

      // Add highlight effect
      element.style.backgroundColor = "rgba(59, 130, 246, 0.1)";
      setTimeout(() => {
        element.style.backgroundColor = "";
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-base-300 text-white text-lg">
      {" "}
      {/* Tambahkan text-white dan text-lg */}
      {/* Mobile Header */}
      <div className="lg:hidden navbar bg-base-200 fixed top-0 left-0 right-0 z-50">
        <div className="flex-none">
          <button onClick={() => setSidebarOpen(true)} className="btn btn-square btn-ghost">
            <Menu size={24} />
          </button>
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-bold">
            {" "}
            {/* Ubah text-lg menjadi text-xl */}
            Blog Admin
          </h1>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <User size={24} />
            </label>
            {showUserMenu && (
              <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-200 rounded-box w-52 mt-4">
                <li className="menu-title">{user?.email}</li>
                <li>
                  <button onClick={handleSignOut} className="text-error">
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      {/* Desktop Header */}
      <div className="hidden lg:block navbar bg-base-200 shadow-md">
        <div className="flex justify-between w-full items-center px-6">
          <h1 className="text-2xl font-bold tracking-tight">Blog Admin</h1>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost hover:bg-base-300 gap-2 px-4" onClick={() => setShowUserMenu(!showUserMenu)}>
              <User size={18} />
              <span className="text-sm font-medium">{user?.email}</span>
              <ChevronDown size={16} className="opacity-70" />
            </label>
            {showUserMenu && (
              <ul tabIndex={0} className="menu dropdown-content z-[1] p-3 shadow-lg bg-base-200 rounded-box w-64 mt-2">
                <li className="menu-title">
                  Signed in as:
                  <span>{user?.email}</span>
                </li>
                <div className="divider my-1"></div>
                <li>
                  <button onClick={handleSignOut} className="text-error hover:bg-error/10 gap-2">
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Sidebar */}
      <div className="lg:hidden drawer">
        <input id="mobile-drawer" type="checkbox" className="drawer-toggle" checked={isSidebarOpen} onChange={() => setSidebarOpen(!isSidebarOpen)} />
        <div className="drawer-side z-50">
          <label htmlFor="mobile-drawer" className="drawer-overlay"></label>
          <div className="menu p-4 w-80 h-full bg-base-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Posts ({posts.length})</h2>
              <button onClick={() => setSidebarOpen(false)} className="btn btn-ghost btn-square">
                <X size={20} />
              </button>
            </div>
            <div className="overflow-y-auto">
              {posts.map((post) => (
                <div
                  key={post.slug}
                  onClick={() => {
                    handleSelectPost(post);
                    setSidebarOpen(false);
                  }}
                  className={`card p-3 mb-2 cursor-pointer ${currentPost?.slug === post.slug ? "bg-primary text-primary-content" : "hover:bg-base-100"}`}
                >
                  <div className="font-medium">{post.title || "Untitled"}</div>
                  <div className="text-sm opacity-70">{post.slug}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="container mx-auto p-4 lg:p-6 mt-16 lg:mt-6">
        {/* Action Buttons for Desktop */}
        <div className="hidden lg:flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Blog Management</h2>
          <div className="flex gap-2">
            {currentPost && (
              <button onClick={() => setShowPreview(true)} className="btn btn-primary">
                <Eye size={20} />
                Preview Post
              </button>
            )}
            <button onClick={createNewPost} className="btn btn-secondary">
              <Plus size={20} /> New Post
            </button>
            <button onClick={loadPosts} className="btn btn-ghost">
              <RefreshCw size={20} />
            </button>
          </div>
        </div>

        {/* Main Layout Grid */}
        <div className="flex gap-6">
          {/* New PostSidebar */}
          <div className="hidden lg:block">
            <PostSidebar posts={posts} currentPost={currentPost} onSelectPost={handleSelectPost} />
          </div>

          {/* Editor Area */}
          <div className="flex-1">
            <div className="card bg-base-200">
              {currentPost ? (
                <div className="card-body p-6">
                  {/* Slug Input */}
                  <input type="text" value={currentPost.slug} onChange={(e) => setCurrentPost({ ...currentPost, slug: e.target.value })} placeholder="Post Slug" className="input input-bordered w-full mb-4" />

                  {/* Language Tabs */}
                  <Tab.Group onChange={(index) => setActiveTab(index)}>
                    <div className="flex items-center gap-4 mb-6">
                      <Tab.List className="flex gap-2 p-1 bg-base-300 rounded-xl">
                        {selectedLanguages.map((lang) => (
                          <Tab key={lang} className={({ selected }) => `px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ${selected ? "bg-primary text-primary-content shadow-lg transform scale-105" : "hover:bg-base-100 text-base-content/70 hover:text-base-content"}`}>
                            {lang.toUpperCase()}
                          </Tab>
                        ))}
                      </Tab.List>

                      <div className="relative">
                        <select onChange={(e) => e.target.value && addLanguage(e.target.value)} className="select select-bordered select-primary w-32 pl-4 pr-8" value="">
                          <option value="" disabled>
                            + Add Lang
                          </option>
                          {["en", "id", "jp"]
                            .filter((lang) => !selectedLanguages.includes(lang))
                            .map((lang) => (
                              <option key={lang} value={lang} className="py-2">
                                {lang.toUpperCase()}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>

                    <Tab.Panels ref={tabPanelsRef} className="min-h-[calc(100vh-400px)] bg-base-100 rounded-lg p-4 shadow-inner">
                      {selectedLanguages.map((lang) => (
                        <Tab.Panel key={lang} className="focus:outline-none">
                          {currentPost.translations[lang] ? (
                            <LanguageTab
                              data={currentPost.translations[lang]}
                              onChange={(newData) => {
                                setCurrentPost({
                                  ...currentPost,
                                  translations: {
                                    ...currentPost.translations,
                                    [lang]: newData,
                                  },
                                });
                              }}
                            />
                          ) : (
                            <div className="p-6 text-center text-base-content/70">Translation data not found for {lang.toUpperCase()}</div>
                          )}
                        </Tab.Panel>
                      ))}
                    </Tab.Panels>
                  </Tab.Group>

                  {/* TOC Sidebar */}
                  {currentPost && selectedLanguages.length > 0 && (
                    <div className="fixed top-24 right-6 w-64 hidden xl:block">
                      <TOCSidebar sections={currentPost.translations[selectedLanguages[activeTab]]?.sections || []} onSectionClick={scrollToSection} />
                    </div>
                  )}

                  {/* Desktop Action Buttons */}
                  <div className="hidden lg:flex fixed bottom-8 left-8 flex gap-3">
                    <button onClick={handleSave} className="btn btn-circle btn-success btn-sm shadow-lg" title="Save Post">
                      <Save size={24} />
                    </button>
                    <button onClick={() => handleDelete(currentPost.slug)} className="btn btn-circle btn-error btn-sm shadow-lg" title="Delete Post">
                      <Trash2 size={24} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="card-body text-center text-opacity-70">Select a post to edit or create a new one</div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="btm-nav lg:hidden">
          {currentPost && (
            <button onClick={() => setShowPreview(true)} className="text-primary">
              <Eye size={20} />
              <span className="btm-nav-label">Preview</span>
            </button>
          )}
          <button onClick={createNewPost} className="text-secondary">
            <Plus size={20} />
            <span className="btm-nav-label">New</span>
          </button>
          <button onClick={handleSave} disabled={!currentPost} className="text-success">
            <Save size={20} />
            <span className="btm-nav-label">Save</span>
          </button>
          {currentPost && (
            <button onClick={() => handleDelete(currentPost.slug)} className="text-error">
              <Trash2 size={20} />
              <span className="btm-nav-label">Delete</span>
            </button>
          )}
        </div>

        {/* Preview Modal */}
        {showPreview && currentPost && (
          <div className="modal modal-open">
            <div className="modal-box w-11/12 max-w-5xl h-[90vh] overflow-y-auto">
              <PostPreview post={currentPost} onClose={() => setShowPreview(false)} />
              <div className="modal-action">
                <button onClick={() => setShowPreview(false)} className="btn">
                  Close
                </button>
              </div>
            </div>
            <div className="modal-backdrop" onClick={() => setShowPreview(false)}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBlog;
