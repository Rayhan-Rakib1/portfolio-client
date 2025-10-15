/* eslint-disable @typescript-eslint/no-explicit-any */
import ProjectsDetailsCard from "@/components/modules/projects/ProjectsDetailsCard";
import { getProjectById } from "@/services/projectsServices";
import React from "react";


// 🧠 Generate Static Params (for SSG)
export const generateStaticParams = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects`);
  const { data: projects } = await res.json();

  return projects.slice(0, 5).map((project: any) => ({
    projectId: String(project.id),
  }));
};

// 🏷 SEO Metadata
export const generateMetadata = async ({
  params,
}: {
  params: { projectId: string };
}) => {
  const project = await getProjectById(params.projectId);

  return {
    title: project?.title || "Project Details",
    description:
      project?.description?.slice(0, 120) ||
      "Project details and technologies used",
  };
};

// 🖥 Project Details Page
const ProjectDetailsPage = async ({
  params,
}: {
  params: { projectId: string };
}) => {
  const project = await getProjectById(params.projectId);

  if (!project) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center text-gray-500 dark:text-gray-300">
        Project not found 😢
      </div>
    );
  }
  const projectRes = project.data; 

  return (
    <div className="py-24 px-4 max-w-6xl mx-auto">
      <ProjectsDetailsCard project={projectRes} />
    </div>
  );
};

export default ProjectDetailsPage;
