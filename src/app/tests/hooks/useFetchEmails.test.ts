import { renderHook, waitFor } from "@testing-library/react";
import useFetchAndSyncEmails from "@/app/(pages)/(dashboard)/_hooks/useFetchAndSyncEmails";
import {
  fetchEmails,
  saveJobPostingsFromEmails,
} from "@/app/(pages)/(dashboard)/_services/emailServices";

jest.mock("@/app/(pages)/(dashboard)/_services/emailServices", () => ({
  fetchEmails: jest.fn(),
  saveJobPostingsFromEmails: jest.fn(),
}));

beforeAll(() => {
  process.env.NEXT_PUBLIC_API_BASE_URL = "http://localhost:8000";
});

describe("useFetchAndSyncEmails Hook", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully sync emails with job postings to the backend", async () => {
    // Mock fetchEmails to return emails that each have a jobs array
    const mockEmails = [
      {
        id: "1",
        subject: "New Job Opportunity",
        sender: "linkedin@linkedin.com",
        jobs: [
          {
            title: "Software Engineer",
            company_name: "LinkedIn Inc",
            location: "Remote",
            job_url: "https://www.linkedin.com/jobs/view/123",
            fetched_at: "2023-01-01T00:00:00.000Z", // example
          },
        ],
      },
      {
        id: "2",
        subject: "Job Update",
        sender: "indeed@indeed.com",
        jobs: [
          {
            // intentionally leaving out title to test fallback to email.subject
            company_name: "",
            skills: ["JavaScript", "React"],
          },
        ],
      },
    ];

    (fetchEmails as jest.Mock).mockResolvedValue(mockEmails);
    (saveJobPostingsFromEmails as jest.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useFetchAndSyncEmails("fake-token", "test@example.com"));

    // Initially, loading is true
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();

    // Wait for the hook to finish
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBeNull();

    // Verify fetchEmails called with correct params
    expect(fetchEmails).toHaveBeenCalledWith("fake-token", "test@example.com");

    // Prepare the expected job postings
    const expectedJobPostings = [
      {
        title: "Software Engineer",
        company_name: "LinkedIn Inc",
        company_url: "",
        company_logo_url: "",
        location: "Remote",
        employment_type: "",
        job_type: "",
        date_posted: null,
        application_deadline: null,
        salary: "",
        benefits: "",
        summary: "",
        experience_level: "",
        industries: "",
        skills: [],
        job_description_snippet: "",
        status: "",
        match_score: 0,
        source: "LinkedIn",
        gmail_message_id: "1",
        gmail_thread_id: "",
        job_url: "https://www.linkedin.com/jobs/view/123",
        fetched_at: "2023-01-01T00:00:00.000Z",
      },
      {
        // Fallback to email subject because job.title is missing
        title: "Job Update",
        company_name: "N/A", // fallback
        company_url: "",
        company_logo_url: "",
        location: "N/A", // fallback
        employment_type: "",
        job_type: "",
        date_posted: null,
        application_deadline: null,
        salary: "",
        benefits: "",
        summary: "",
        experience_level: "",
        industries: "",
        skills: ["JavaScript", "React"], // from job.skills
        job_description_snippet: "",
        status: "",
        match_score: 0,
        source: "Indeed", // because sender included 'indeed'
        gmail_message_id: "2",
        gmail_thread_id: "",
        job_url: "",
        // If your code uses new Date().toISOString() when not provided, just verify it's a string:
        fetched_at: expect.any(String),
      },
    ];

    // Check that the postings were saved correctly
    expect(saveJobPostingsFromEmails).toHaveBeenCalledWith(expectedJobPostings, "test@example.com");
  });

  it("should handle fetchEmails failure", async () => {
    (fetchEmails as jest.Mock).mockRejectedValue(new Error("Failed to fetch emails"));

    const { result } = renderHook(() => useFetchAndSyncEmails("fake-token", "test@example.com"));

    // Initially, loading should be true
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();

    // Wait for the hook to finish
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Ensure error is set
    expect(result.current.error).toBe("Failed to fetch emails");

    // fetchEmails should have been called
    expect(fetchEmails).toHaveBeenCalledWith("fake-token", "test@example.com");

    // saveJobPostings should not be called on fetch error
    expect(saveJobPostingsFromEmails).not.toHaveBeenCalled();
  });

  it("should handle saveJobPostings failure", async () => {
    const mockEmails = [
      {
        id: "1",
        subject: "New Job Opportunity",
        sender: "linkedin@linkedin.com",
        jobs: [{ title: "DevOps Engineer" }],
      },
    ];
    (fetchEmails as jest.Mock).mockResolvedValue(mockEmails);
    (saveJobPostingsFromEmails as jest.Mock).mockRejectedValue(
      new Error("Failed to save job postings")
    );

    const { result } = renderHook(() => useFetchAndSyncEmails("fake-token", "test@example.com"));

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Failed to save job postings");

    // fetchEmails should have been called
    expect(fetchEmails).toHaveBeenCalledWith("fake-token", "test@example.com");

    // saveJobPostings should have been called but throws
    expect(saveJobPostingsFromEmails).toHaveBeenCalled();
  });
});
