/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center px-4 md:px-8 lg:px-12 transition-colors duration-700 min-h-screen">
        {/* Left Content */}
        <div className="w-full md:w-[48%] text-center md:text-left space-y-5 mt-10 md:mt-0">
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight"
          >
            Hi, I'm <span className="text-[rgb(224,94,87)]">Rayhan Rakib</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-200"
          >
            Full Stack Developer
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-lg"
          >
            I build modern, scalable and responsive web applications using{" "}
            <strong>React, Next.js, Node.js, Express & MongoDB.</strong>
            <br />I love turning ideas into interactive digital experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="flex flex-wrap justify-center md:justify-start gap-3 mt-5"
          >
            <Button className="px-6 py-2 rounded-full text-lg bg-[rgb(224,94,87)] hover:bg-[#e05c57] text-white shadow-md">
              View My Work <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <Button
              variant="outline"
              className="px-6 py-2 rounded-full text-lg border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              Contact Me
            </Button>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex justify-center md:justify-start gap-5 mt-5"
          >
            <a
              href="https://github.com/yourgithub"
              target="_blank"
              className="text-gray-700 dark:text-gray-300 hover:text-[rgb(224,94,87)] dark:hover:text-[rgb(224,94,87)] transition"
            >
              <Github size={28} />
            </a>
            <a
              href="https://linkedin.com/in/yourlinkedin"
              target="_blank"
              className="text-gray-700 dark:text-gray-300 hover:text-[rgb(224,94,87)] dark:hover:text-[rgb(224,94,87)] transition"
            >
              <Linkedin size={28} />
            </a>
          </motion.div>
        </div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="w-full md:w-[48%] flex justify-center mt-10 md:mt-0"
        >
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-88 md:h-88 rounded-full overflow-hidden shadow-2xl border-4 border-[rgb(224,94,87)]/40 dark:border-[rgb(224,94,87)]/30">
            <Image
              src="/your-photo.jpg"
              alt="Rayhan Rakib"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
