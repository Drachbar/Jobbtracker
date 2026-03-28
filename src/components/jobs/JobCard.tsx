import { useState } from "react";
import {
  Box,
  Button,
  Card,
  Dialog,
  Flex,
  Link,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import type { Job, JobStatus } from "../../types/job";
import { getStatusColor } from "../../utils/job-status";
import { JobStatusSelect } from "./JobStatusSelect";
import { JobDeadline } from "./JobDeadline";
import { JobMeta } from "./JobMeta";
import { JobActions } from "./JobActions";
import { motion, useMotionValue, animate } from "framer-motion";
import { toaster } from "../ui/toaster";
import { LuExternalLink } from "react-icons/lu";

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
  compact = false,
}: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const x = useMotionValue(0);
  const swipeEnabled = !compact;

  const openDeleteDialog = () => {
    setDeleteDialogOpen(true);
    animate(x, 0);
  };

  const handleDelete = () => {
    onDelete(job.id);
    setDeleteDialogOpen(false);

    toaster.create({
      title: "Jobb borttaget",
      description: `"${job.title}" togs bort`,
      type: "success",
    });
  };

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
            openDeleteDialog();
          } else {
            animate(x, 0);
          }
        }}>
        <Card.Root
          variant="outline"
          borderRadius="2xl"
          overflow="hidden"
          bg="bg.panel"
          transition="0.2s"
          _hover={{ shadow: "md", translateY: "-1px" }}>
          {!compact && <Box h="1.5" bg={`${getStatusColor(job.status)}.400`} />}

          <Card.Body p={compact ? "4" : "5"}>
            <Stack gap={4}>
              <Flex justify="space-between" align="start" gap="4">
                <Stack gap="2" flex="1" minW={0}>
                  <Box>
                    <Text
                      fontSize={compact ? "lg" : "xl"}
                      fontWeight="semibold"
                      lineHeight="1.25"
                      truncate>
                      {job.title}
                    </Text>

                    <Text mt="1" color="fg.muted" fontWeight="medium">
                      {job.company}
                    </Text>
                  </Box>
                </Stack>

                <Stack gap="2" align="end" minW={compact ? "120px" : "180px"}>
                  {!compact && (
                    <Box w="100%">
                      <JobStatusSelect
                        value={job.status}
                        onChange={(status) => onStatusChange(job.id, status)}
                      />
                    </Box>
                  )}

                  <JobActions
                    onEdit={() => onEdit(job)}
                    onDelete={openDeleteDialog}
                  />
                </Stack>
              </Flex>

              <JobMeta
                occupation={job.occupation}
                city={job.city}
                employmentType={job.employmentType}
              />

              {job.url && (
                <Link
                  href={job.url}
                  target="_blank"
                  rel="noreferrer"
                  display="inline-flex"
                  alignItems="center"
                  gap="1.5"
                  color="blue.600"
                  fontWeight="semibold"
                  _hover={{
                    color: "blue.500",
                    textDecoration: "underline",
                    textUnderlineOffset: "4px",
                  }}
                  transition="color 0.2s">
                  Öppna annons
                  <Box as={LuExternalLink} boxSize="3.5" />
                </Link>
              )}

              {job.deadline && <JobDeadline deadline={job.deadline} compact />}

              {!compact && (
                <Text fontSize="xs" color="fg.muted">
                  Sparad {new Date(job.createdAt).toLocaleString("sv-SE")}
                </Text>
              )}
            </Stack>
          </Card.Body>
        </Card.Root>
      </MotionBox>

      <Dialog.Root
        open={deleteDialogOpen}
        onOpenChange={(e: { open: boolean }) => setDeleteDialogOpen(e.open)}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Ta bort jobb</Dialog.Title>
              </Dialog.Header>

              <Dialog.Body>
                Är du säker på att du vill ta bort "{job.title}"?
              </Dialog.Body>

              <Dialog.Footer>
                <Stack direction="row">
                  <Button
                    variant="ghost"
                    onClick={() => setDeleteDialogOpen(false)}>
                    Avbryt
                  </Button>
                  <Button colorPalette="red" onClick={handleDelete}>
                    Ta bort
                  </Button>
                </Stack>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
}
