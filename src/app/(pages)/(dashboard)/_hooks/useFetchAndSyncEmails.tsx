"use client";
import { useState, useEffect } from "react";
// Services
import { fetchEmails, saveJobPostings } from "../_services/emailServices";
// Types
import { JobPosting } from "../_types/job-types";

/**
 * Custom hook for fetching emails from a user's Gmail account, extracting job postings,
 * and syncing them with a Postgres database in the backend. This hook does not provide
 * any UI functionality; it simply handles data ingestion from Gmail to the backend.
 *
 * @param {string | undefined} accessToken - The Google OAuth access token.
 * @param {string | null | undefined} userEmail - The user's email address.
 * @returns {{ loading: boolean, error: string | null }} - An object containing the loading state and any encountered error.
 */
const useFetchAndSyncEmails = (
  accessToken: string | undefined,
  userEmail: string | null | undefined
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!accessToken || !userEmail) return; // Ensure userEmail is available

    const getEmails = async () => {
      try {
        setLoading(true);
        const data = await fetchEmails(accessToken, userEmail);

        if (Array.isArray(data) && data.length > 0) {
          // Extract individual jobs from all emails
          const jobPostings = data.flatMap((email) =>
            Array.isArray(email.jobs)
              ? email.jobs.map((job: JobPosting) => ({
                  title: job.title || email.subject,
                  company_name: job.company_name || "N/A",
                  company_url: job.company_url || "",
                  company_logo_url: job.company_logo_url || "",
                  location: job.location || "N/A",
                  employment_type: job.employment_type || "",
                  job_type: job.job_type || "",
                  date_posted: job.date_posted || null,
                  application_deadline: job.application_deadline || null,
                  salary: job.salary || "",
                  benefits: job.benefits || "",
                  summary: job.summary || "",
                  experience_level: job.experience_level || "",
                  industries: job.industries || "",
                  skills: job.skills || [],
                  job_description_snippet: job.job_description_snippet || "",
                  status: job.status || "",
                  match_score: job.match_score || 0,
                  source:
                    job.source ||
                    (email.sender.includes("linkedin")
                      ? "LinkedIn"
                      : email.sender.includes("indeed")
                      ? "Indeed"
                      : "Unknown"),
                  gmail_message_id: email.id,
                  gmail_thread_id: job.gmail_thread_id || "",
                  job_url: job.job_url || "",
                  fetched_at: job.fetched_at || new Date().toISOString(),
                }))
              : []
          );

          // Filter out any job postings that are incomplete
          const validJobPostings = jobPostings.filter((job) => job.title);

          // Save the valid job postings to the backend
          if (validJobPostings.length > 0) {
            await saveJobPostings(validJobPostings, userEmail);
          }
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
