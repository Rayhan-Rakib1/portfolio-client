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
import { toast } from "sonner";

export default function ManageContact() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const primaryColor = "rgb(224, 94, 87)";

  // 🧠 Fetch contacts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/contactMe`
        );
        const { data } = await res.json();
        console.log(data);
        setContacts(data);
      } catch (error) {
        console.error(error);
        toast.error("❌ Failed to fetch contacts!");
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  // ✏️ Update status
  const handleUpdate = async () => {
    if (!selectedContact) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/contactMe/${selectedContact.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: selectedContact.status }),
        }
      );
      if (!res.ok) throw new Error("Update failed");
      toast.success("✅ Status updated!");
      setIsUpdateOpen(false);
      // Refresh contacts
      const newRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/contactMe`);
      const { data } = await newRes.json();
      setContacts(data);
    } catch {
      toast.error("❌ Failed to update status!");
    }
  };

  // 🗑️ Delete contact
  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/contactMe/${deleteId}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Delete failed");
      toast.success("🗑️ Contact deleted!");
      setIsDeleteOpen(false);
      // Refresh contacts
      const newRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/contactMe`);
      const { data } = await newRes.json();
      setContacts(data);
    } catch {
      toast.error("❌ Failed to delete contact!");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-lg font-semibold">Loading contacts...</p>;

  return (
    <div className="p-6">
      <h1 className="text-4xl font-extrabold mb-6 text-center tracking-wider">
        MANAGE CONTACTS
      </h1>

      <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-300 dark:border-gray-700">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 dark:bg-gray-800 uppercase">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Subject</th>
              <th className="p-3">Message</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {contacts.map((contact, index) => (
              <tr
                key={contact.id}
                className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3 font-semibold">{contact.name}</td>
                <td className="p-3">{contact.email}</td>
                <td className="p-3">{contact.subject || "-"}</td>
                <td className="p-3 text-gray-500">
                  {contact.message.length > 15
                    ? `${contact.message.slice(0, 15)}...`
                    : contact.message}
                </td>
                <td className="p-3 font-bold">
                  {contact.status === "unread" ? (
                    <span className="text-red-600">Unread</span>
                  ) : (
                    <span className="text-green-600">Read</span>
                  )}
                </td>
                <td className="p-3 flex justify-center gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedContact(contact);
                      setIsUpdateOpen(true);
                    }}
                  >
                    <Edit className="w-4 h-4 mr-1" /> Update
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      setDeleteId(contact.id);
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

      {/* ✏️ Update Status Modal */}
      <Dialog open={isUpdateOpen} onOpenChange={setIsUpdateOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-center">
              Update Status
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-3">
            <label className="text-sm font-medium">Status</label>
            <select
              value={selectedContact?.status || "unread"}
              onChange={(e) =>
                setSelectedContact({ ...selectedContact, status: e.target.value })
              }
              className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>

          <DialogFooter className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsUpdateOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleUpdate}
              style={{ backgroundColor: primaryColor }}
              className="text-white font-semibold"
            >
              Save
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
          <p>Are you sure you want to delete this contact?</p>
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
