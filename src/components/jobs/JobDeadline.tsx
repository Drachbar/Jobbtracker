// JobDeadline.tsx
import { Badge, HStack, Text } from "@chakra-ui/react";
import { getDaysLeft } from "../../utils/job-deadline";

type Props = {
  deadline: string;
  compact?: boolean;
};

export function JobDeadline({ deadline, compact = false }: Props) {
  const daysLeft = getDaysLeft(deadline);

  const formattedDate = new Date(deadline).toLocaleDateString("sv-SE", {
    day: "numeric",
    month: compact ? "short" : "long",
    year: "numeric"
  });

  const isToday = daysLeft === 0;
  const isExpired = daysLeft < 0;
  const isSoon = daysLeft > 0 && daysLeft <= 7;

  const getStatus = () => {
    if (isExpired) {
      return { label: "Utgången", color: "red" };
    }
    if (isToday) {
      return { label: "Idag", color: "red" };
    }
    if (isSoon) {
      return { label: "< 7 dagar", color: "orange" };
    }
    return { label: `${daysLeft} dagar`, color: "green" };
  };

  const status = getStatus();
  return (
    <HStack gap="2" wrap="wrap" align="center">
      <Badge
        colorPalette={status.color}
        variant="subtle"
        borderRadius="full"
        px="2.5">
        ⏰ {status.label}
      </Badge>

      <Text fontSize="sm" color="fg.muted">
        {compact ? formattedDate : `Senast ${formattedDate}`}
      </Text>
    </HStack>
  );
}
