import React from "react";
import { Job } from "../_types/job-types";
import { deleteJobPosting } from "../_services/emailServices";

interface JobListProps {
  jobs: Job[];
}

const JobList = ({ jobs }: JobListProps) => {
  if (!jobs || !jobs.length) {
    return <div>Loading jobs...</div>;
  }
  return (
    <div>
      {jobs.map((email: Job) => (
        <div key={email.gmail_message_id}>
          <h3>{email.title}</h3>
          <p>{email.fetched_at}</p>
          <small>From: {email.source}</small>
          <button onClick={() => deleteJobPosting(email.gmail_message_id)}>delete job</button>
        </div>
      ))}
    </div>
  );
};

export default JobList;
