"use client";
import { signOut } from "next-auth/react";
// Hooks
import useFetchAndSyncEmails from "../_hooks/useFetchAndSyncEmails";
import useSyncOAuthUser from "../_hooks/useSyncOAuthUser";
import useFetchJobPostings from "../_hooks/useFetchJobPostings";
// Types
import { AuthUser } from "@/app/types/user";
// Components
import JobPostingList from "./JobPostings/JobPostingList";
// MUI
import Box from "@mui/material/Box";

export interface DashboardClientProps {
  user: AuthUser;
  accessToken: string | undefined;
}

export default function DashboardClient({ user, accessToken }: DashboardClientProps) {
  useSyncOAuthUser(user, accessToken);
  // Fetch and save emails to database
  const { loading: emailsLoading, error: emailsError } = useFetchAndSyncEmails(
    accessToken,
    user.email
  );
  // Fetch job postings from backend that are not soft-deleted
  const {
    jobPostings,
    loading: postingsLoading,
    error: postingsError,
  } = useFetchJobPostings(accessToken, user.email);

  if (emailsLoading || postingsLoading) {
    return <div>Loading...</div>;
  }

  if (emailsError) {
    return <div>Error fetching emails: {emailsError}</div>;
  }

  if (postingsError) {
    return <div>Error fetching job postings: {postingsError}</div>;
  }

  if (!jobPostings || !Array.isArray(jobPostings) || jobPostings.length === 0) {
    return (
      <div>
        No job postings found...
        <button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>
      </div>
    );
  }

  return (
    <Box mt={10}>
      {postingsLoading && <p>Loading job postings...</p>}
      {postingsError && <p>Error fetching job postings: {postingsError}</p>}
      <JobPostingList jobs={jobPostings} />
    </Box>
  );
}
