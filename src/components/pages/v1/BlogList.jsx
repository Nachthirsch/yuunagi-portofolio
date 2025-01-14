import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Book } from "lucide-react";
import { getAllBlogPosts } from "../../../utils/blogUtils";

const BlogList = () => {
  const blogPosts = getAllBlogPosts();

  return (
    <section className="min-h-screen bg-neutral-900 pt-24 pb-16 px-4 sm:px-8 md:px-16 font-Hanken">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
          <h1 className="text-3xl font-bold text-neutral-200 tracking-wider flex items-center gap-3">
            <Book className="text-neutral-400" size={32} />
            BLOG POSTS
          </h1>
          <motion.div className="h-1 bg-gradient-to-r from-neutral-400 to-transparent mt-4 rounded-full" initial={{ width: 0 }} animate={{ width: "8rem" }} transition={{ duration: 0.8, delay: 0.3 }} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="space-y-6">
          {blogPosts.map((post) => (
            <Link key={post.slug} to={`/writes/${post.slug}`} className="block">
              <div className="bg-neutral-800 p-6 rounded-lg hover:bg-neutral-700 transition-colors duration-300">
                <h2 className="text-xl font-semibold text-neutral-200">{post.title}</h2>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BlogList;
