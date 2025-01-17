"use client";
import { signOut } from "next-auth/react";
// Hooks
import useFetchEmails from "../_hooks/useFetchEmails";
// Types
import { AuthUser } from "@/app/types/user";

export interface DashboardClientProps {
  user: AuthUser;
  accessToken: string | undefined;
}

export default function DashboardClient({ user, accessToken }: DashboardClientProps) {
  console.log("user", user);
  console.log("accessToken", accessToken);

  const { emails, loading, error } = useFetchEmails(accessToken, user.email);
  console.log("emails", emails);
  console.log("loading", loading);
  console.log("error", error);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.name}</p>
      <button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>
    </div>
  );
}
