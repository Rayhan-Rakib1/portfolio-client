import Sidebar from "@/components/shared/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | My Portfolio",
  description:
    "Access the admin dashboard to manage blogs, projects, and portfolio content. Secure area for the portfolio owner only.",
 
  keywords: [
    "Portfolio Dashboard",
    "Next.js Dashboard",
    "Blog Management",
    "Project Management",
    "Admin Panel",
  ],
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-dvh flex gap-4">
      <Sidebar />
      {children}
    </main>
  );
}
