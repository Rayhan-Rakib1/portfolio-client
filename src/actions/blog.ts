"use server";

import { getUserSession } from "@/helpers/getUserSession";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const blogCreate = async (data: FormData) => {
  const session = await getUserSession();
  const blogInfo = Object.fromEntries(data.entries());
  const modifiedData = {
    ...blogInfo,
    tags: blogInfo.tags
      .toString()
      .split(",")
      .map((tag) => tag.trim()),
    authorId: session?.user?.id,
    isFeatured: Boolean(blogInfo.isFeatured),
    published: blogInfo.published === "on" ,
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(modifiedData),
  });

  const result = await res.json();

  if (result?.id) {
    revalidateTag("BLOGS");
    revalidatePath("/blogs");
    redirect("/");
  }
  return result;
};
