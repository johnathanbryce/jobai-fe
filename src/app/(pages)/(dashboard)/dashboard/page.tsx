import { redirect } from "next/navigation";
// Auth
import { getServerSession } from "next-auth";
// Components
import DashboardClient from "../_components/DashboardClient";

const DashboardPage = async () => {
  const session = await getServerSession();

  if (!session || !session.user) redirect("/");

  return (
    <div>
      {session.user ? <DashboardClient user={session.user} /> : <p>Error, user undefined.</p>}
    </div>
  );
};

export default DashboardPage;
