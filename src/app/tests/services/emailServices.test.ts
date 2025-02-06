import { saveJobPostingsFromEmails } from "@/app/(pages)/(dashboard)/_services/emailServices";

// Mock the fetch API
global.fetch = jest.fn();

describe("saveJobPostings", () => {
  const mockJobPostings = [
    {
      title: "New Job",
      source: "LinkedIn",
      gmail_message_id: "1",
      fetched_at: "2025-01-28T00:00:00.000Z",
    },
  ];
  const mockUserEmail = "test@example.com";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call fetch with the correct parameters", async () => {
    // Mock a successful response
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({}),
    });

    await saveJobPostingsFromEmails(mockJobPostings, mockUserEmail);

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:8000/api/job-postings/save-job-postings/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_email: mockUserEmail,
          job_postings: mockJobPostings,
        }),
      }
    );
  });

  it("should log an error when the response is not ok", async () => {
    // Mock an error response
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue({ error: "Some error" }),
    });

    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    await saveJobPostingsFromEmails(mockJobPostings, mockUserEmail);

    expect(consoleErrorSpy).toHaveBeenCalledWith("Error saving job postings:", "Some error");

    consoleErrorSpy.mockRestore();
  });

  it("should log an error when fetch throws an exception", async () => {
    // Mock fetch throwing an error
    (fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    await saveJobPostingsFromEmails(mockJobPostings, mockUserEmail);

    expect(consoleErrorSpy).toHaveBeenCalledWith("Error:", new Error("Network error"));

    consoleErrorSpy.mockRestore();
  });
});
