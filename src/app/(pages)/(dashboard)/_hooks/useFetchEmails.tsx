// _hooks/useFetchEmails.tsx

"use client";
import { useState, useEffect } from "react";
// Services
import { fetchEmails, saveJobPostings } from "../_services/emailServices";
// Types
import { Email } from "../_types/email-types";

// exposes the Google OAuth accessToken via an API for consumption in backend
const useFetchEmails = (accessToken: string | undefined, userEmail: string | null | undefined) => {
  const [emails, setEmails] = useState<Email[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // TODO: consider replacing with Tanstack Query useQuery( )
  useEffect(() => {
    if (!accessToken || !userEmail) return; // Ensure userEmail is available

    const getEmails = async () => {
      try {
        setLoading(true);
        const data = await fetchEmails(accessToken, userEmail);
        console.log("Fetched data:", data);

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

          await saveJobPostings(jobPostings, userEmail); // Pass userEmail instead of userId
        }
        setEmails(data);
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

  return { emails, loading, error };
};

export default useFetchEmails;
