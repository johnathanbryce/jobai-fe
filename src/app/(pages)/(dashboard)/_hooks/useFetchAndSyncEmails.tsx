"use client";
import { useState, useEffect } from "react";
// Services
import { fetchEmails, saveJobPostings } from "../_services/emailServices";

// exposes the Google OAuth accessToken via an API for consumption in backend
// fetches emails from users gmail account and sends to the backend
// this is NOT used to display to the UI - this handles sending emails from Gmail -> Postgres db
const useFetchAndSyncEmails = (
  accessToken: string | undefined,
  userEmail: string | null | undefined
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // TODO: consider replacing with Tanstack Query useQuery( )
  useEffect(() => {
    if (!accessToken || !userEmail) return; // Ensure userEmail is available

    const getEmails = async () => {
      try {
        setLoading(true);
        const data = await fetchEmails(accessToken, userEmail);
        console.log("fetched emails from gmail:", data);

        // Save fetched job postings to the backend
        if (Array.isArray(data) && data.length > 0) {
          const jobPostings = data.map((email) => ({
            title: email.subject,
            source: email.sender.includes("linkedin")
              ? "LinkedIn"
              : email.sender.includes("indeed")
              ? "Indeed"
              : "Unknown",
            gmail_message_id: email.id,
            fetched_at: new Date().toISOString(),
          }));

          await saveJobPostings(jobPostings, userEmail); // NOTE: userEmail instead of userId (userId is different in FE (OAuth ID) vs. what is auto-generated in postgres db)
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    getEmails();
  }, [accessToken, userEmail]); // Removed userId from dependencies

  return { loading, error };
};

export default useFetchAndSyncEmails;
