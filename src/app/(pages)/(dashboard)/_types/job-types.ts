export type Job = {
  title: string;
  gmail_message_id: string | number;
  source: string;
  fetched_at: string;
};

export type JobPosting = {
  id: number;
  user_id: number;
  title: string;
  company_name?: string;
  company_url?: string;
  location?: string;
  years_experience?: string | number;
  skills?: string | object; // Adjust based on how you handle JSON
  salary?: string | number;
  link?: string;
  gmail_message_id: string;
  gmail_thread_id?: string;
  fetched_at: string; // ISO string format
  summary?: string;
  score?: number;
  source: string;
  is_deleted: boolean;
  deleted_at?: string | null; // ISO string format or null
  created_at: string; // ISO string format
  updated_at: string; // ISO string format
};
