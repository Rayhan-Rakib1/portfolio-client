/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import BlogCard from "@/components/modules/Blogs/BlogCard";

const ThreeBlog = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog`, {
    cache: "no-store", 
  });

  const { data: blogs } = await res.json();

  const featuredBlogs = blogs.slice(0, 3);

  return (
    <div className="py-16 px-6 max-w-screen mx-auto bg-white dark:bg-gray-900">
    <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl font-bold mb-10 text-gray-900 dark:text-gray-100">
        Featured Blogs
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredBlogs.map((blog: any, index: number) => (
          <BlogCard key={blog.id} blog={blog} index={index} />
        ))}
      </div>

      {/* 🔹 Show All Blogs Button */}
      <div className="text-center mt-6">
        <Link href="/blogs">
          <button className="bg-[rgb(224,94,87)] dark:bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 dark:hover:bg-red-500 transition-colors">
            Show All Blogs
          </button>
        </Link>
      </div>
    </div>
    </div>
  );
};

export default ThreeBlog;
