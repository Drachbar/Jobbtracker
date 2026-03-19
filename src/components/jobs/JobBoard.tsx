import { Box, HStack } from "@chakra-ui/react";
import type { Job, JobStatus } from "../../types/job";
import { JOB_STATUSES } from "../../utils/job-status";
import { JobBoardColumn } from "./JobBoardColumn";

type Props = {
  jobsByStatus: Record<JobStatus, Job[]>;
  onStatusChange: (id: string, status: JobStatus) => void;
  onDelete: (id: string) => void;
  onEdit: (job: Job) => void;
};

export function JobBoard({
  jobsByStatus,
  onStatusChange,
  onDelete,
  onEdit
}: Props) {
  return (
    <Box
      overflowX="auto"
      pb="3"
      px="1"
      mx="-1"
      css={{
        scrollbarWidth: "thin"
      }}>
      <HStack align="stretch" gap="5" minW="max-content">
        {JOB_STATUSES.map((status) => (
          <Box
            key={status}
            w={{ base: "300px", md: "340px", xl: "360px" }}
            flexShrink={0}>
            <JobBoardColumn
              status={status}
              jobs={jobsByStatus[status]}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          </Box>
        ))}
      </HStack>
    </Box>
  );
}
