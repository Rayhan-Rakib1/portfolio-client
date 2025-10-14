"use client";

import { motion } from "framer-motion";

const Skills = () => {
  const skillsData = {
    frontend: [
      { name: "HTML", level: 90 },
      { name: "CSS", level: 100 },
      { name: "JavaScript", level: 90 },
      { name: "React", level: 100 },
    ],
    backend: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 80 },
      { name: "CORS & Middleware", level: 75 },
      { name: "REST API", level: 90 }, // New skill added
    ],
    database: [
      { name: "MongoDB", level: 90 },
      { name: "PostgreSQL", level: 80 },
      { name: "Prisma", level: 85 },
    ],
    problemSolving: [
      { name: "Algorithms & DS", level: 90 },
      { name: "Problem Solving", level: 95 },
      { name: "Data Structures", level: 85 }, // New skill added
    ],
  };

  const renderSkills = (skills: { name: string; level: number }[]) => {
    return skills.map((skill, idx) => (
      <div key={idx} className="mb-4">
        <div className="flex justify-between mb-1 text-sm font-medium">
          <span>{skill.name}</span>
          <span>{skill.level}%</span>
        </div>
        <div className="w-full h-1 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-1 bg-[rgb(224,94,87)] rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: idx * 0.2 }}
          />
        </div>
      </div>
    ));
  };

  return (
    <section className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-20 px-6 sm:px-10 lg:px-20 flex flex-col items-center">
      <motion.h2
        className="text-4xl font-bold mb-12 text-center "
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        My Technical Skills
      </motion.h2>

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10">
        {/* Frontend */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h3 className="text-2xl font-semibold text-[rgb(224,94,87)] mb-4">
            Frontend Developer
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">More than 1 year experience</p>
          {renderSkills(skillsData.frontend)}
        </motion.div>

        {/* Backend */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h3 className="text-2xl font-semibold text-[rgb(224,94,87)] mb-4">
            Backend Developer
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">More than 1 year experience</p>
          {renderSkills(skillsData.backend)}
        </motion.div>

        {/* Database */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h3 className="text-2xl font-semibold text-[rgb(224,94,87)] mb-4">Database</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">1+ year experience</p>
          {renderSkills(skillsData.database)}
        </motion.div>

        {/* Problem Solving */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h3 className="text-2xl font-semibold text-[rgb(224,94,87)] mb-4">Problem Solving</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">2+ years experience</p>
          {renderSkills(skillsData.problemSolving)}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
