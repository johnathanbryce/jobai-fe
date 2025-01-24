import { renderHook, waitFor } from "@testing-library/react";
import useFetchEmails from "@/app/(pages)/(dashboard)/_hooks/useFetchEmails";
import { fetchEmails } from "@/app/(pages)/(dashboard)/_services/emailServices";

// Mock fetchEmails
jest.mock("@/app/(pages)/(dashboard)/_services/emailServices", () => ({
  fetchEmails: jest.fn(),
}));

describe("useFetchEmails Hook", () => {
  it("should return default state if token/email not provided", () => {
    const { result } = renderHook(() => useFetchEmails(undefined, undefined));
    expect(result.current.emails).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should handle success", async () => {
    (fetchEmails as jest.Mock).mockResolvedValue([
      { id: "1", subject: "New Job", sender: "LinkedIn", jobs: [] },
    ]);

    const { result } = renderHook(() => useFetchEmails("fake-token", "test@example.com"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.emails).toHaveLength(1);
    });

    expect(fetchEmails).toHaveBeenCalledWith("fake-token", "test@example.com");
    expect(result.current.error).toBeNull();
    expect(result.current.emails?.[0].subject).toBe("New Job");
  });

  it("should handle error", async () => {
    (fetchEmails as jest.Mock).mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useFetchEmails("fake-token", "test@example.com"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe("Network error");
    });

    expect(fetchEmails).toHaveBeenCalled();
    expect(result.current.emails).toBeNull();
  });
});
