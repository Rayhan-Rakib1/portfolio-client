/* eslint-disable @next/next/no-img-element */
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

export default function ManageProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // 🧠 Fetch Projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects`);
        const json = await res.json();
        setProjects(Array.isArray(json.data) ? json.data : []);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        toast.error("❌ Failed to fetch projects!");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // ✏️ Update Project
  const handleUpdate = async () => {
    if (!selectedProject) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/${selectedProject.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: selectedProject.title,
            status: selectedProject.status,
            isFeatured: selectedProject.isFeatured,
          }),
        }
      );
      if (!res.ok) throw new Error("Update failed");
      toast.success("✅ Project updated successfully!");
      setIsUpdateOpen(false);

      // Refresh projects
      const newRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects`);
      const json = await newRes.json();
      setProjects(Array.isArray(json.data) ? json.data : []);
    } catch {
      toast.error("❌ Failed to update project!");
    }
  };

  // 🗑️ Delete Project
  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/${deleteId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("🗑️ Project deleted successfully!");
      setIsDeleteOpen(false);

      // Refresh projects
      const newRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects`);
      const json = await newRes.json();
      setProjects(Array.isArray(json.data) ? json.data : []);
    } catch {
      toast.error("❌ Failed to delete project!");
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-lg font-semibold">
        Loading projects...
      </p>
    );

  return (
    <div className="p-6">
      <h1 className="text-4xl font-extrabold mb-6 text-center tracking-wider">
        MANAGE PROJECTS
      </h1>

   <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-300 dark:border-gray-700">
  <table className="min-w-full text-sm text-left">
    <thead className="bg-gray-100 dark:bg-gray-800 uppercase">
      <tr>
        <th className="p-2">#</th>
        <th className="p-2">Title</th>
        <th className="p-2">Slug</th>
        <th className="p-2">Description</th>
        <th className="p-2">Features</th>
        <th className="p-2">Technologies</th>
        <th className="p-2">Status</th>
        <th className="p-2">Featured</th>
        <th className="p-2">Views</th>
        <th className="p-2">Likes</th>
        <th className="p-2">Live URL</th>
        <th className="p-2">Repo URL</th>
        <th className="p-2">Thumbnail</th>
        <th className="p-2 text-center">Actions</th>
      </tr>
    </thead>

    <tbody>
      {projects.length > 0 ? (
        projects.map((project, index) => (
          <tr
            key={project.id}
            className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
          >
            <td className="p-2">{index + 1}</td>
            <td className="p-2 font-semibold">{project.title}</td>
            <td className="p-2">{project.slug}</td>
            <td className="p-2 text-gray-500">
              {project.description?.length > 15
                ? `${project.description.slice(0, 15)}...`
                : project.description}
            </td>
            <td className="p-2">
              {project.features?.length > 0
                ? project.features.join(", ")
                : "-"}
            </td>
            <td className="p-2">
              {project.technologies?.length > 0
                ? project.technologies.join(", ")
                : "-"}
            </td>
            <td className="p-2 capitalize">{project.status}</td>
            <td className="p-2 font-bold">
              {project.isFeatured ? (
                <span className="text-green-600">Yes</span>
              ) : (
                <span className="text-red-500">No</span>
              )}
            </td>
            <td className="p-2">{project.views}</td>
            <td className="p-2">{project.likes}</td>
            <td className="p-2 text-blue-600 underline">
              {project.liveUrl ? (
                <a href={project.liveUrl} target="_blank">
                  Link
                </a>
              ) : (
                "-"
              )}
            </td>
            <td className="p-2 text-blue-600 underline">
              {project.repoUrl ? (
                <a href={project.repoUrl} target="_blank">
                  Repo
                </a>
              ) : (
                "-"
              )}
            </td>
            <td className="p-2">
              {project.thumbnail ? (
                <img
                  src={project.thumbnail}
                  alt="thumbnail"
                  className="w-12 h-12 object-cover rounded"
                />
              ) : (
                "-"
              )}
            </td>
            <td className="p-2 flex justify-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setSelectedProject(project);
                  setIsUpdateOpen(true);
                }}
              >
                <Edit className="w-4 h-4 mr-1" /> Edit
              </Button>

              <Button
                size="sm"
                variant="destructive"
                onClick={() => {
                  setDeleteId(project.id);
                  setIsDeleteOpen(true);
                }}
              >
                <Trash2 className="w-4 h-4 mr-1" /> Delete
              </Button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={14} className="text-center text-gray-500 p-4">
            No projects found!
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>


      {/* ✏️ Update Modal */}
<Dialog open={isUpdateOpen} onOpenChange={setIsUpdateOpen}>
  <DialogContent className="sm:max-w-xl max-h-[80vh] overflow-y-auto">
    <DialogHeader>
      <DialogTitle className="text-xl font-semibold text-center">
        ✏️ Edit Project
      </DialogTitle>
    </DialogHeader>

    <div className="space-y-4 py-3">
      {/* Title */}
      <div>
        <label className="text-sm font-medium">Title</label>
        <Input
          value={selectedProject?.title || ""}
          onChange={(e) =>
            setSelectedProject({ ...selectedProject, title: e.target.value })
          }
          placeholder="Project Title"
        />
      </div>

      {/* Slug */}
      <div>
        <label className="text-sm font-medium">Slug</label>
        <Input
          value={selectedProject?.slug || ""}
          onChange={(e) =>
            setSelectedProject({ ...selectedProject, slug: e.target.value })
          }
          placeholder="project-slug"
        />
      </div>

      {/* Description */}
      <div>
        <label className="text-sm font-medium">Description</label>
        <textarea
          value={selectedProject?.description || ""}
          onChange={(e) =>
            setSelectedProject({ ...selectedProject, description: e.target.value })
          }
          rows={4}
          className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-rose-500 outline-none"
          placeholder="Project description"
        />
      </div>

      {/* Features (comma separated) */}
      <div>
        <label className="text-sm font-medium">Features (comma separated)</label>
        <Input
          value={selectedProject?.features?.join(", ") || ""}
          onChange={(e) =>
            setSelectedProject({ ...selectedProject, features: e.target.value.split(",").map(f => f.trim()) })
          }
          placeholder="Feature1, Feature2"
        />
      </div>

      {/* Technologies (comma separated) */}
      <div>
        <label className="text-sm font-medium">Technologies (comma separated)</label>
        <Input
          value={selectedProject?.technologies?.join(", ") || ""}
          onChange={(e) =>
            setSelectedProject({ ...selectedProject, technologies: e.target.value.split(",").map(t => t.trim()) })
          }
          placeholder="React, Node.js, MongoDB"
        />
      </div>

      {/* Live URL */}
      <div>
        <label className="text-sm font-medium">Live URL</label>
        <Input
          value={selectedProject?.liveUrl || ""}
          onChange={(e) =>
            setSelectedProject({ ...selectedProject, liveUrl: e.target.value })
          }
          placeholder="https://example.com"
        />
      </div>

      {/* Repo URL */}
      <div>
        <label className="text-sm font-medium">Repo URL</label>
        <Input
          value={selectedProject?.repoUrl || ""}
          onChange={(e) =>
            setSelectedProject({ ...selectedProject, repoUrl: e.target.value })
          }
          placeholder="https://github.com/..."
        />
      </div>

      {/* Thumbnail */}
      <div>
        <label className="text-sm font-medium">Thumbnail URL</label>
        <Input
          value={selectedProject?.thumbnail || ""}
          onChange={(e) =>
            setSelectedProject({ ...selectedProject, thumbnail: e.target.value })
          }
          placeholder="https://image.com/thumbnail.png"
        />
      </div>

      {/* Status */}
      <div>
        <label className="text-sm font-medium">Status</label>
        <Input
          value={selectedProject?.status || ""}
          onChange={(e) =>
            setSelectedProject({ ...selectedProject, status: e.target.value })
          }
          placeholder="in-progress / completed"
        />
      </div>

      {/* Views */}
      <div>
        <label className="text-sm font-medium">Views</label>
        <Input
          type="number"
          value={selectedProject?.views || 0}
          onChange={(e) =>
            setSelectedProject({ ...selectedProject, views: Number(e.target.value) })
          }
        />
      </div>

      {/* Likes */}
      <div>
        <label className="text-sm font-medium">Likes</label>
        <Input
          type="number"
          value={selectedProject?.likes || 0}
          onChange={(e) =>
            setSelectedProject({ ...selectedProject, likes: Number(e.target.value) })
          }
        />
      </div>

      {/* Featured Checkbox */}
      <div className="flex items-center justify-between mt-3">
        <label className="text-sm font-medium">Featured?</label>
        <input
          type="checkbox"
          checked={selectedProject?.isFeatured || false}
          onChange={(e) =>
            setSelectedProject({ ...selectedProject, isFeatured: e.target.checked })
          }
          className="h-5 w-5 accent-rose-500"
        />
      </div>
    </div>

    <DialogFooter className="flex justify-end gap-3">
      <Button variant="outline" onClick={() => setIsUpdateOpen(false)}>
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
          <p>Are you sure you want to delete this project?</p>
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
