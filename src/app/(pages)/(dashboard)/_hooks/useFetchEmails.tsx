"use client";
import { useState, useEffect } from "react";
// Services
import { fetchEmails } from "../_services/emailServices";

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

    const getEmails = async () => {
      try {
        setLoading(true);
        const data = await fetchEmails(accessToken, userEmail);
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
  }, [accessToken, userEmail]);

  return { emails, loading, error };
};

export default useFetchEmails;
