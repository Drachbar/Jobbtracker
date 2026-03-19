import { useEffect, useMemo, useState } from "react";
import type { Job, JobStatus } from "../types/job";
import { JOB_STATUSES } from "../utils/job-status";

const STORAGE_KEY = "jobbtracker.jobs";

function loadJobs(): Job[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Job[]) : [];
  } catch {
    return [];
  }
}

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>(() => loadJobs());
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<JobStatus | "alla">("alla");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  }, [jobs]);

  function addJob(job: Job) {
    setJobs((prev) => [job, ...prev]);
  }

  function deleteJob(id: string) {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  }

  function changeStatus(id: string, status: JobStatus) {
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, status } : job))
    );
  }

  const filteredJobs = useMemo(() => {
    return jobs
      .filter(
        (job) =>
          job.title.toLowerCase().includes(search.toLowerCase()) ||
          job.company.toLowerCase().includes(search.toLowerCase())
      )
      .filter((job) =>
        statusFilter === "alla" ? true : job.status === statusFilter
      );
  }, [jobs, search, statusFilter]);

  const stats = useMemo(() => {
    return Object.fromEntries(
      JOB_STATUSES.map((status) => [
        status,
        jobs.filter((job) => job.status === status).length
      ])
    ) as Record<JobStatus, number>;
  }, [jobs]);

  const jobsByStatus = useMemo(() => {
    return Object.fromEntries(
      JOB_STATUSES.map((status) => [
        status,
        filteredJobs.filter((job) => job.status === status)
      ])
    ) as Record<JobStatus, Job[]>;
  }, [filteredJobs]);

  function updateJob(updatedJob: Job) {
    setJobs((prev) =>
      prev.map((job) => (job.id === updatedJob.id ? updatedJob : job))
    );
  }

  return {
    jobs,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    filteredJobs,
    stats,
    jobsByStatus,
    addJob,
    deleteJob,
    changeStatus,
    updateJob
  };
}
