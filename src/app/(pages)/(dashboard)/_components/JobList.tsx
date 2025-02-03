import React from "react";
import { JobPosting } from "../_types/job-types";
import { deleteJobPosting } from "../_services/emailServices";

interface JobListProps {
  jobs: JobPosting[];
}

const JobList = ({ jobs }: JobListProps) => {
  if (!jobs || !jobs.length) {
    return <div>Loading jobs...</div>;
  }
  return (
    <div>
      {jobs.map((job: JobPosting) => (
        <div key={job.job_uuid}>
          <h3>
            <a href={job.job_url} target="_blank">
              {job.title}
            </a>
          </h3>
          <p> Experience Level: {job.experience_level}</p>
          <p> {job.company_name}</p>
          <p> job fetcehd at: {job.fetched_at}</p>
          <p> {job.location}</p>
          <p> annual salary: {job.salary}</p>
          <small>Source: {job.source}</small>
          <button onClick={() => deleteJobPosting(job.job_uuid)}>delete job</button>
        </div>
      ))}
    </div>
  );
};

export default JobList;
