import { JobPosting } from "./job-types";

export type Email = {
  id: string | number;
  jobs: JobPosting[];
  sender: string;
  subject: string;
  snippet?: string;
};
