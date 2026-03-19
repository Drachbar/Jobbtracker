import { Card, SimpleGrid, Stat } from "@chakra-ui/react";
import type { JobStatus } from "../../types/job";
import {
  JOB_STATUSES,
  getStatusColor,
  getStatusLabel
} from "../../utils/job-status";

type Props = {
  stats: Record<JobStatus, number>;
};

export function JobStats({ stats }: Props) {
  return (
    <SimpleGrid columns={{ base: 2, md: 4 }} gap="3">
      {JOB_STATUSES.map((status) => {
        const color = getStatusColor(status);

        return (
          <Card.Root
            key={status}
            borderWidth="1px"
            borderRadius="2xl"
            bg="white"
            borderColor={`${color}.200`}
            shadow="sm"
            _dark={{
              bg: "whiteAlpha.50",
              borderColor: "whiteAlpha.200"
            }}>
            <Card.Body>
              <Stat.Root>
                <Stat.Label
                  fontSize="sm"
                  fontWeight="medium"
                  color={`${color}.600`}
                  _dark={{ color: `${color}.300` }}>
                  {getStatusLabel(status)}
                </Stat.Label>

                <Stat.ValueText
                  fontSize="2xl"
                  fontWeight="bold"
                  color="gray.800"
                  _dark={{ color: "white" }}>
                  {stats[status]}
                </Stat.ValueText>
              </Stat.Root>
            </Card.Body>
          </Card.Root>
        );
      })}
    </SimpleGrid>
  );
}
