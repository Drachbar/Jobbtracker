import { Card, SimpleGrid, Stat } from '@chakra-ui/react';
import type { JobStatus } from '../../types/job';
import { JOB_STATUSES, getStatusColor, getStatusLabel } from '../../utils/job-status';

type Props = {
  stats: Record<JobStatus, number>;
};

export default function JobStats({ stats }: Props) {
  return (
    <SimpleGrid columns={{ base: 2, md: 4 }} gap="3">
      {JOB_STATUSES.map((status) => {
        const color = getStatusColor(status);

        return (
          <Card.Root
            key={status}
            borderWidth="1px"
            borderRadius="2xl"
            borderColor={`${color}.200`}
            bg={`${color}.100`}
            shadow="sm"
            _dark={{
              bg: `${color}.900`,
              borderColor: `${color}.600`,
              boxShadow: 'md',
            }}
          >
            <Card.Body>
              <Stat.Root>
                <Stat.Label
                  fontSize="sm"
                  fontWeight="medium"
                  color={`${color}.600`}
                  _dark={{ color: `${color}.300` }}
                >
                  {getStatusLabel(status)}
                </Stat.Label>

                <Stat.ValueText
                  fontSize="3xl"
                  fontWeight="bold"
                  color="gray.800"
                  _dark={{ color: 'white' }}
                >
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
