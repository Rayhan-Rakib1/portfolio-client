/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { Metadata } from "next";
import ProjectCard from "../projects/ProjectCard";

export const metadata: Metadata = {
  title: "Featured Projects | My Portfolio",
  description: "Showcasing 3 featured projects from API",
};

const FeaturedProjectsPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects`, {
    cache: "no-store",
  });

  const { data: projects } = await res.json();
  const featured = projects.slice(0, 3);

  return (
    <div className="py-16 px-6 max-w-screen mx-auto bg-white dark:bg-gray-900">
    <div className="max-w-7xl mx-auto ">
          <h2 className="text-center text-4xl font-bold mb-10 text-gray-900 dark:text-gray-100">
        Featured Projects
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {featured.map((project: any) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* 🔹 Show All Projects Button */}
      <div className="text-center mt-6">
        <Link href="/projects">
          <button className="bg-[rgb(224,94,87)] dark:bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 dark:hover:bg-red-500 transition-colors">
            Show All Projects
          </button>
        </Link>
      </div>
    </div>
    </div>
  );
};

export default FeaturedProjectsPage;
