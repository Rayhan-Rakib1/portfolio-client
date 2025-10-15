/* eslint-disable @typescript-eslint/no-explicit-any */

import ProjectCard from "@/components/modules/projects/ProjectCard";

export const metadata = {
  title: "All Projects | Portfolio",
  description:
    "Browse all projects from Rayhan Rakib — web development, React, Next.js, and more.",
};

const AllProjectsPage = async () => {
  // ✅ Fetch projects dynamically
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects`, {
    cache: "no-store", // always fresh data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  const { data: projects } = await res.json();

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <h2 className="text-center text-4xl font-bold mb-10 mt-7">All Projects</h2>

      {projects?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project: any) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          No projects found 😢
        </p>
      )}
    </div>
  );
};

export default AllProjectsPage;
