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

  console.log("Session Info:", session);

  // TODO:
  /*

    1. Create API Route (Next.js): Handle sending the token to Django.
    2. Test Token Transfer: Confirm Django receives the token.
    3. Refactor: Move the API call logic to a utils folder for cleaner code.
    4. Django Backend: Set up routes to handle and store the token securely.

  */

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
