import { AuthUser } from "@/app/types/user";

export const syncOAuthUser = async (
  user: AuthUser,
  accessToken: string | undefined
): Promise<void> => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!accessToken) {
    throw new Error("Access token is undefined.");
  }

  const response = await fetch(`${API_BASE_URL}/api/users/oauth-sync/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      google_id: user.id,
      email: user.email,
      username: user.name,
      profile_image_url: user.image,
      first_name: user.first_name,
      last_name: user.last_name,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Error syncing user.");
  }
};
