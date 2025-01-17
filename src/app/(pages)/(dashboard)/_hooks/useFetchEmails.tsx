"use client";
import { useState, useEffect } from "react";

interface Emails {
  subject: string;
  body: string;
}

// exposes the Google OAuth accessToken via an API for consumption in backend
const useFetchEmails = (accessToken: string | undefined, userEmail: string | null | undefined) => {
  const [emails, setEmails] = useState<Emails[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // TODO: consider replacing with Tanstack Query useQuery( )
  useEffect(() => {
    if (!accessToken || !userEmail) return;

    const fetchEmails = async () => {
      try {
        setLoading(true);

        const res = await fetch("http://localhost:8000/api/gmail/fetch-emails/", {
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

        const data = await res.json();
        setEmails(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
          console.error("Error fetching emails:", err);
        } else {
          setError("Unknown error occurred.");
          console.error("Unknown error fetching emails:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, [accessToken, userEmail]);

  return { emails, loading, error };
};

export default useFetchEmails;
