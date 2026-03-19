// JobBoardColumn.tsx
import { Badge, Box, Card, HStack, Stack, Text } from "@chakra-ui/react";
import type { Job, JobStatus } from "../../types/job";
import { getStatusColor, getStatusLabel } from "../../utils/job-status";
import { JobCard } from "./JobCard";

type Props = {
  status: JobStatus;
  jobs: Job[];
  onStatusChange: (id: string, status: JobStatus) => void;
  onDelete: (id: string) => void;
  onEdit: (job: Job) => void;
};

export function JobBoardColumn({
  status,
  jobs,
  onStatusChange,
  onDelete,
  onEdit
}: Props) {
  return (
    <Card.Root variant="outline" borderRadius="2xl" bg="bg.panel" h="100%">
      <Box h="2" bg={`${getStatusColor(status)}.400`} borderTopRadius="2xl" />

      <Card.Body p="4">
        <Stack gap="4">
          <HStack justify="space-between" align="center">
            <Text fontWeight="semibold" fontSize="sm">
              {getStatusLabel(status)}
            </Text>

            <Badge
              colorPalette={getStatusColor(status)}
              variant="subtle"
              borderRadius="full"
              px="2.5">
              {jobs.length}
            </Badge>
          </HStack>

          {jobs.length === 0 ? (
            <Box
              py="6"
              px="4"
              borderRadius="xl"
              bg="bg.muted"
              textAlign="center">
              <Text fontSize="sm" color="fg.muted">
                Inga jobb här ännu
              </Text>
            </Box>
          ) : (
            <Stack gap="3">
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onDelete={onDelete}
                  onStatusChange={onStatusChange}
                  onEdit={onEdit}
                  compact
                />
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card.Root>
  );
}
