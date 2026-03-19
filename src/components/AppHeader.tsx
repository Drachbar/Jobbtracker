import { Box, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { InstallAppButton } from "./InstallAppButton";
import { ColorModeButton } from "./ui/color-mode";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
};

export function AppHeader({ search, onSearchChange }: Props) {
  return (
    <Stack gap="4">
      <Stack
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "stretch", md: "center" }}
        gap="4">
        <Box flex="1" p="2">
          <Heading size="4xl">Jobbtracker</Heading>
          <Text mt="2" color="fg.muted">
            Håll koll på jobb du vill söka och jobb du redan har sökt.
          </Text>
        </Box>

        <Stack
          direction={{ base: "column", sm: "row" }}
          gap="3"
          align={{ base: "stretch", sm: "center" }}
          w={{ base: "100%", md: "auto" }}>
          <Input
            size="lg"
            variant="subtle"
            placeholder="Sök företag eller titel"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            w={{ base: "100%", sm: "280px", md: "300px" }}
          />

          <Stack
            direction="row"
            gap="3"
            justify={{ base: "flex-end", sm: "start" }}>
            <ColorModeButton size="md" />
            <InstallAppButton />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
