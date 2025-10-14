"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const educationData = [
  {
    title: "B.Tech in Computer Science and Engineering",
    subtitle: "Computer Engineer",
    institute: "XYZ University",
    duration: "Sept. 2020 - June 2024",
  },
  { title: "Class XII", institute: "RPS Public School", duration: "2020" },
  { title: "Class X", institute: "RPS Public School", duration: "2018" },
];

const workData = [
  { title: "Frontend Developer", institute: "ABC Company", duration: "2024 - Present" },
  { title: "Freelancing", institute: "Online Sites", duration: "Jan. 2022" },
  { title: "Problem Solving", institute: "Online Sites", duration: "Jan. 2021" },
  { title: "Backend Developer", institute: "DEF Company", duration: "2023 - Present" },
  { title: "Problem Solving Advanced", institute: "LeetCode/HackerRank", duration: "2022 - Present" },
];

const QualificationTimeline = () => {
  const [activeTab, setActiveTab] = useState<"education" | "work">("education");
  const data = activeTab === "education" ? educationData : workData;
  const isEducation = activeTab === "education";

  return (
    <section className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-20 px-6 sm:px-10 lg:px-20">
      <div className="max-w-5xl mx-auto flex flex-col items-center relative">
        <motion.h2
          className="text-4xl font-bold  mb-10"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Qualification Timeline
        </motion.h2>

        {/* Tabs */}
        <div className="flex gap-4 mb-10">
          {["education", "work"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as "education" | "work")}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab
                  ? "bg-[rgb(224,94,87)] text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              }`}
            >
              {tab === "education" ? "Education" : "Work"}
            </button>
          ))}
        </div>

        {/* Timeline Container */}
        <div className="relative w-full mt-10">
          {/* Vertical center line */}
          <div className="absolute left-1/2 top-0 w-1 bg-gray-300 dark:bg-gray-700 h-full -translate-x-1/2"></div>

          {data.map((item, idx) => (
            <motion.div
              key={idx}
              className="relative w-full flex items-start mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
            >
              {/* Left Side */}
              {isEducation && (
                <div className="w-1/2 pr-8 text-right">
                  <div className="inline-block bg-[rgb(224,94,87)] text-white px-4 py-2 rounded-md shadow-md">
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="text-sm">{item.institute}</p>
                    <p className="text-xs">{item.duration}</p>
                  </div>
                </div>
              )}

              {/* Center Dot */}
              <div className="absolute left-1/2 w-4 h-4 bg-[rgb(224,94,87)] rounded-full -translate-x-1/2"></div>

              {/* Right Side */}
              {!isEducation && (
                <div className="w-1/2 pl-8 text-left ml-auto">
                  <div className="inline-block bg-[rgb(224,94,87)] text-white px-4 py-2 rounded-md shadow-md">
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="text-sm">{item.institute}</p>
                    <p className="text-xs">{item.duration}</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QualificationTimeline;
