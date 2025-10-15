/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

export default function DashboardHomePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessionUser = async () => {
      const session = await getSession();
      if (session?.user) {
        setUser(session.user); // session থেকে সরাসরি user info
      }
      setLoading(false);
    };

    fetchSessionUser();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-[rgb(224,94,87)] font-semibold animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center mt-20 text-gray-500">
        <p>No session found. Please login.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto h-72 mt-20 p-6 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-md text-center">
      <img
        src={user.image || "/default-avatar.png"}
        alt={user.name}
        className="w-24 h-24 mx-auto rounded-full mb-4 border-2 border-[rgb(224,94,87)]"
      />
      <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
      <p className="text-gray-700 dark:text-gray-200 mb-1">
        <strong>Email:</strong> {user.email}
      </p>
      <p className="text-gray-700 dark:text-gray-200 mb-1">
        <strong>Role:</strong> {user.role || "User"}
      </p>
    </div>
  );
}
