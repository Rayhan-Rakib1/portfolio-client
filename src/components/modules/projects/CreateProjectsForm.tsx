"use client";

import { createProjects } from "@/actions/project";
import { useState } from "react";
import { toast } from "sonner";

const CreateProjectsForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    features: "",
    technologies: "",
    liveUrl: "",
    repoUrl: "",
    thumbnail: "",
    isFeatured: false,
  });

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const target = e.target as HTMLInputElement; // type cast
  const { name, value, type, checked } = target;

  setFormData((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
  }));
};


 const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      await createProjects(formData);
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-2xl rounded-2xl w-full max-w-2xl p-8 border border-gray-300 dark:border-gray-700 transition-all duration-300"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-rose-500 dark:text-rose-400">
          Create New Project 🚀
        </h2>

        {/* Title & Slug */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-rose-500 outline-none"
              placeholder="Project title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Slug</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-rose-500 outline-none"
              placeholder="project-slug"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-rose-500 outline-none"
            placeholder="Write a short description..."
          ></textarea>
        </div>

        {/* Features & Technologies */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Features</label>
            <input
              type="text"
              name="features"
              value={formData.features}
              onChange={handleChange}
              placeholder="Feature1, Feature2, Feature3"
              className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-rose-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Technologies</label>
            <input
              type="text"
              name="technologies"
              value={formData.technologies}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB"
              className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-rose-500 outline-none"
            />
          </div>
        </div>

        {/* URLs */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Live URL</label>
            <input
              type="url"
              name="liveUrl"
              value={formData.liveUrl}
              onChange={handleChange}
              placeholder="https://example.com"
              className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-rose-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Repo URL</label>
            <input
              type="url"
              name="repoUrl"
              value={formData.repoUrl}
              onChange={handleChange}
              placeholder="https://github.com/..."
              className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-rose-500 outline-none"
            />
          </div>
        </div>

        {/* Thumbnail */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Thumbnail URL</label>
          <input
            type="url"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            placeholder="https://image.com/thumbnail.png"
            className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-rose-500 outline-none"
          />
        </div>

        {/* Featured Checkbox & Submit */}
        <div className="flex items-center justify-between mt-6">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="h-5 w-5 accent-rose-500"
            />
            <span>Mark as Featured</span>
          </label>

    

          <button
        type="submit"
        disabled={loading}
        style={{ backgroundColor: "rgb(224, 94, 87)" }}
        className="text-white font-medium px-6 py-3 rounded-md  transition hover:opacity-90"
      >
        {loading ? "Submitting..." : "Submit Project"}
      </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProjectsForm;
