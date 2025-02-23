import { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { getAllBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from "../../utils/blogUtils";
import LanguageTab from "./LanguageTab";
import { Plus, Save, Trash2, Eye, RefreshCw, LogOut } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const AdminBlog = () => {
  const { signOut } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPost, setCurrentPost] = useState(null);
  const [selectedLanguages, setSelectedLanguages] = useState([]); // Changed: Initialize as empty array

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    if (currentPost?.translations) {
      setSelectedLanguages(Object.keys(currentPost.translations));
    }
  }, [currentPost]);

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
      // Will be redirected to login by PrivateRoute
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Blog Management</h1>
          <div className="flex gap-2">
            <button onClick={createNewPost} className="flex items-center gap-1 px-3 py-1 bg-blue-500 rounded hover:bg-blue-600">
              <Plus size={20} /> New Post
            </button>
            <button onClick={loadPosts} className="flex items-center gap-1 px-3 py-1 bg-neutral-700 rounded hover:bg-neutral-600">
              <RefreshCw size={20} />
            </button>
            <button onClick={handleSignOut} className="flex items-center gap-1 px-3 py-1 bg-neutral-700 rounded hover:bg-neutral-600">
              <LogOut size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {/* Posts List */}
          <div className="col-span-1 bg-neutral-800 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Posts ({posts.length})</h2>
            <div className="space-y-2">
              {posts.length === 0 ? (
                <div className="text-neutral-400">No posts found</div>
              ) : (
                posts.map((post) => (
                  <div key={post.slug} className={`p-2 rounded cursor-pointer ${currentPost?.slug === post.slug ? "bg-blue-500" : "hover:bg-neutral-700"}`} onClick={() => handleSelectPost(post)}>
                    <div className="font-medium">{post.title}</div>
                    <div className="text-sm text-neutral-400">{post.slug}</div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Editor */}
          {currentPost && currentPost.translations && (
            <div className="col-span-3 bg-neutral-800 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <input type="text" value={currentPost.slug} onChange={(e) => setCurrentPost({ ...currentPost, slug: e.target.value })} placeholder="Post Slug" className="bg-neutral-700 px-2 py-1 rounded" />
                <div className="flex gap-2">
                  <button onClick={handleSave} className="flex items-center gap-1 px-3 py-1 bg-green-500 rounded hover:bg-green-600">
                    <Save size={20} /> Save
                  </button>
                  <button onClick={() => handleDelete(currentPost.slug)} className="flex items-center gap-1 px-3 py-1 bg-red-500 rounded hover:bg-red-600">
                    <Trash2 size={20} /> Delete
                  </button>
                </div>
              </div>

              <Tab.Group>
                <Tab.List className="flex gap-2 mb-4">
                  {selectedLanguages.map((lang) => (
                    <Tab key={lang} className={({ selected }) => `px-4 py-2 rounded-lg ${selected ? "bg-blue-500" : "bg-neutral-700"}`}>
                      {lang.toUpperCase()}
                    </Tab>
                  ))}
                  <select onChange={(e) => e.target.value && addLanguage(e.target.value)} className="bg-neutral-700 rounded px-2" value="">
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
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBlog;
