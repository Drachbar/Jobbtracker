import { NativeSelect } from "@chakra-ui/react";
import type { JobStatus } from "../../types/job";
import { JOB_STATUSES, getStatusLabel } from "../../utils/job-status";

type Props = {
  value: JobStatus;
  onChange: (status: JobStatus) => void;
  ariaLabel?: string;
  maxW?: string;
};

export function JobStatusSelect({
  value,
  onChange,
  ariaLabel = "Välj jobbstatus",
  maxW = "200px"
}: Props) {
  return (
    <NativeSelect.Root maxW={maxW}>
      <NativeSelect.Field
        aria-label={ariaLabel}
        value={value}
        onChange={(e) => onChange(e.target.value as JobStatus)}>
        {JOB_STATUSES.map((status) => (
          <option key={status} value={status}>
            {getStatusLabel(status)}
          </option>
        ))}
      </NativeSelect.Field>

      <NativeSelect.Indicator />
    </NativeSelect.Root>
  );
}
