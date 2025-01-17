import { redirect } from "next/navigation";
// Auth
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // pass authOptions to getServerSession to ensure callbacks are being used
// Components
import DashboardClient from "../_components/DashboardClient";

const DashboardPage = async () => {
  // fetch the session, including the accessToken (from authOptions)
  const session = await getServerSession(authOptions);

  if (!session || !session.user) redirect("/");

  return (
    <div>
      {session.user ? (
        <DashboardClient user={session.user} accessToken={session.accessToken} />
      ) : (
        <p>Error, user undefined.</p>
      )}
    </div>
  );
};

export default DashboardPage;
