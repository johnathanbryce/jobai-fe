"use client";
import { signOut } from "next-auth/react";
// Hooks
import useFetchEmails from "../_hooks/useFetchEmails";
import useSyncOAuthUser from "../_hooks/useSyncOAuthUser";
// Types
import { AuthUser } from "@/app/types/user";

export interface DashboardClientProps {
  user: AuthUser;
  accessToken: string | undefined;
}

export default function DashboardClient({ user, accessToken }: DashboardClientProps) {
  useSyncOAuthUser(user, accessToken);
  const { emails, loading, error } = useFetchEmails(accessToken, user.email);
  console.log("emails", emails);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.name}</p>
      <button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>

      <div>
        {loading && <p>Loading emails...</p>}
        {error && <p>Error fetching emails: {error}</p>}
        {emails && emails.map((email, index) => <p key={index}>{email.subject}</p>)}
      </div>
    </div>
  );
}
