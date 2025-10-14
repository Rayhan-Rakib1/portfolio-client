/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function ManageBlog() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // 🧠 Fetch Blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog`);
        const { data } = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
        toast.error("❌ Failed to fetch blogs!");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // ✏️ Update Blog
  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/${selectedBlog.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: selectedBlog.title,
            category: selectedBlog.category,
          }),
        }
      );
      if (!res.ok) throw new Error("Update failed");
      toast.success("✅ Blog updated successfully!");
      setIsUpdateOpen(false);
      // refresh blogs
      const newRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog`);
      const { data } = await newRes.json();
      setBlogs(data);
    } catch {
      toast.error("❌ Failed to update blog!");
    }
  };

  // 🗑️ Delete Blog
  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/${deleteId}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("Delete failed");
      toast.success("🗑️ Blog deleted successfully!");
      setIsDeleteOpen(false);
      // Refresh
      const newRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog`);
      const { data } = await newRes.json();
      setBlogs(data);
    } catch {
      toast.error("❌ Failed to delete blog!");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-lg font-semibold">Loading blogs...</p>;

  return (
    <div className="p-6">
      <h1 className="text-4xl font-extrabold mb-6 text-center tracking-wider">
        MANAGE BLOGS
      </h1>

      <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-300 dark:border-gray-700">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 dark:bg-gray-800 uppercase">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Title</th>
              <th className="p-3">Content</th>
              <th className="p-3">Category</th>
              <th className="p-3">Published</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {blogs.map((blog, index) => (
              <tr
                key={blog.id}
                className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3 font-semibold">{blog.title}</td>
                <td className="p-3 text-gray-500">
                  {blog.content.length > 15
                    ? `${blog.content.slice(0, 15)}...`
                    : blog.content}
                </td>
                <td className="p-3">{blog.category}</td>
                <td className="p-3 font-bold">
                  {blog.published ? (
                    <span className="text-green-600">Yes</span>
                  ) : (
                    <span className="text-red-500">No</span>
                  )}
                </td>
                <td className="p-3 flex justify-center gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedBlog(blog);
                      setIsUpdateOpen(true);
                    }}
                  >
                    <Edit className="w-4 h-4 mr-1" /> Edit
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      setDeleteId(blog.id);
                      setIsDeleteOpen(true);
                    }}
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✏️ Update Modal */}
      <Dialog open={isUpdateOpen} onOpenChange={setIsUpdateOpen}>
  <DialogContent className="sm:max-w-lg">
    <DialogHeader>
      <DialogTitle className="text-xl font-semibold text-center">
        ✏️ Edit Blog
      </DialogTitle>
    </DialogHeader>

    <div className="space-y-4 py-3">
      {/* Title */}
      <div>
        <label className="text-sm font-medium">Title</label>
        <Input
          value={selectedBlog?.title || ""}
          onChange={(e) =>
            setSelectedBlog({ ...selectedBlog, title: e.target.value })
          }
          placeholder="Enter title"
        />
      </div>

      {/* Slug */}
      <div>
        <label className="text-sm font-medium">Slug</label>
        <Input
          value={selectedBlog?.slug || ""}
          onChange={(e) =>
            setSelectedBlog({ ...selectedBlog, slug: e.target.value })
          }
          placeholder="example-blog-slug"
        />
      </div>

      {/* Content */}
      <div>
        <label className="text-sm font-medium">Content</label>
        <textarea
          rows={4}
          value={selectedBlog?.content || ""}
          onChange={(e) =>
            setSelectedBlog({ ...selectedBlog, content: e.target.value })
          }
          className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
          placeholder="Write blog content..."
        ></textarea>
      </div>

      {/* Category */}
      <div>
        <label className="text-sm font-medium">Category</label>
        <Input
          value={selectedBlog?.category || ""}
          onChange={(e) =>
            setSelectedBlog({ ...selectedBlog, category: e.target.value })
          }
          placeholder="Tech, News, Design..."
        />
      </div>

      {/* isFeatured */}
      <div className="flex items-center justify-between mt-3">
        <label className="text-sm font-medium">Featured?</label>
        <input
          type="checkbox"
          checked={selectedBlog?.isFeatured || false}
          onChange={(e) =>
            setSelectedBlog({
              ...selectedBlog,
              isFeatured: e.target.checked,
            })
          }
          className="h-5 w-5 accent-rose-500"
        />
      </div>

      {/* published */}
      <div className="flex items-center justify-between mt-2">
        <label className="text-sm font-medium">Published?</label>
        <input
          type="checkbox"
          checked={selectedBlog?.published || false}
          onChange={(e) =>
            setSelectedBlog({
              ...selectedBlog,
              published: e.target.checked,
            })
          }
          className="h-5 w-5 accent-green-500"
        />
      </div>
    </div>

    <DialogFooter className="flex justify-end gap-3">
      <Button
        variant="outline"
        onClick={() => setIsUpdateOpen(false)}
        className="rounded-md"
      >
        Cancel
      </Button>
      <Button
        onClick={handleUpdate}
        style={{ backgroundColor: "rgb(224,94,87)" }}
        className="text-white font-semibold"
      >
        Save Changes
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>


      {/* 🗑️ Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600">Confirm Delete</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this blog?</p>
          <DialogFooter className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
