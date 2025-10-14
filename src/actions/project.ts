"use server";

import { getUserSession } from "@/helpers/getUserSession";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const createProjects = async (data: FormData) => {
  const session = await getUserSession();

  const projectInfo = Object.fromEntries(data.entries());

  const modifiedData = {
    ...projectInfo,
    features: projectInfo.features
      ?.toString()
      .split(",")
      .map((f) => f.trim()),
    technologies: projectInfo.technologies
      ?.toString()
      .split(",")
      .map((t) => t.trim()),
    authorId: session?.user?.id,
    isFeatured: Boolean(projectInfo.isFeatured),
    status: projectInfo.status || "in-progress",
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(modifiedData),
  });

  // 🔥 Handle response safely
  let result;
  try {
    result = await res.json();
  } catch (err) {
    console.error("Invalid JSON from backend:", err);
    throw new Error("Failed to parse backend response");
  }

  // ✅ Success
  if (result?.id) {
    revalidateTag("PROJECTS");
    revalidatePath("/projects");
    redirect("/projects");
  }

  return result;
};
