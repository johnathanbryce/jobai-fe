import * as React from "react";
import { render, screen } from "@testing-library/react";
import JobPostingCard from "@/app/(pages)/(dashboard)/_components/JobPostings/JobPostingCard";
import "@testing-library/jest-dom";

describe("JobPostingCard", () => {
  it("renders the job posting details correctly", () => {
    const dummyProps = {
      id: "job-1",
      title: "Software Engineer",
      url: "http://example.com/job",
      experienceLevel: "Junior",
      location: "In Person",
      salary: "$80,000 - $100,000",
      jobDescriptionSnippet: "Exciting role for new engineers.",
      jobType: "Full-time",
    };

    render(<JobPostingCard {...dummyProps} />);

    expect(screen.getByText("Software Engineer")).toBeInTheDocument();

    const jobLink = screen.getByRole("link", { name: /Software Engineer/i });
    expect(jobLink).toHaveAttribute("href", "http://example.com/job");

    expect(screen.getByText(/In Person/i)).toBeInTheDocument();
    expect(screen.getByText(/\$80,\s*000\s*-\s*\$100,\s*000/i)).toBeInTheDocument();
    expect(screen.getByText("Exciting role for new engineers.")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /analyze/i })).toBeInTheDocument();
  });
});
