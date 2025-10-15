/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const primaryColor = "rgb(224, 94, 87)";

interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  features: string[];
  technologies: string[];
  isFeatured: boolean;
  views: number;
  likes: number;
  liveUrl?: string;
  repoUrl?: string;
  thumbnail?: string;
  status: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
      className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md transition-shadow duration-300"
    >
      {/* Thumbnail */}
      <div className="relative">
        <img
          src={project.thumbnail || "https://via.placeholder.com/600x400?text=No+Image"}
          alt={project.title}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {project.isFeatured && (
          <span
            className="absolute top-3 left-3 text-white text-xs font-semibold px-3 py-1 rounded-full"
            style={{ backgroundColor: primaryColor }}
          >
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title (link to details page) */}
        <h3 className="text-xl font-bold mb-2 group-hover:text-rose-500 transition-colors duration-300">
          <Link href={`/projects/${project.id}`}>{project.title}</Link>
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-3">
          {project.description}
        </p>

        {/* Features */}
        {project.features.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {project.features.map((f, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
              >
                {f}
              </span>
            ))}
          </div>
        )}

        {/* Technologies */}
        {project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {project.technologies.map((t, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between items-center text-sm mt-3">
          <div className="flex gap-3 text-gray-500 dark:text-gray-400">
            <span>👁 {project.views}</span>
            <span>❤️ {project.likes}</span>
          </div>

          <div className="flex gap-2">
            {/* Live button */}
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                className="flex items-center gap-1 text-white px-3 py-1 rounded font-semibold text-xs"
                style={{ backgroundColor: primaryColor }}
              >
                <FaExternalLinkAlt /> Live
              </Link>
            )}

            {/* Repo button */}
            {project.repoUrl && (
              <Link
                href={project.repoUrl}
                target="_blank"
                className="flex items-center gap-1 text-gray-700 dark:text-gray-200 px-3 py-1 rounded border border-gray-300 dark:border-gray-600 text-xs font-semibold"
              >
                <FaGithub /> Repo
              </Link>
            )}

            {/* Details button */}
            <Link
              href={`/projects/${project.id}`}
              className="flex items-center gap-1 text-white px-3 py-1 rounded font-semibold text-xs"
              style={{ backgroundColor: primaryColor }}
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
