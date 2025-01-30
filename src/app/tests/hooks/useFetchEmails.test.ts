import { renderHook, waitFor } from "@testing-library/react";
import useFetchEmails from "@/app/(pages)/(dashboard)/_hooks/useFetchAndSyncEmails";
import { fetchEmails } from "@/app/(pages)/(dashboard)/_services/emailServices";

// Mock fetchEmails
jest.mock("@/app/(pages)/(dashboard)/_services/emailServices", () => ({
  fetchEmails: jest.fn(),
}));

// Mock API base URL
beforeAll(() => {
  process.env.NEXT_PUBLIC_API_BASE_URL = "http://localhost:8000";
});

describe("useFetchEmails Hook", () => {
  it("should handle success", async () => {
    // Mock fetchEmails to return expected data
    (fetchEmails as jest.Mock).mockResolvedValue([
      { id: "1", subject: "New Job", sender: "LinkedIn", jobs: [] },
    ]);

    // Render the hook
    const { result } = renderHook(() => useFetchEmails("fake-token", "test@example.com"));

    // Wait for the state to fully update
    await waitFor(() => {
      if (result.current.loading === false) {
        // Check emails and loading state once loading is complete
        expect(result.current.emails).not.toBeNull();
        expect(result.current.emails).toHaveLength(1);
      }
    });

    // Ensure fetchEmails was called correctly
    expect(fetchEmails).toHaveBeenCalledWith("fake-token", "test@example.com");
  });
});
