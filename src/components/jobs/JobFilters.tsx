import { Box, Field, HStack, NativeSelect } from "@chakra-ui/react";
import type { JobStatus } from "../../types/job";
import { JOB_STATUSES, getStatusLabel } from "../../utils/job-status";
import { JobViewToggle } from "./JobViewToggle";

type Props = {
  statusFilter: JobStatus | "alla";
  onStatusFilterChange: (value: JobStatus | "alla") => void;
  viewMode: "list" | "board";
  onViewModeChange: (value: "list" | "board") => void;
};

export function JobFilters({
  statusFilter,
  onStatusFilterChange,
  viewMode,
  onViewModeChange
}: Props) {
  return (
    <HStack
      align="center"
      gap="4"
      p="4"
      borderWidth="1px"
      borderRadius="2xl"
      bg="white"
      borderColor="gray.200"
      _dark={{
        bg: "whiteAlpha.50",
        borderColor: "whiteAlpha.200"
      }}>
      {viewMode === "list" && (
        <Field.Root maxW="220px">
          <Field.Label color="fg.muted">Filtrera på status</Field.Label>

          <NativeSelect.Root>
            <NativeSelect.Field
              value={statusFilter}
              onChange={(e) =>
                onStatusFilterChange(e.target.value as JobStatus | "alla")
              }>
              <option value="alla">Alla</option>
              {JOB_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {getStatusLabel(status)}
                </option>
              ))}
            </NativeSelect.Field>

            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>
      )}

      <Box ml="auto">
        <JobViewToggle viewMode={viewMode} onChange={onViewModeChange} />
      </Box>
    </HStack>
  );
}
