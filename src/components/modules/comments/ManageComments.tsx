/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function ManageComments() {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // 🧠 Fetch Comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/comment`);
        const json = await res.json();
        setComments(Array.isArray(json.data) ? json.data : []);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
        toast.error("❌ Failed to fetch comments!");
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, []);

  // 🗑️ Delete Comment
  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/comment/${deleteId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("🗑️ Comment deleted successfully!");
      setIsDeleteOpen(false);

      // Refresh comments
      const newRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/comment`);
      const json = await newRes.json();
      setComments(Array.isArray(json.data) ? json.data : []);
    } catch {
      toast.error("❌ Failed to delete comment!");
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-lg font-semibold">Loading comments...</p>
    );

  return (
    <div className="p-6">
      <h1 className="text-4xl font-extrabold mb-6 text-center tracking-wider">
        MANAGE COMMENTS
      </h1>

      <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-300 dark:border-gray-700">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 dark:bg-gray-800 uppercase">
            <tr>
              <th className="p-2">#</th>
              <th className="p-2">Content</th>
              <th className="p-2">Author</th>
              <th className="p-2">Email</th>
              <th className="p-2">Created At</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <tr
                  key={comment.id}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2 text-gray-500">
                    {comment.content.length > 15
                      ? `${comment.content.slice(0, 15)}...`
                      : comment.content}
                  </td>
                  <td className="p-2">{comment.author || "-"}</td>
                  <td className="p-2">{comment.email || "-"}</td>
                  <td className="p-2">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-2 flex justify-center gap-2">
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        setDeleteId(comment.id);
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
                <td colSpan={6} className="text-center text-gray-500 p-4">
                  No comments found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🗑️ Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600">Confirm Delete</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this comment?</p>
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
