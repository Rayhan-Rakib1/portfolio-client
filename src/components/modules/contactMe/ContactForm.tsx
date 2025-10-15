"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ContactForm() {
  const primaryColor = "rgb(224, 94, 87)";
  const [loading, setLoading] = useState(false);
   const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const contactData = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/contactMe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contactData),
        }
      );

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message || "Failed to send message!");
      }

      toast.success("✅ Message sent successfully!");
      (e.target as HTMLFormElement).reset();
      router.push('/')
    } catch (error) {
      console.error("Failed to send contact:", error);
      toast.error("❌ Failed to send message!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-lg mx-auto mt-10 p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border dark:border-gray-700"
    >
      <h2
        className="text-2xl font-bold text-center mb-6"
        style={{ color: primaryColor }}
      >
        Contact Us 💌
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Name
          </label>
          <input
            name="name"
            required
            type="text"
            className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:text-white focus:outline-none"
            style={{ borderColor: primaryColor }}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            name="email"
            required
            type="email"
            className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:text-white focus:outline-none"
            style={{ borderColor: primaryColor }}
          />
        </div>

        {/* Subject */}
        <div>
          <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Subject
          </label>
          <input
            name="subject"
            type="text"
            className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:text-white focus:outline-none"
            style={{ borderColor: primaryColor }}
            placeholder="(optional)"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Message
          </label>
          <textarea
            name="message"
            required
            rows={4}
            className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:text-white focus:outline-none"
            style={{ borderColor: primaryColor }}
          ></textarea>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full py-2.5 text-white font-semibold rounded-lg transition-all"
          style={{
            backgroundColor: primaryColor,
            opacity: loading ? 0.8 : 1,
          }}
        >
          {loading ? "Sending..." : "Send Message"}
        </motion.button>
      </form>
    </motion.div>
  );
}
