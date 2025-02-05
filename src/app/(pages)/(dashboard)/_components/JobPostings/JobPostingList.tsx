import React from "react";
import JobPostingCard from "./JobPostingCard";
import { JobPosting } from "../../_types/job-types";
// MUI
import Grid from "@mui/material/Grid2";

interface JobListProps {
  jobs: JobPosting[];
}

const JobPostingList = ({ jobs }: JobListProps) => {
  if (!jobs || !jobs.length) {
    return <div>Loading jobs...</div>;
  }
  return (
    <Grid container rowSpacing={2.5}>
      {jobs.map((job: JobPosting) => (
        <React.Fragment key={job.job_uuid}>
          <JobPostingCard
            id={job.job_uuid}
            title={job.title}
            url={job.job_url}
            experienceLevel={job.experience_level}
            location={job.location}
            salary={job.salary}
            jobDescriptionSnippet={job.job_description_snippet}
            jobType={job.job_type}
          />
        </React.Fragment>
      ))}
    </Grid>
  );
};

export default JobPostingList;
