import { useState, useEffect } from "react";
import { getJobPostings } from "../_services/emailServices";
import { JobPosting } from "../_types/job-types";

const useFetchJobPostings = (
  accessToken: string | undefined,
  userEmail: string | null | undefined
) => {
  const [jobPostings, setJobPostings] = useState<JobPosting[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!accessToken || !userEmail) return;

    const fetchPostings = async () => {
      try {
        setLoading(true);
        const data = await getJobPostings(accessToken, userEmail);
        console.log("data from fetchPostings", data);
        setJobPostings(data);
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

    fetchPostings();
  }, [accessToken, userEmail]);

  return { jobPostings, loading, error };
};

export default useFetchJobPostings;
