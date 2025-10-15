"use client";

import Link from "next/link";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t-2 border-[rgb(224,94,87)] dark:bg-gray-900 transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Brand Name */}
        <div className="flex justify-center text-[rgb(224,94,87)] text-2xl font-bold tracking-wide">
          Rayhan Rakib
        </div>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-md text-center text-gray-600 dark:text-gray-400 leading-relaxed">
          I’m a passionate Web Developer who loves crafting beautiful,
          functional, and modern web applications using Next.js and TypeScript.
        </p>

        {/* Navigation Links */}
        <ul className="mt-10 flex flex-wrap justify-center gap-6 text-gray-700 dark:text-gray-300 text-sm md:gap-8">
          <li>
            <Link
              href="/about"
              className="transition hover:text-[rgb(224,94,87)]"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/projects"
              className="transition hover:text-[rgb(224,94,87)]"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              href="/skills"
              className="transition hover:text-[rgb(224,94,87)]"
            >
              Skills
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="transition hover:text-[rgb(224,94,87)]"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="transition hover:text-[rgb(224,94,87)]"
            >
              Blog
            </Link>
          </li>
        </ul>

        {/* Social Icons */}
        <div className="mt-10 flex justify-center gap-6 text-gray-700 dark:text-gray-300">
          <Link
            href="https://github.com/"
            target="_blank"
            aria-label="GitHub"
            className="hover:text-[rgb(224,94,87)] transition"
          >
            <FaGithub className="h-5 w-5" />
          </Link>

          <Link
            href="https://linkedin.com/"
            target="_blank"
            aria-label="LinkedIn"
            className="hover:text-[rgb(224,94,87)] transition"
          >
            <FaLinkedin className="h-5 w-5" />
          </Link>

          <Link
            href="https://facebook.com/"
            target="_blank"
            aria-label="Facebook"
            className="hover:text-[rgb(224,94,87)] transition"
          >
            <FaFacebook className="h-5 w-5" />
          </Link>
        </div>

        {/* Copyright */}
        <p className="mt-10 text-center text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} <span className="text-[rgb(224,94,87)] font-semibold">Rayhan Rakib</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
