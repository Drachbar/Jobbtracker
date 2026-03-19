import { useState } from "react";
import {
  Badge,
  Box,
  Card,
  Flex,
  HStack,
  Link,
  Stack,
  Text
} from "@chakra-ui/react";
import type { Job, JobStatus } from "../../types/job";
import { getStatusColor, getStatusLabel } from "../../utils/job-status";
import { JobStatusSelect } from "./JobStatusSelect";
import { JobDeadline } from "./JobDeadline";
import { JobMeta } from "./JobMeta";
import { JobActions } from "./JobActions";
import { motion, useMotionValue } from "framer-motion";

const MotionBox = motion.create(Box);

type Props = {
  job: Job;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: JobStatus) => void;
  onEdit: (job: Job) => void;
  compact?: boolean;
};

export function JobCard({
  job,
  onDelete,
  onStatusChange,
  onEdit,
  compact = false
}: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const swipeEnabled = !compact;

  return (
    <Box position="relative">
      {swipeEnabled && (
        <Box
          position="absolute"
          inset="0"
          bg="red.500"
          borderRadius="2xl"
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          px="6"
          color="white"
          fontWeight="bold"
          opacity={isDragging ? 1 : 0}
          transition="opacity 0.2s">
          Ta bort
        </Box>
      )}

      <MotionBox
        position="relative"
        zIndex={1}
        style={{ x }}
        drag={swipeEnabled ? "x" : false}
        dragConstraints={{ left: -140, right: 0 }}
        dragElastic={0.08}
        dragMomentum={false}
        onDrag={(_, info) => {
          setIsDragging(info.offset.x < -8);
        }}
        onDragStart={() => {
          if (swipeEnabled) setIsDragging(true);
        }}
        onDragEnd={(_, info) => {
          setIsDragging(false);

          if (swipeEnabled && info.offset.x < -120) {
            if (window.confirm(`Ta bort "${job.title}"?`)) {
              onDelete(job.id);
            }
          }
        }}>
        <Card.Root
          variant="outline"
          borderRadius="2xl"
          overflow="hidden"
          bg="bg.panel"
          transition="0.2s"
          _hover={{
            shadow: "md"
          }}>
          <Box h="2" bg={`${getStatusColor(job.status)}.400`} />

          <Card.Body p={compact ? "4" : "5"}>
            <Stack gap={compact ? "3" : "4"}>
              <Flex
                direction={compact ? "column" : "row"}
                justify="space-between"
                align={compact ? "stretch" : "start"}
                gap="4">
                <Box flex="1">
                  <HStack gap="2" wrap="wrap" mb="1">
                    <Badge
                      colorPalette={getStatusColor(job.status)}
                      variant="subtle"
                      px="2"
                      py="1"
                      borderRadius="md">
                      {getStatusLabel(job.status)}
                    </Badge>
                  </HStack>

                  <Text
                    fontSize={compact ? "md" : "lg"}
                    fontWeight="semibold"
                    lineHeight="1.3">
                    {job.title}
                  </Text>

                  <Text mt="1" color="fg.muted" fontWeight="medium">
                    {job.company}
                  </Text>
                </Box>

                <Box minW={compact ? "100%" : "160px"}>
                  <JobStatusSelect
                    value={job.status}
                    onChange={(status) => onStatusChange(job.id, status)}
                    ariaLabel="Status"
                    maxW="100%"
                  />
                </Box>
              </Flex>

              <JobMeta
                occupation={job.occupation}
                city={job.city}
                employmentType={job.employmentType}
              />

              {job.url && (
                <Box>
                  <Link
                    href={job.url}
                    target="_blank"
                    rel="noreferrer"
                    color="blue.500"
                    fontWeight="semibold">
                    Öppna annons →
                  </Link>
                </Box>
              )}

              {job.deadline && (
                <Box px="3" py="2" borderRadius="lg" bg="bg.muted">
                  <JobDeadline deadline={job.deadline} compact={compact} />
                </Box>
              )}

              {!compact && (
                <Text fontSize="xs" color="fg.muted">
                  Sparad {new Date(job.createdAt).toLocaleString("sv-SE")}
                </Text>
              )}

              <Box pt="1">
                <JobActions
                  title={job.title}
                  onEdit={() => onEdit(job)}
                  onDelete={() => onDelete(job.id)}
                />
              </Box>
            </Stack>
          </Card.Body>
        </Card.Root>
      </MotionBox>
    </Box>
  );
}
