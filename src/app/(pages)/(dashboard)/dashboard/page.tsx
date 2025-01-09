"use client";
import React from "react";

// TESTING:
import { signOut, useSession } from "next-auth/react";

const DashboardPage = () => {
  const { data: session } = useSession();
  return (
    <div>
      Dashboard
      {session?.user?.name}
      <button onClick={() => signOut({ callbackUrl: "/" })}> sign out </button>
    </div>
  );
};

export default DashboardPage;
