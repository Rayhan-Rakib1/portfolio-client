/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const BlogCard = ({ blog, index }: { blog: any; index: number }) => {
  const primaryColor = "rgb(224, 94, 87)";

  return (
    <motion.div
      // 🌀 Card entry animation
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.15, // একটার পর একটা আসবে
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.15)",
      }}
      className="group border dark:border-gray-600 rounded-2xl shadow-md overflow-hidden bg-white dark:bg-gray-700 transition-all duration-300"
    >
      {/* 🖼️ Thumbnail */}
      <div className="relative overflow-hidden">
        <motion.img
          src={
            blog.thumbnail ||
            "https://via.placeholder.com/600x400?text=No+Image"
          }
          alt={blog.title}
          className="w-full h-52 object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4 }}
        />

        {/* 🌟 Featured badge */}
        {blog.isFeatured && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
            className="absolute top-3 left-3 text-white text-xs font-semibold px-3 py-1 rounded-full"
            style={{ backgroundColor: primaryColor }}
          >
            Featured
          </motion.span>
        )}
      </div>

      {/* 🧠 Content */}
      <div className="p-5">
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
          <span>{blog.category || "General"}</span>
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>

        <h3 className="text-xl font-bold mb-2 group-hover:text-[rgb(224,94,87)] transition-colors duration-300 line-clamp-2">
          {blog.title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {blog.excerpt ? blog.excerpt : blog.content?.slice(0, 120) + "..."}
        </p>

        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {blog.tags.slice(0, 3).map((tag: string, i: number) => (
              <span
                key={i}
                className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <span>👁 {blog.views || 0}</span>
            <span>💬 {blog.comments?.length || 0}</span>
          </div>

          <Link
            href={`/blogs/${blog.id}`}
            className="text-[rgb(224,94,87)] font-semibold hover:underline"
          >
            Read More →
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
