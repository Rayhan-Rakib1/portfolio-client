"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-20 px-6 sm:px-10 lg:px-20 flex flex-col items-center">


          <motion.h2
            className="text-4xl font-bold text-center md:text-left mb-9"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            About Me
          </motion.h2>

      


      <motion.div
        className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Left: Animated Rectangular Image */}
        <motion.div
          className="flex justify-center md:justify-start"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="relative w-full max-w-sm h-80 md:h-96 rounded-lg overflow-hidden shadow-2xl">
            <Image
              src="/rayhan.png"
              alt="Rayhan Rakib"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Right: About Info */}
        <motion.div
          className="flex flex-col justify-center space-y-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {/* About Me Heading */}
          <motion.h3
            className="text-2xl font-semibold text-[rgb(224,94,87)]"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            My Introduction
          </motion.h3>

          <motion.p
            className="text-gray-700 dark:text-gray-300 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Web developer and coder, with an extensive knowledge and experience,
            working in web design and problem solving.
          </motion.p>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-4 text-center"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.2 } },
            }}
          >
            {[
              { value: "2+", label: "Years experience" },
              { value: "20+", label: "Completed projects" },
              { value: "70+", label: "Solved questions" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                }}
              >
                <h4 className="text-3xl font-bold text-[rgb(224,94,87)]">
                  {stat.value}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Download CV */}
          <motion.a
            href="/files/Rayhan_Rakib_CV.pdf"
            download
            className="inline-block mt-4 w-full md:w-auto px-6 py-3 bg-[rgb(224,94,87)] text-white font-semibold rounded-lg shadow-md text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download CV
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
