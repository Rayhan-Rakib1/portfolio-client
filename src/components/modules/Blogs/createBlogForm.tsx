"use client";

import { blogCreate } from "@/actions/blog";
import { useState } from "react";
import { toast } from "sonner"; // optional notification

export default function CreateBlogForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      await blogCreate(formData);
      toast.success("Blog created successfully!");
    //   e.currentTarget.reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Create New Blog
      </h2>

      <input
        name="title"
        type="text"
        placeholder="Blog Title"
        required
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
      />

      <input
        name="slug"
        type="text"
        placeholder="Slug (unique)"
        required
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
      />

      <textarea
        name="content"
        placeholder="Blog Content"
        required
        rows={8}
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
      />

      <input
        name="excerpt"
        type="text"
        placeholder="Excerpt (optional)"
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
      />

      <input
        name="tags"
        type="text"
        placeholder="Tags (comma separated)"
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
      />

      <input
        name="category"
        type="text"
        placeholder="Category"
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
      />

      <label className="flex items-center gap-2">
        <input type="checkbox" name="isFeatured" className="accent-blue-500" />
        Featured
      </label>

      <label className="flex items-center gap-2">
        <input type="checkbox" name="published" className="accent-green-500" />
        Publish Immediately
      </label>

      <button
        type="submit"
        disabled={loading}
        style={{ backgroundColor: "rgb(224, 94, 87)" }}
        className="text-white font-medium px-6 py-3 rounded-md w-full transition hover:opacity-90"
      >
        {loading ? "Creating..." : "Create Blog"}
      </button>
    </form>
  );
}
