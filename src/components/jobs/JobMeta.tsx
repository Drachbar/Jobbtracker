import { HStack, Box, Text } from "@chakra-ui/react";

type Props = {
  occupation?: string;
  city?: string;
  employmentType?: string;
};

function MetaItem({ children }: { children: React.ReactNode }) {
  return (
    <Box
      px="2.5"
      py="1"
      borderRadius="md"
      bg="bg.subtle"
      fontSize="sm"
      display="flex"
      alignItems="center">
      <Text color="fg.muted">{children}</Text>
    </Box>
  );
}

export function JobMeta({ occupation, city, employmentType }: Props) {
  if (!occupation && !city && !employmentType) {
    return null;
  }

  return (
    <HStack gap="2" wrap="wrap">
      {occupation && <MetaItem>💼 {occupation}</MetaItem>}
      {city && <MetaItem>📍 {city}</MetaItem>}
      {employmentType && <MetaItem>⏱ {employmentType}</MetaItem>}
    </HStack>
  );
}
