/* eslint-disable @typescript-eslint/no-explicit-any */

import BlogCard from "@/components/modules/Blogs/BlogCard";

export const metadata = {
  title: "All Blogs | Portfolio",
  description:
    "Browse all blog posts from Rayhan Rakib — web development, React, and Next.js tips.",
};

const AllBlogsPage = async () => {
  // ✅ Fetch blogs dynamically
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog`, {
    cache: "no-store", // always fresh data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  const { data: blogs } = await res.json();

  return (
    <div className="py-20 px-4 max-w-7xl mt-7 mx-auto">
      <h2 className="text-center text-4xl font-bold mb-10">
         All Blogs
      </h2>

      {blogs?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog: any) => (
            <BlogCard key={blog.id} blog={blog} index={0} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          No blogs found 😢
        </p>
      )}
    </div>
  );
};

export default AllBlogsPage;
