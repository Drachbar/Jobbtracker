"use client";

import {
  Badge,
  Box,
  HStack,
  SegmentGroup,
  Stack,
  Text
} from "@chakra-ui/react";
import type { JobStatus } from "../../../types/job";
import { getStatusColor, getStatusLabel } from "../../../utils/job-status";

type Props = {
  isEditing: boolean;
  mode: "link" | "manual";
  setMode: (mode: "link" | "manual") => void;
  status: JobStatus;
};

export function JobFormHeader({ isEditing, mode, setMode, status }: Props) {
  return (
    <Stack gap="5">
      <HStack justify="space-between" align="start" wrap="wrap">
        <Box>
          <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="700">
            {isEditing ? "Redigera jobb" : "Lägg till jobb"}
          </Text>
          <Text mt="1" fontSize="sm" color="fg.muted">
            {isEditing
              ? "Uppdatera uppgifterna för jobbet."
              : "Hämta uppgifter från annonslänk eller fyll i manuellt."}
          </Text>
        </Box>

        <HStack gap="2">
          <Badge
            variant="subtle"
            colorPalette={isEditing ? "orange" : "blue"}
            borderRadius="full"
            px="3"
            py="1">
            {isEditing ? "Redigerar" : "Nytt jobb"}
          </Badge>

          <Badge
            variant="subtle"
            colorPalette={getStatusColor(status)}
            borderRadius="full"
            px="3"
            py="1">
            {getStatusLabel(status)}
          </Badge>
        </HStack>
      </HStack>

      {!isEditing && (
        <SegmentGroup.Root
          value={mode}
          onValueChange={(e) => setMode(e.value as "link" | "manual")}
          size="sm"
          width="fit-content"
          bg="bg.muted"
          borderRadius="lg"
          p="1"
          _dark={{ bg: "whiteAlpha.100" }}>
          <SegmentGroup.Indicator borderRadius="md" />
          <SegmentGroup.Items
            items={[
              { value: "link", label: "Annonslänk" },
              { value: "manual", label: "Manuellt" }
            ]}
          />
        </SegmentGroup.Root>
      )}
    </Stack>
  );
}
