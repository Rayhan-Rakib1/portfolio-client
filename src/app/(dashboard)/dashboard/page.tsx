import { authOptions } from "@/helpers/authOptions";
import { getServerSession } from "next-auth";

const DashboardHomePage = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div>
      <h1>Name: {session?.user?.id}</h1>
      <h1>Name: {session?.user?.name}</h1>
      <h1>Name: {session?.user?.email}</h1>
      <h1>Name: {session?.user?.image}</h1>
    </div>
  );
};

export default DashboardHomePage;
