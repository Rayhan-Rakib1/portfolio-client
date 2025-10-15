/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const primaryColor = "rgb(224, 94, 87)";

interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  features?: string[];
  technologies?: string[];
  isFeatured: boolean;
  views: number;
  likes: number;
  liveUrl?: string;
  repoUrl?: string;
  thumbnail?: string;
  status: string;
}

const ProjectsDetailsCard = ({ project }: { project: Project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden"
    >
      {/* Thumbnail */}
      <div className="relative w-full h-64">
        <img
          src={project.thumbnail || "https://via.placeholder.com/800x400?text=No+Image"}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        {project.isFeatured && (
          <span
            className="absolute top-3 left-3 text-white text-sm font-semibold px-3 py-1 rounded-full"
            style={{ backgroundColor: primaryColor }}
          >
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title & Status */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">{project.title}</h2>
          <span
            className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
              project.status === "completed" ? "bg-green-600" : "bg-yellow-500"
            }`}
          >
            {project.status}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>

{project.features?.length ? (
  <div className="mb-3">
    <h4 className="font-semibold mb-1">Features:</h4>
    <div className="flex flex-wrap gap-2">
      {project.features.map((f, i) => (
        <span
          key={i}
          className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
        >
          {f}
        </span>
      ))}
    </div>
  </div>
) : null}


        {/* Technologies */}
        {project.technologies?.length ? (
          <div className="mb-4">
            <h4 className="font-semibold mb-1">Technologies:</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {/* Footer */}
        <div className="flex justify-between items-center mt-6">
          <div className="flex gap-4 text-gray-500 dark:text-gray-400">
            <span>👁 {project.views}</span>
            <span>❤️ {project.likes}</span>
          </div>
          <div className="flex gap-2">
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                className="px-4 py-2 rounded font-semibold text-white flex items-center gap-1"
                style={{ backgroundColor: primaryColor }}
              >
                🔗 Live
              </Link>
            )}
            {project.repoUrl && (
              <Link
                href={project.repoUrl}
                target="_blank"
                className="px-4 py-2 rounded font-semibold border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 flex items-center gap-1"
              >
                🖥 Repo
              </Link>
            )}
            
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectsDetailsCard;
