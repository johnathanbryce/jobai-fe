import { renderHook, waitFor } from "@testing-library/react";
import useFetchAndSyncEmails from "@/app/(pages)/(dashboard)/_hooks/useFetchAndSyncEmails";
import { fetchEmails, saveJobPostings } from "@/app/(pages)/(dashboard)/_services/emailServices";

// Mock fetchEmails and saveJobPostings
jest.mock("@/app/(pages)/(dashboard)/_services/emailServices", () => ({
  fetchEmails: jest.fn(),
  saveJobPostings: jest.fn(),
}));

// Mock API base URL
beforeAll(() => {
  process.env.NEXT_PUBLIC_API_BASE_URL = "http://localhost:8000";
});

describe("useFetchAndSyncEmails Hook", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully sync emails to the backend", async () => {
    // Mock fetchEmails to return expected data
    const mockEmails = [
      { id: "1", subject: "New Job Opportunity", sender: "linkedin@linkedin.com" },
      { id: "2", subject: "Job Update", sender: "indeed@indeed.com" },
    ];
    (fetchEmails as jest.Mock).mockResolvedValue(mockEmails);

    // Mock saveJobPostings to resolve successfully
    (saveJobPostings as jest.Mock).mockResolvedValue(undefined);

    // Render the hook
    const { result } = renderHook(() => useFetchAndSyncEmails("fake-token", "test@example.com"));

    // Initially, loading should be true
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();

    // Wait for the hook to finish syncing
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Ensure no errors occurred
    expect(result.current.error).toBeNull();

    // Ensure fetchEmails was called correctly
    expect(fetchEmails).toHaveBeenCalledWith("fake-token", "test@example.com");

    // Ensure saveJobPostings was called with correctly mapped data
    const expectedJobPostings = mockEmails.map((email) => ({
      title: email.subject,
      source: email.sender.includes("linkedin")
        ? "LinkedIn"
        : email.sender.includes("indeed")
        ? "Indeed"
        : "Unknown",
      gmail_message_id: email.id,
      fetched_at: expect.any(String), // Since it's a timestamp
    }));

    expect(saveJobPostings).toHaveBeenCalledWith(expectedJobPostings, "test@example.com");
  });

  it("should handle fetchEmails failure", async () => {
    // Mock fetchEmails to reject with an error
    (fetchEmails as jest.Mock).mockRejectedValue(new Error("Failed to fetch emails"));

    // Render the hook
    const { result } = renderHook(() => useFetchAndSyncEmails("fake-token", "test@example.com"));

    // Initially, loading should be true
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();

    // Wait for the hook to finish syncing
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Ensure error is set correctly
    expect(result.current.error).toBe("Failed to fetch emails");

    // Ensure fetchEmails was called correctly
    expect(fetchEmails).toHaveBeenCalledWith("fake-token", "test@example.com");

    // Ensure saveJobPostings was never called due to fetchEmails failure
    expect(saveJobPostings).not.toHaveBeenCalled();
  });

  it("should handle saveJobPostings failure", async () => {
    // Mock fetchEmails to return expected data
    const mockEmails = [
      { id: "1", subject: "New Job Opportunity", sender: "linkedin@linkedin.com" },
    ];
    (fetchEmails as jest.Mock).mockResolvedValue(mockEmails);

    // Mock saveJobPostings to reject with an error
    (saveJobPostings as jest.Mock).mockRejectedValue(new Error("Failed to save job postings"));

    // Render the hook
    const { result } = renderHook(() => useFetchAndSyncEmails("fake-token", "test@example.com"));

    // Initially, loading should be true
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();

    // Wait for the hook to finish syncing
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Ensure error is set correctly
    expect(result.current.error).toBe("Failed to save job postings");

    // Ensure fetchEmails was called correctly
    expect(fetchEmails).toHaveBeenCalledWith("fake-token", "test@example.com");

    // Ensure saveJobPostings was called with correctly mapped data
    const expectedJobPostings = mockEmails.map((email) => ({
      title: email.subject,
      source: email.sender.includes("linkedin")
        ? "LinkedIn"
        : email.sender.includes("indeed")
        ? "Indeed"
        : "Unknown",
      gmail_message_id: email.id,
      fetched_at: expect.any(String), // Since it's a timestamp
    }));

    expect(saveJobPostings).toHaveBeenCalledWith(expectedJobPostings, "test@example.com");
  });
});
