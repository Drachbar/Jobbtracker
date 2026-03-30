import { Drawer, Stack, Text, Card, SimpleGrid } from '@chakra-ui/react';
import type { JobStatus } from '../../types/job';
import { JOB_STATUSES, getStatusColor, getStatusLabel } from '../../utils/job-status';

type Props = {
  open: boolean;
  onClose: () => void;
  stats: Record<JobStatus, number>;
  totalJobs: number;
};

export default function ProfileDrawer({ open, onClose, stats, totalJobs }: Props) {
  const appliedJobs = stats.sokt;
  const interviewJobs = stats.intervju;

  return (
    <Drawer.Root open={open} onOpenChange={(e) => !e.open && onClose()}>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header pb="2">
            <Drawer.Title>Profil</Drawer.Title>
          </Drawer.Header>

          <Drawer.Body>
            <Stack gap="6">
              {/* header */}
              ...
              {/* summary */}
              <Card.Root variant="subtle" borderRadius="2xl">
                <Card.Body p="3">
                  <Text fontSize="sm" color="fg.muted">
                    Sammanfattning
                  </Text>
                  <Text mt="1" fontSize="sm">
                    Du har totalt <b>{totalJobs}</b> jobb sparade, varav <b>{appliedJobs}</b> sökta
                    och <b>{interviewJobs}</b> intervju(er).
                  </Text>
                </Card.Body>
              </Card.Root>
              {/* stats */}
              <SimpleGrid columns={2} gap="3">
                {JOB_STATUSES.map((status) => (
                  <Card.Root
                    key={status}
                    borderRadius="xl"
                    variant="outline"
                    borderColor={`${getStatusColor(status)}.200`}
                    bg={`${getStatusColor(status)}.50`}
                    _dark={{
                      bg: `${getStatusColor(status)}.900`,
                      borderColor: `${getStatusColor(status)}.700`,
                    }}
                  >
                    <Card.Body p="3">
                      <Text fontSize="xs" color="fg.muted">
                        {getStatusLabel(status)}
                      </Text>
                      <Text fontSize="lg" fontWeight="semibold">
                        {stats[status]}
                      </Text>
                    </Card.Body>
                  </Card.Root>
                ))}
              </SimpleGrid>
            </Stack>
          </Drawer.Body>

          <Drawer.CloseTrigger />
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
}
