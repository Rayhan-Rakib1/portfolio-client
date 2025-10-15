"use client"; 
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function AboutPage() {
  const primaryColor = "rgb(224, 94, 87)"; // primary color
  const aboutData = {
    name: "Rayhan Rakib",
    title: "Full Stack Web Developer",
    bio: `I’m a passionate Web Developer with expertise in building modern, responsive, 
          and scalable web applications using React, Next.js, and Node.js. 
          I love solving problems, designing interfaces, and learning new technologies every day.`,
    contact: {
      email: "rayhanrakib114@gmail.com",
      phone: "+8801892814965",
      location: "Dhaka, Bangladesh",
      linkedin: "https://linkedin.com/in/rayhanrakib",
      github: "https://github.com/Rayhan-Rakib1",
      twitter: "https://x.com/Rakib_114",
    },
    skills: [
      "JavaScript (ES6+)",
      "TypeScript",
      "React.js / Next.js",
      "Node.js / Express.js",
      "MongoDB / Prisma / PostgreSQL",
      "Tailwind CSS",
      "Git / GitHub",
      "REST & GraphQL APIs",
      "Figma / UI Design",
    ],
    experience: [
      {
        company: "Freelance / Self-Employed",
        role: "Full Stack Developer",
        period: "2022 - Present",
        description:
          "Developing modern full-stack web applications, REST APIs, and client dashboards using Next.js, Express, and Prisma. Worked with clients to deliver responsive and optimized solutions.",
      },
      {
        company: "Personal Projects",
        role: "Frontend Developer",
        period: "2020 - 2022",
        description:
          "Built multiple personal projects to strengthen skills in React, Tailwind CSS, and backend integration. Focused on clean UI/UX and performance.",
      },
    ],
  };

  return (
    <section className="min-h-screen bg-white dark:bg-gray-900 text-foreground py-20 px-6 sm:px-10 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 pt-5"
      >
        {/* Profile Image with Social Icons */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex-shrink-0 relative"
        >
          <Image
            src="/Rakib.jpg"
            alt={aboutData.name}
            width={250}
            height={250}
            className="rounded-2xl object-cover shadow-lg hover:scale-105 transition-transform duration-500"
          />

          {/* Social Icons under the picture */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
            <a
              href={aboutData.contact.github}
              target="_blank"
              className="bg-white dark:bg-gray-800 p-2 rounded-full shadow hover:scale-110 transition-transform"
              style={{ color: primaryColor }}
            >
              <Github size={20} />
            </a>
            <a
              href={aboutData.contact.linkedin}
              target="_blank"
              className="bg-white dark:bg-gray-800 p-2 rounded-full shadow hover:scale-110 transition-transform"
              style={{ color: primaryColor }}
            >
              <Linkedin size={20} />
            </a>
            <a
              href={aboutData.contact.twitter}
              target="_blank"
              className="bg-white dark:bg-gray-800 p-2 rounded-full shadow hover:scale-110 transition-transform"
              style={{ color: primaryColor }}
            >
              <Twitter size={20} />
            </a>
          </div>
        </motion.div>

        {/* About Info */}
        <div className="flex-1 space-y-6">
          <motion.h1
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold mb-2"
            style={{ color: primaryColor }}
          >
            {aboutData.name}
          </motion.h1>

          <motion.h2
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-xl font-semibold mb-4"
            style={{ color: primaryColor }}
          >
            {aboutData.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-gray-700 dark:text-gray-300 leading-relaxed"
          >
            {aboutData.bio}
          </motion.p>

          {/* Skills */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            <h3 className="text-2xl font-semibold mb-3" style={{ color: primaryColor }}>
              Skills
            </h3>
            <div className="flex flex-wrap gap-3 mb-8">
              {aboutData.skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="px-4 py-2 rounded-full text-sm font-medium cursor-default transition"
                  style={{
                    backgroundColor: "rgba(224,94,87,0.1)",
                    color: primaryColor,
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Experience */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            <h3 className="text-2xl font-semibold mb-3" style={{ color: primaryColor }}>
              Experience
            </h3>
            <div className="space-y-5">
              {aboutData.experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-l-4 pl-4 py-2 rounded-md bg-gray-50 dark:bg-gray-800"
                  style={{ borderColor: primaryColor }}
                >
                  <h4 className="text-lg font-bold">{exp.role}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {exp.company} • {exp.period}
                  </p>
                  <p className="text-sm mt-1">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
