/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import BlogDetailsCard from "@/components/modules/Blogs/BlogDetailsCard";
import { getBlogById } from "@/services/blogServices";

// 🧠 Generate Static Params (optional — helps with SSG)
export const generateStaticParams = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog`);
  const { data: blogs } = await res.json();

  return blogs.slice(0, 2).map((blog: any) => ({
    blogId: String(blog.id),
  }));
};

// 🏷 SEO Metadata
export const generateMetadata = async ({
  params,
}: {
  params: { blogId: string };
}) => {
  const blog = await getBlogById(params.blogId);

  return {
    title: blog?.title || "Blog Details",
    description: blog?.excerpt || blog?.content?.slice(0, 120) || "Blog content",
  };
};

// 📰 Blog Details Page
const BlogDetailsPage = async ({
  params,
}: {
  params: { blogId: string };
}) => {
    console.log(params.blogId);
  const blog = await getBlogById(params.blogId);

  if (!blog) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center text-gray-500 dark:text-gray-300">
        Blog not found 😢
      </div>
    );
  }

  return (
    <div className="py-24 px-4 max-w-6xl mx-auto">
      <BlogDetailsCard blogRes={blog} />
    </div>
  );
};

export default BlogDetailsPage;
