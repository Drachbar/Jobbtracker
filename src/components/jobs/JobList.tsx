import { Card, Heading, Stack, Text } from "@chakra-ui/react";
import type { Job, JobStatus } from "../../types/job";
import { groupJobsByMonth } from "../../utils/job-grouping";
import { JobCard } from "./JobCard";

type Props = {
  jobs: Job[];
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: JobStatus) => void;
  onEdit: (job: Job) => void;
};

export function JobList({ jobs, onDelete, onStatusChange, onEdit }: Props) {
  if (jobs.length === 0) {
    return (
      <Card.Root>
        <Card.Body>
          <Text>Inga jobb ännu.</Text>
        </Card.Body>
      </Card.Root>
    );
  }

  const sortedJobs = [...jobs].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const jobsByMonth = groupJobsByMonth(sortedJobs);

  return (
    <Stack gap="6">
      {jobsByMonth.map(([month, monthJobs]) => (
        <Stack key={month} gap="4">
          <Heading size="md" textTransform="capitalize">
            {month} ({monthJobs.length})
          </Heading>

          <Stack gap="4">
            {monthJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onDelete={onDelete}
                onStatusChange={onStatusChange}
                onEdit={onEdit}
              />
            ))}
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
}
