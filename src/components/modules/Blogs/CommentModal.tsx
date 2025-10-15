/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { useState } from "react";
import { 
  Button 
} from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { 
  Label 
} from "@/components/ui/label";
import { 
  Input 
 } from "@/components/ui/input";
import { 
  Textarea 
} from "@/components/ui/textarea";
import { toast } from "react-hot-toast";

interface CommentModalProps {
  blogId: number;
  onCommentAdded?: () => void;
}

const CommentModal = ({ blogId, onCommentAdded }: CommentModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast.error("Comment cannot be empty!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/comment/blog/${blogId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blogId,
          author: name,
          email,
          content,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit comment");
      }

      toast.success("Comment submitted!");
      setName("");
      setEmail("");
      setContent("");
      setIsOpen(false);

      if (onCommentAdded) onCommentAdded();
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Add Comment</Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Your Comment</DialogTitle>
            <DialogDescription>
              Share your thoughts about this blog.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="grid gap-1">
              <Label htmlFor="email">Email (optional)</Label>
              <Input
                id="email"
                placeholder="you@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="grid gap-1">
              <Label htmlFor="content">Comment</Label>
              <Textarea
                id="content"
                placeholder="Write your comment..."
                value={content}
                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setContent(e.target.value)}
                rows={4}
              />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-2"
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CommentModal;
