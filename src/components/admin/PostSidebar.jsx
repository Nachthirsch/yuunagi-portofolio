import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PostSidebar = ({ posts, currentPost, onSelectPost }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`transition-all duration-300 ease-in-out ${isCollapsed ? "w-16" : "w-80"}`} role="complementary" aria-label="Posts navigation">
      <div className="card bg-base-200 sticky top-6 h-[calc(100vh-100px)]">
        <div className="card-body p-4 relative">
          {/* Collapse Toggle Button */}
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="btn btn-circle btn-ghost btn-sm absolute -right-3 top-6 bg-base-200 shadow-lg" aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"} title={isCollapsed ? "Expand" : "Collapse"}>
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>

          {/* Header */}
          <div className={`flex items-center ${isCollapsed ? "justify-center" : "justify-between"} mb-4`}>
            {!isCollapsed && <h2 className="card-title text-lg font-bold">Posts</h2>}
            <div className="badge badge-primary font-medium" role="status">
              {posts.length}
            </div>
          </div>

          {/* Posts List */}
          <div className="space-y-2 overflow-y-auto" role="list" aria-label="Blog posts">
            {posts.length === 0
              ? !isCollapsed && <div className="text-base-content/70 text-center py-4">No posts found</div>
              : posts.map((post) => (
                  <div
                    key={post.slug}
                    onClick={() => onSelectPost(post)}
                    className={`card bg-base-100 cursor-pointer transition-all hover:shadow-md
                    ${currentPost?.slug === post.slug ? "bg-primary text-primary-content shadow-lg" : "hover:bg-base-300"}
                    ${isCollapsed ? "p-2" : "p-3"}`}
                    role="button"
                    aria-selected={currentPost?.slug === post.slug}
                    aria-label={isCollapsed ? post.title?.[0]?.toUpperCase() || "#" : post.title || "Untitled"}
                    tabIndex={0}
                  >
                    {isCollapsed ? (
                      <div className="w-8 h-8 flex items-center justify-center font-bold text-lg">{post.title?.[0]?.toUpperCase() || "#"}</div>
                    ) : (
                      <>
                        <div className="font-medium truncate text-base">{post.title || "Untitled"}</div>
                        <div className="text-sm  truncate">{post.slug}</div>
                      </>
                    )}
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSidebar;
