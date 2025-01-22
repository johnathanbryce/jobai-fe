"use client";
import { useEffect } from "react";
import { AuthUser } from "@/app/types/user";

const useSyncOAuthUser = (user: AuthUser, accessToken: string | undefined) => {
  useEffect(() => {
    const syncUser = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/users/oauth-sync/", {
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
        console.log("sync user data response from django", data);

        // TODO: handle errors
        if (!response.ok) {
          console.error("Error syncing user:", data);
        } else {
          console.log("User synced successfully:", data);
        }
      } catch (error) {
        console.error("Network error while syncing user:", error);
      }
    };

    if (user && accessToken) {
      syncUser();
    }
  }, [user, accessToken]);
};

export default useSyncOAuthUser;
