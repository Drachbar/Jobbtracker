import type { JobStatus } from "../types/job";

export const JOB_STATUSES: JobStatus[] = [
  "vill_soka",
  "sokt",
  "intervju",
  "avslag"
];

export function getStatusLabel(status: JobStatus) {
  switch (status) {
    case "vill_soka":
      return "Vill söka";
    case "sokt":
      return "Sökt";
    case "intervju":
      return "Intervju";
    case "avslag":
      return "Avslag";
  }
}

export function getStatusColor(status: JobStatus) {
  switch (status) {
    case "vill_soka":
      return "gray";
    case "sokt":
      return "blue";
    case "intervju":
      return "yellow";
    case "avslag":
      return "red";
  }
}
