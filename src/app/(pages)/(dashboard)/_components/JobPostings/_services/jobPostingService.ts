export const saveJobPosting = (jobUuid: string) => {
  console.log(jobUuid);
  // TODO: save this to a list of users saved job postings and store in db
  // NOTE: will likely need to create a new table in Postgres with a relationship between saved jobs and the userId
};

export const deleteJobPosting = async (jobUuid: string /* , accessToken: string */) => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
  const response = await fetch(`${API_BASE_URL}/api/job-postings/delete-job-posting/${jobUuid}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      /* Authorization: `Bearer ${accessToken}`, */
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to delete job posting");
  }

  const data = await response.json();
  return data;
};
