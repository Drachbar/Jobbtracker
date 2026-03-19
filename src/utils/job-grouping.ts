import type { Job } from "../types/job";

export function getMonthLabel(dateString: string) {
  return new Date(dateString).toLocaleDateString("sv-SE", {
    month: "long",
    year: "numeric"
  });
}

export function groupJobsByMonth(jobs: Job[]) {
  return Object.entries(
    jobs.reduce<Record<string, Job[]>>((groups, job) => {
      const month = getMonthLabel(job.createdAt);

      if (!groups[month]) {
        groups[month] = [];
      }

      groups[month].push(job);
      return groups;
    }, {})
  );
}
