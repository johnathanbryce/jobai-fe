import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import type { SettingOption } from "../_list/settings";

export function useDashboardNavigation() {
  const router = useRouter();

  const handleNavigation = (action: SettingOption) => {
    switch (action) {
      case "profile":
        router.push("/profile");
        break;
      case "saved-jobs":
        router.push("/saved-jobs");
        break;
      case "dashboard":
        router.push("/dashboard");
        break;
      case "logout":
        signOut();
        break;
      default:
        console.warn(`Unhandled navigation action: ${action}`);
    }
  };

  return { handleNavigation };
}
