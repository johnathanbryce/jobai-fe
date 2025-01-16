"use client";
import { useEffect } from "react";
import { signOut } from "next-auth/react";
// Types
import { AuthUser } from "@/app/types/user";

export interface DashboardClientProps {
  user: AuthUser;
  accessToken: string;
}

export default function DashboardClient({ user, accessToken }: DashboardClientProps) {
  console.log("user", user);
  console.log("accessToken", accessToken);

  // TODO:
  // 1. create API route
  // 2. test that this sends the accessToken to Django via this API route
  // 3. move this useEffect and/or sendAccessTokenToBackend to utils folder
  useEffect(() => {
    const sendAccessTokenToBackend = async () => {
      if (!accessToken) {
        console.error("No access token found.");
        return;
      }

      // Send the accessToken to Django backend
      const res = await fetch("http://localhost:8000/api/fetch-emails/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Pass the token in the header
        },
        body: JSON.stringify({ email: user.email }),
      });

      const data = await res.json();
      console.log("Emails from Django:", data);
    };

    sendAccessTokenToBackend();
  }, [accessToken]);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.name}</p>
      <button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>
    </div>
  );
}
