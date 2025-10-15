/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

interface Comment {
  id: number;
  content: string;
  author?: string;
  email?: string;
  createdAt: string;
}

interface BlogDetailsCardProps {
  blogRes: any;
}

const BlogDetailsCard: React.FC<BlogDetailsCardProps> = ({ blogRes }) => {
  const blog = blogRes.data;
  const primaryColor = "rgb(224, 94, 87)";

  const [comments, setComments] = useState<Comment[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch comments
  const fetchComments = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/comment/blog/${blog.id}`);
      const data = await res.json();
      setComments(data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // Submit comment
  const handleSubmit = async () => {
    if (!content.trim()) return toast.error("Comment cannot be empty!");
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/comment/blog/${blog.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author: name, email, content }),
      });
      if (!res.ok) throw new Error("Failed to submit comment");

      toast.success("Comment submitted!");
      setName("");
      setEmail("");
      setContent("");
      setModalOpen(false);
      fetchComments(); // Refresh comments
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden p-6 mb-6"
    >
      {/* Thumbnail */}
      {blog.thumbnail && (
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-lg mb-6 transition-transform duration-300"
        />
      )}

      {/* Category & Date */}
      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
        <span>{blog.category || "General"}</span>
        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>

      {/* Title */}
      <h1
        className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100"
        style={{ color: primaryColor }}
      >
        {blog.title}
      </h1>

      {/* Featured & Published */}
      <div className="flex gap-4 mb-4">
        {blog.isFeatured && (
          <span
            className="text-white px-3 py-1 rounded-full text-sm font-semibold"
            style={{ backgroundColor: primaryColor }}
          >
            Featured
          </span>
        )}
        {blog.published ? (
          <span
            className="text-white px-3 py-1 rounded-full text-sm font-semibold"
            style={{ backgroundColor: primaryColor }}
          >
            Published
          </span>
        ) : (
          <span className="text-white px-3 py-1 rounded-full text-sm font-semibold bg-gray-400">
            Draft
          </span>
        )}
      </div>

      {/* Content */}
      <div className="prose dark:prose-invert mb-4">{blog.content}</div>

      {/* Tags */}
      {blog.tags && blog.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {blog.tags.map((tag: string, i: number) => (
            <span
              key={i}
              className="text-white px-2 py-1 rounded-full text-xs font-medium"
              style={{ backgroundColor: primaryColor }}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Views & Comment Button */}
      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
        <span>👁 {blog.views || 0}</span>
        <button
          onClick={() => setModalOpen(true)}
          className="text-white px-3 py-1 rounded font-semibold"
          style={{ backgroundColor: primaryColor }}
        >
          💬 Comment
        </button>
      </div>

      {/* Comment Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Leave a Comment</DialogTitle>
            <DialogDescription>
              Share your thoughts with others about this blog.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3 mt-2">
            <Input
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Your Email (optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Textarea
              placeholder="Your Comment"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
            />
          </div>

          <DialogFooter>
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full"
              style={{ backgroundColor: primaryColor }}
            >
              {loading ? "Submitting..." : "Submit Comment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Render All Comments */}
      <div className="mt-6">
        <h3 className="font-semibold mb-3 text-lg">Comments ({comments.length})</h3>
        {comments.length === 0 && <p className="text-gray-500">No comments yet 😢</p>}
        <ul className="space-y-3">
          {comments.map((c) => (
            <li
              key={c.id}
              className="border dark:border-gray-700 rounded p-3 bg-gray-50 dark:bg-gray-800"
            >
              <p className="text-gray-900 dark:text-gray-100">{c.content}</p>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{c.author || "Anonymous"}</span>
                <span>{new Date(c.createdAt).toLocaleDateString()}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default BlogDetailsCard;
