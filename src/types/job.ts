// types/job.ts
export type JobStatus = "vill_soka" | "sokt" | "intervju" | "avslag";

export type Job = {
  id: string;
  company: string;
  title: string;
  url: string;
  city: string;
  employmentType: string;
  occupation?: string;
  status: JobStatus;
  deadline?: string;
  createdAt: string;
  adId?: string;
};
