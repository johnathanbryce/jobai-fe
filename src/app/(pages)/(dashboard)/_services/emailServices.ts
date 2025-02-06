import { JobPosting } from "../_types/job-types";

/**
 * The initial fetch of recent job-posting emails from a users Gmail directly.
 * @param accessToken - The OAuth access token for authentication.
 * @param userEmail - The email of the user whose job postings are to be fetched.
 *
 * Sends email data to our Django backend to handle and save in our Postgres db
 */
export const fetchEmails = async (accessToken: string, userEmail: string) => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
  const res = await fetch(`${API_BASE_URL}/api/gmail/fetch-emails/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ email: userEmail }),
  });

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }

  return res.json();
};

/**
 * Fetch active (non-deleted) job postings for a user from the backend.
 * @param accessToken - The OAuth access token for authentication.
 * @param userEmail - The email of the user whose job postings are to be fetched.
 * @returns A promise that resolves to an array of JobPostings.
 */
export const getJobPostings = async (
  accessToken: string | undefined,
  userEmail: string | null | undefined
): Promise<JobPosting[]> => {
  if (!accessToken || !userEmail) {
    throw new Error("Missing access token or user email");
  }

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

  const url = new URL(`${API_BASE_URL}/api/job-postings/`);
  url.searchParams.append("user_email", userEmail);

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch job postings");
  }

  const data = await response.json();

  // Validate and parse the response
  if (!data.job_postings || !Array.isArray(data.job_postings)) {
    throw new Error("Invalid data format received from server");
  }

  return data.job_postings as JobPosting[];
};

/**
 * Saves an array of job postings to the backend for the specified user.
 *
 * @param jobPostings - An array containing job posting data.
 * @param userEmail - The user's email address.
 * @returns A promise that resolves when the save operation completes.
 *
 */
export const saveJobPostingsFromEmails = async (
  jobPostings: unknown[],
  userEmail: string | null | undefined
) => {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

    const res = await fetch(`${API_BASE_URL}/api/job-postings/save-job-postings/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_email: userEmail, // NOTE: using user email instead of user id as this user_id auto-generated for us via postgres and thus not the same as oauth id we originally have access to
        job_postings: jobPostings,
      }),
    });

    if (!res.ok) {
      try {
        const errorData = await res.json();
        console.error("Error saving job postings:", errorData.error);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        console.error("Error saving job postings: Unable to parse error response");
      }
    } else {
      console.log("Job postings saved successfully!");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
