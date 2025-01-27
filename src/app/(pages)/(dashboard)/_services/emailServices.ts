export const fetchEmails = async (accessToken: string, userEmail: string) => {
  //TODO: update URL to .env route
  const res = await fetch("http://localhost:8000/api/gmail/fetch-emails/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ email: userEmail }),
  });

  console.log("response from fetchEmails", res);

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }

  return res.json();
};

// _services/emailServices.ts

export const saveJobPostings = async (
  jobPostings: unknown[],
  userEmail: string | null | undefined
) => {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

    const res = await fetch(`${API_BASE_URL}/api/job-postings/save-job-postings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_email: userEmail, // NOTE: using user email instead of user id as this is auto-generated for us via postgres
        job_postings: jobPostings,
      }),
    });

    console.log("response from saveJobPostings", res);

    if (!res.ok) {
      // Attempt to parse JSON error response
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
