"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Home,
  FileText,
  LayoutDashboard,
  Briefcase,
  PlusCircle,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const { status } = useSession();

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-gray-900 text-white">
      {/* Sidebar Header */}
      <div className="p-6 text-center border-b border-gray-700">
        <h2 className="text-xl font-semibold text-white">👨‍💻 Rakib Portfolio</h2>
        <p className="text-sm text-gray-400">Dashboard Menu</p>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black transition"
        >
          <Home className="h-4 w-4" /> Home
        </Link>

        <Link
          href="/dashboard"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black transition"
        >
          <LayoutDashboard className="h-4 w-4" /> Dashboard
        </Link>

        <Link
          href="/dashboard/manage-blog"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black transition"
        >
          <FileText className="h-4 w-4" /> Manage Blogs
        </Link>

        <Link
          href="/dashboard/manage-project"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black transition"
        >
          <Briefcase className="h-4 w-4" /> Manage Projects
        </Link>
        <Link
          href="/dashboard/manage-comments"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black transition"
        >
          <Briefcase className="h-4 w-4" /> Manage comments
        </Link>

        <Link
          href="/dashboard/create-blog"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black transition"
        >
          <PlusCircle className="h-4 w-4" /> Create Blog
        </Link>

        <Link
          href="/dashboard/create-project"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black transition"
        >
          <PlusCircle className="h-4 w-4" /> Create Project
        </Link>

        
      </nav>

      {/* Sidebar Bottom (Logout Button) */}
      <div className="p-4 border-t border-gray-700">
        {status === "authenticated" && (
          <Button
            variant="destructive"
            className="w-full justify-start gap-2 cursor-pointer bg-red-600 hover:bg-red-700 transition"
            onClick={() => signOut()}
          >
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        )}
      </div>
    </aside>
  );
}
