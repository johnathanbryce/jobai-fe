import * as React from "react";
import { render, screen } from "@testing-library/react";
import JobPostingList from "@/app/(pages)/(dashboard)/_components/JobPostings/JobPostingList";
import { JobPosting } from "@/app/(pages)/(dashboard)/_types/job-types";
import "@testing-library/jest-dom";

const dummyJobs: JobPosting[] = [
  {
    job_uuid: "job-1",
    title: "Software Engineer",
    company_name: "Example Corp",
    gmail_message_id: "msg-1",
    source: "LinkedIn",
    job_url: "http://example.com/job1",
    experience_level: "Junior",
    location: "Remote",
    salary: "$80k",
    job_description_snippet: "Exciting role for new engineers.",
    job_type: "Full-time",
  },
  {
    job_uuid: "job-2",
    title: "Senior Developer",
    company_name: "Another Corp",
    gmail_message_id: "msg-2",
    source: "Indeed",
    job_url: "http://example.com/job2",
    experience_level: "Senior",
    location: "Onsite",
    salary: "$120k",
    job_description_snippet: "Great opportunity to lead projects.",
    job_type: "Full-time",
  },
];

describe("JobPostingList", () => {
  it("renders a loading message when there are no jobs", () => {
    render(<JobPostingList jobs={[]} />);
    expect(screen.getByText(/loading jobs/i)).toBeInTheDocument();
  });

  it("renders a JobPostingCard for each job", () => {
    render(<JobPostingList jobs={dummyJobs} />);

    dummyJobs.forEach((job) => {
      expect(screen.getByText(job.title)).toBeInTheDocument();
    });
  });
});
