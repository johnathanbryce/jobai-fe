"use client";
import { useEffect } from "react";
import { AuthUser } from "@/app/types/user";
import { syncOAuthUser } from "../_services/userServices";

const useSyncOAuthUser = (user: AuthUser, accessToken: string | undefined) => {
  useEffect(() => {
    const syncUser = async () => {
      try {
        await syncOAuthUser(user, accessToken);
      } catch (error) {
        console.error("Error syncing user:", error);
      }
    };

    if (user && accessToken) {
      syncUser();
    }
  }, [user, accessToken]);
};

export default useSyncOAuthUser;
