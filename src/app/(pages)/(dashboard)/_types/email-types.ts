export type Job = {
  title?: string;
  description: string;
  url?: string;
};

export type Email = {
  id: string | number;
  jobs: Job[]; // TODO: adjust this when finalize the structure of jobs array
  sender: string;
  subject: string;
  snippet?: string;
};
