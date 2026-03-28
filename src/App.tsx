import { useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Heading,
  IconButton,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { LuPlus, LuSettings } from "react-icons/lu";
import { AppHeader } from "./components/AppHeader";
import { ProfileDrawer } from "./components/profile/ProfileDrawer";
import { SettingsDrawer } from "./components/settings/SettingsDrawer";
import { JobBoard } from "./components/jobs/JobBoard";
import { JobFilters } from "./components/jobs/JobFilters";
import { JobList } from "./components/jobs/JobList";
import { JobModal } from "./components/jobs/JobModal";
import { JobStats } from "./components/jobs/JobStats";
import { useJobs } from "./hooks/useJobs";
import type { Job, JobStatus } from "./types/job";
import { groupJobsByMonth } from "./utils/job-grouping";
import { JOB_STATUSES } from "./utils/job-status";

function groupJobsByStatus<T extends { status: JobStatus }>(jobs: T[]) {
  return Object.fromEntries(
    JOB_STATUSES.map((status) => [
      status,
      jobs.filter((job) => job.status === status),
    ]),
  ) as Record<JobStatus, T[]>;
}

export default function App() {
  const {
    jobs,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    filteredJobs,
    stats,
    addJob,
    updateJob,
    deleteJob,
    changeStatus,
  } = useJobs();

  const [viewMode, setViewMode] = useState<"list" | "board">("list");
  const [showJobs, setShowJobs] = useState(true);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const jobModal = useDisclosure();
  const profileDrawer = useDisclosure();
  const settingsDrawer = useDisclosure();

  const jobsByMonth = useMemo(
    () => groupJobsByMonth(filteredJobs),
    [filteredJobs],
  );

  function handleCreateJob() {
    setEditingJob(null);
    jobModal.onOpen();
  }

  function handleEditJob(job: Job) {
    setEditingJob(job);
    jobModal.onOpen();
  }

  function handleCloseModal() {
    setEditingJob(null);
    jobModal.onClose();
  }

  return (
    <Container
      maxW="7xl"
      py={{ base: "6", md: "10" }}
      pb="calc(120px + env(safe-area-inset-bottom))">
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

        {showJobs &&
          (filteredJobs.length === 0 ? (
            <Box
              borderWidth="1px"
              rounded="xl"
              p="8"
              textAlign="center"
              color="gray.500">
              Inga jobb matchar filtret.
            </Box>
          ) : viewMode === "list" ? (
            <JobList
              jobs={filteredJobs}
              onDelete={deleteJob}
              onStatusChange={changeStatus}
              onEdit={handleEditJob}
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
                    onEdit={handleEditJob}
                  />
                </Stack>
              ))}
            </Stack>
          ))}
      </Stack>

      <Box
        position="fixed"
        bottom="0"
        left="0"
        right="0"
        minH="72px"
        pb="env(safe-area-inset-bottom)"
        borderTopWidth="1px"
        borderColor="blackAlpha.100"
        bg="whiteAlpha.800"
        backdropFilter="blur(12px)"
        zIndex="1000"
        _dark={{
          bg: "blackAlpha.500",
          borderColor: "whiteAlpha.200",
        }}>
        <Box
          position="relative"
          minH="72px"
          pb="env(safe-area-inset-bottom)"
          maxW="420px"
          mx="auto">
          <IconButton
            aria-label="Profil"
            position="absolute"
            left="24px"
            top="50%"
            transform="translateY(-50%)"
            rounded="full"
            variant="ghost"
            size="lg"
            onClick={profileDrawer.onOpen}
            _hover={{
              bg: "blackAlpha.50",
              _dark: { bg: "whiteAlpha.100" },
            }}>
            <Avatar.Root size="sm">
              <Avatar.Fallback name="Victoria" />
            </Avatar.Root>
          </IconButton>

          <IconButton
            aria-label="Lägg till jobb"
            boxSize="68px"
            rounded="full"
            bg="white"
            color="gray.700"
            borderWidth="1px"
            borderColor="gray.200"
            boxShadow="0 8px 24px rgba(0,0,0,0.18)"
            _hover={{
              bg: "gray.50",
              transform: "translateX(-50%) scale(1.05)",
            }}
            _active={{
              transform: "translateX(-50%) scale(0.96)",
            }}
            _dark={{
              bg: "gray.800",
              color: "gray.200",
              borderColor: "gray.700",
              _hover: {
                bg: "gray.700",
                transform: "translateX(-50%) scale(1.05)",
              },
            }}
            transition="all 0.15s ease"
            position="absolute"
            left="50%"
            top="-34px"
            transform="translateX(-50%)"
            onClick={handleCreateJob}>
            <LuPlus size={30} />
          </IconButton>

          <IconButton
            aria-label="Inställningar"
            position="absolute"
            right="24px"
            top="50%"
            transform="translateY(-50%)"
            rounded="full"
            variant="ghost"
            size="lg"
            color="gray.700"
            onClick={settingsDrawer.onOpen}
            _hover={{
              bg: "blackAlpha.50",
              _dark: { bg: "whiteAlpha.100" },
            }}
            _dark={{ color: "gray.200" }}>
            <LuSettings />
          </IconButton>
        </Box>
      </Box>

      <JobModal
        open={jobModal.open}
        onClose={handleCloseModal}
        onAdd={addJob}
        onUpdate={updateJob}
        editingJob={editingJob}
      />

      <ProfileDrawer
        open={profileDrawer.open}
        onClose={profileDrawer.onClose}
        stats={stats}
        totalJobs={jobs.length}
      />

      <SettingsDrawer
        open={settingsDrawer.open}
        onClose={settingsDrawer.onClose}
      />
    </Container>
  );
}
