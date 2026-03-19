import { useState } from "react";
import { Button, Container, Heading, Stack } from "@chakra-ui/react";
import { JobBoard } from "./components/jobs/JobBoard";
import { JobForm } from "./components/jobs/JobForm";
import { JobList } from "./components/jobs/JobList";
import { JobStats } from "./components/jobs/JobStats";
import { JobFilters } from "./components/jobs/JobFilters";
import { useJobs } from "./hooks/useJobs";
import { AppHeader } from "./components/AppHeader";
import { groupJobsByMonth } from "./utils/job-grouping";
import { JOB_STATUSES } from "./utils/job-status";
import type { Job, JobStatus } from "./types/job";

function groupJobsByStatus<T extends { status: JobStatus }>(jobs: T[]) {
  return Object.fromEntries(
    JOB_STATUSES.map((status) => [
      status,
      jobs.filter((job) => job.status === status)
    ])
  ) as Record<JobStatus, T[]>;
}

export default function App() {
  const {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    filteredJobs,
    stats,
    addJob,
    updateJob,
    deleteJob,
    changeStatus
  } = useJobs();

  const [viewMode, setViewMode] = useState<"list" | "board">("list");
  const [showJobs, setShowJobs] = useState(true);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const jobsByMonth = groupJobsByMonth(filteredJobs);

  return (
    <Container maxW="7xl" py={{ base: "6", md: "10" }}>
      <Stack gap="8">
        <AppHeader search={search} onSearchChange={setSearch} />

        <JobStats stats={stats} />

        <JobFilters
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        <Button
          alignSelf="flex-start"
          variant="outline"
          size="sm"
          onClick={() => setShowJobs((prev) => !prev)}>
          {showJobs ? "Dölj jobb" : "Visa jobb"}
        </Button>

        <JobForm
          onAdd={addJob}
          editingJob={editingJob}
          onUpdate={(job) => {
            updateJob(job);
            setEditingJob(null);
          }}
          onCancelEdit={() => setEditingJob(null)}
        />

        {showJobs &&
          (viewMode === "list" ? (
            <JobList
              jobs={filteredJobs}
              onDelete={deleteJob}
              onStatusChange={changeStatus}
              onEdit={(job) => {
                setEditingJob(job);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          ) : (
            <Stack gap="8">
              {jobsByMonth.map(([month, monthJobs]) => (
                <Stack key={month} gap="4">
                  <Heading size="md" textTransform="capitalize">
                    {month} ({monthJobs.length})
                  </Heading>

                  <JobBoard
                    jobsByStatus={groupJobsByStatus(monthJobs)}
                    onStatusChange={changeStatus}
                    onDelete={deleteJob}
                    onEdit={(job) => {
                      setEditingJob(job);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  />
                </Stack>
              ))}
            </Stack>
          ))}
      </Stack>
    </Container>
  );
}
