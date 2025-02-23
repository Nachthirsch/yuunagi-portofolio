import { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { getAllBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from "../../utils/blogUtils";
import { useNavigate } from "react-router-dom";
import LanguageTab from "./LanguageTab";
import { Plus, Save, Trash2, Eye, RefreshCw, LogOut, User, ChevronDown, Menu, X } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

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
  const [showMobileActions, setShowMobileActions] = useState(false);

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

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-neutral-800 border-b border-neutral-700 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-neutral-700 rounded-lg">
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-bold">Blog Admin</h1>
          <div className="relative">
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)} 
              className="p-2 hover:bg-neutral-700 rounded-lg"
            >
              <User size={24} />
            </button>
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-neutral-800 rounded-lg shadow-lg border border-neutral-700 py-1 z-50">
                <div className="px-4 py-2 text-sm text-neutral-400 border-b border-neutral-700">
                  {user?.email}
                </div>
                <button 
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-neutral-700 flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block bg-neutral-800 border-b border-neutral-700">
        <div className="container mx-auto px-3 py-2 sm:px-4 sm:py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 sm:gap-3">
              <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="lg:hidden p-1.5 sm:p-2 hover:bg-neutral-700 rounded-md active:bg-neutral-600">
                <Menu size={20} />
              </button>
              <h1 className="text-lg sm:text-xl font-bold">Blog Admin</h1>
            </div>

            {/* User Menu - More compact on mobile */}
            <div className="relative">
              <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 rounded hover:bg-neutral-700">
                <User size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="hidden sm:inline">{user?.email}</span>
                <ChevronDown size={14} className="sm:w-4 sm:h-4" />
              </button>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-neutral-800 rounded-lg shadow-lg border border-neutral-700 py-1">
                  <div className="px-4 py-2 text-sm text-neutral-400 border-b border-neutral-700">
                    Signed in as:
                    <br />
                    <span className="font-medium text-neutral-200">{user?.email}</span>
                  </div>
                  <button onClick={handleSignOut} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-neutral-700 flex items-center gap-2">
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          <div className={`absolute top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-neutral-800 transform transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <div className="flex items-center justify-between p-4 border-b border-neutral-700">
              <h2 className="text-lg font-bold">Posts ({posts.length})</h2>
              <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-neutral-700 rounded-lg">
                <X size={20} />
              </button>
            </div>
            <div className="overflow-y-auto h-[calc(100%-64px)] p-4">
              {posts.map((post) => (
                <div
                  key={post.slug}
                  onClick={() => {
                    handleSelectPost(post);
                    setSidebarOpen(false);
                  }}
                  className={`p-3 rounded-lg mb-2 ${currentPost?.slug === post.slug ? "bg-blue-500" : "hover:bg-neutral-700"}`}
                >
                  <div className="font-medium">{post.title || "Untitled"}</div>
                  <div className="text-sm text-neutral-400">{post.slug}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:container mx-auto p-0 lg:p-6 mt-[60px] lg:mt-0">
        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Blog Management</h2>
            <div className="flex gap-2">
              <button onClick={createNewPost} className="flex items-center gap-1 px-3 py-2 bg-blue-500 rounded hover:bg-blue-600">
                <Plus size={20} /> New Post
              </button>
              <button onClick={loadPosts} className="p-2 bg-neutral-700 rounded hover:bg-neutral-600">
                <RefreshCw size={20} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {/* Desktop Sidebar */}
            <div className="col-span-1 bg-neutral-800 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Posts ({posts.length})</h2>
              <div className="space-y-2">
                {posts.length === 0 ? (
                  <div className="text-neutral-400">No posts found</div>
                ) : (
                  posts.map((post) => (
                    <div key={post.slug} onClick={() => handleSelectPost(post)} className={`p-3 rounded-lg cursor-pointer ${currentPost?.slug === post.slug ? "bg-blue-500" : "hover:bg-neutral-700"}`}>
                      <div className="font-medium">{post.title || "Untitled"}</div>
                      <div className="text-sm text-neutral-400">{post.slug}</div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Desktop Editor */}
            <div className="col-span-3 bg-neutral-800 rounded-lg">
              {currentPost ? (
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <input type="text" value={currentPost.slug} onChange={(e) => setCurrentPost({ ...currentPost, slug: e.target.value })} placeholder="Post Slug" className="flex-1 bg-neutral-700 px-3 py-2 rounded-lg mr-4" />
                    <div className="flex gap-2">
                      <button onClick={handleSave} className="flex items-center gap-1 px-4 py-2 bg-green-500 rounded hover:bg-green-600">
                        <Save size={20} /> Save
                      </button>
                      <button onClick={() => handleDelete(currentPost.slug)} className="flex items-center gap-1 px-4 py-2 bg-red-500 rounded hover:bg-red-600">
                        <Trash2 size={20} /> Delete
                      </button>
                    </div>
                  </div>

                  <Tab.Group>
                    <Tab.List className="flex gap-2 mb-4 border-b border-neutral-700 pb-2">
                      {selectedLanguages.map((lang) => (
                        <Tab key={lang} className={({ selected }) => `px-4 py-2 rounded-lg ${selected ? "bg-blue-500" : "bg-neutral-700"}`}>
                          {lang.toUpperCase()}
                        </Tab>
                      ))}
                      <select onChange={(e) => e.target.value && addLanguage(e.target.value)} className="bg-neutral-700 rounded-lg px-3 py-2" value="">
                        <option value="">Add Language</option>
                        {["en", "id", "jp"]
                          .filter((lang) => !selectedLanguages.includes(lang))
                          .map((lang) => (
                            <option key={lang} value={lang}>
                              {lang.toUpperCase()}
                            </option>
                          ))}
                      </select>
                    </Tab.List>

                    <Tab.Panels>
                      {selectedLanguages.map((lang) => (
                        <Tab.Panel key={lang}>
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
                            <div className="p-4 text-neutral-400">Translation data not found for {lang.toUpperCase()}</div>
                          )}
                        </Tab.Panel>
                      ))}
                    </Tab.Panels>
                  </Tab.Group>
                </div>
              ) : (
                <div className="p-8 text-center text-neutral-400">Select a post to edit or create a new one</div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          {currentPost ? (
            <div className="h-[calc(100vh-120px)] overflow-y-auto pb-20">
              <div className="p-4 bg-neutral-800 sticky top-0 z-10 border-b border-neutral-700">
                <input type="text" value={currentPost.slug} onChange={(e) => setCurrentPost({ ...currentPost, slug: e.target.value })} placeholder="Post Slug" className="w-full bg-neutral-700 px-3 py-2 rounded-lg mb-2" />
                <Tab.Group>
                  <Tab.List className="flex gap-2 overflow-x-auto pb-2">
                    {selectedLanguages.map((lang) => (
                      <Tab key={lang} className={({ selected }) => `px-3 py-1.5 rounded-lg whitespace-nowrap ${selected ? "bg-blue-500" : "bg-neutral-700"}`}>
                        {lang.toUpperCase()}
                      </Tab>
                    ))}
                    <select onChange={(e) => e.target.value && addLanguage(e.target.value)} className="bg-neutral-700 rounded-lg px-2" value="">
                      <option value="">+ Lang</option>
                      {["en", "id", "jp"]
                        .filter((lang) => !selectedLanguages.includes(lang))
                        .map((lang) => (
                          <option key={lang} value={lang}>
                            {lang.toUpperCase()}
                          </option>
                        ))}
                    </select>
                  </Tab.List>
                  <Tab.Panels>
                    {selectedLanguages.map((lang) => (
                      <Tab.Panel key={lang}>
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
                          <div className="p-4 text-neutral-400">Translation data not found for {lang.toUpperCase()}</div>
                        )}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </div>
          ) : (
            <div className="p-4 text-center text-neutral-400">Select a post to edit or create a new one</div>
          )}
        </div>

        {/* Mobile Bottom Action Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-neutral-800 border-t border-neutral-700 p-3 flex gap-2">
          <button onClick={createNewPost} className="flex-1 bg-blue-500 hover:bg-blue-600 rounded-lg py-2 flex items-center justify-center gap-2">
            <Plus size={20} /> New Post
          </button>
          <button onClick={handleSave} disabled={!currentPost} className="flex-1 bg-green-500 hover:bg-green-600 disabled:opacity-50 rounded-lg py-2 flex items-center justify-center gap-2">
            <Save size={20} /> Save
          </button>
          {currentPost && (
            <button onClick={() => handleDelete(currentPost.slug)} className="w-12 bg-red-500 hover:bg-red-600 rounded-lg py-2 flex items-center justify-center">
              <Trash2 size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBlog;
