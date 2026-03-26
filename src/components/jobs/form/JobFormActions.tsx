"use client";

import { Button, HStack } from "@chakra-ui/react";

type Props = {
  isEditing: boolean;
  isValid: boolean;
  isFetching: boolean;
  onCancelEdit: () => void;
};

export function JobFormActions({
  isEditing,
  isValid,
  isFetching,
  onCancelEdit
}: Props) {
  return (
    <HStack justify="end" pt="2" gap="3">
      {isEditing && (
        <Button
          type="button"
          variant="ghost"
          borderRadius="lg"
          onClick={onCancelEdit}>
          Avbryt
        </Button>
      )}

      <Button
        type="submit"
        colorPalette="blue"
        size="md"
        borderRadius="lg"
        px="6"
        disabled={!isValid || isFetching}>
        {isEditing ? "Uppdatera" : "Spara"}
      </Button>
    </HStack>
  );
}
