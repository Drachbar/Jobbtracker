export function getDaysLeft(deadline: string) {
  return Math.ceil(
    (new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
}

export function getDeadlineColor(daysLeft: number) {
  if (daysLeft < 0) return "red.600";
  if (daysLeft <= 3) return "red.500";
  if (daysLeft <= 7) return "orange.500";
  return "green.600";
}
