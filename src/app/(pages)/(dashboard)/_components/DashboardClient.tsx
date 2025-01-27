"use client";
import { signOut } from "next-auth/react";
// Hooks
import useFetchEmails from "../_hooks/useFetchEmails";
import useSyncOAuthUser from "../_hooks/useSyncOAuthUser";
// Types
import { AuthUser } from "@/app/types/user";
// Components
import EmailList from "./EmailList";

export interface DashboardClientProps {
  user: AuthUser;
  accessToken: string | undefined;
}

export default function DashboardClient({ user, accessToken }: DashboardClientProps) {
  useSyncOAuthUser(user, accessToken);
  const { emails, loading, error } = useFetchEmails(accessToken, user.email);
  console.log("emails", emails);

  if (loading) {
    return <div>Loading emails...</div>;
  }

  if (error) {
    return <div>Error fetching emails: {error}</div>;
  }

  if (!emails || !Array.isArray(emails)) {
    return (
      <div>
        No emails found...
        <button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.name}</p>
      <button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>

      <div>
        {loading && <p>Loading emails...</p>}
        {error && <p>Error fetching emails: {error}</p>}
        <EmailList emails={emails} />
      </div>
    </div>
  );
}
