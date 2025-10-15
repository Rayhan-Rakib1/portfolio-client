export const getProjectById = async (projectsId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/${projectsId}`);
  return await res.json();
};
