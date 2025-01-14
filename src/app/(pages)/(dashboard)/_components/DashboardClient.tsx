"use client";
import React from "react";
import { signOut } from "next-auth/react";
// Types
import { AuthUser } from "@/app/types/user";

export interface DashboardClientProps {
  user: AuthUser;
}

export default function DashboardClient({ user }: DashboardClientProps) {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.name}</p>
      <button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>
    </div>
  );
}
