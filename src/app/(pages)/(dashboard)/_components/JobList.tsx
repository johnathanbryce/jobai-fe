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
      {jobs.map((job: Job) => (
        <div key={job.gmail_message_id}>
          <h3>{job.title}</h3>
          <p>{job.fetched_at}</p>
          <small>From: {job.source}</small>
          <button onClick={() => deleteJobPosting(job.gmail_message_id)}>delete job</button>
        </div>
      ))}
    </div>
  );
};

export default JobList;
