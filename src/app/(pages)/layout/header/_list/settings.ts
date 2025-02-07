export type SettingOption = "profile" | "saved-jobs" | "dashboard" | "logout";

export const settings: { title: string; action: SettingOption }[] = [
  { title: "Profile", action: "profile" },
  { title: "Saved Jobs", action: "saved-jobs" },
  { title: "Dashboard", action: "dashboard" },
  { title: "Logout", action: "logout" },
];
