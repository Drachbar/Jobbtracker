// JobActions.tsx
import { HStack, IconButton } from "@chakra-ui/react";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { toaster } from "../ui/toaster";

type Props = {
  title: string;
  onEdit: () => void;
  onDelete: () => void;
};

export function JobActions({ title, onEdit, onDelete }: Props) {
  return (
    <HStack justify="flex-end">
      <IconButton
        size="sm"
        variant="ghost"
        aria-label="Redigera jobb"
        onClick={onEdit}>
        <LuPencil />
      </IconButton>

      <IconButton
        size="sm"
        variant="ghost"
        colorPalette="red"
        aria-label="Ta bort jobb"
        onClick={() => {
          if (!confirm(`Ta bort "${title}"?`)) return;

          onDelete();

          toaster.create({
            title: "Jobb borttaget",
            description: `"${title}" togs bort`,
            type: "success"
          });
        }}
        _hover={{
          bg: "red.100",
          _dark: { bg: "red.900" }
        }}>
        <LuTrash2 />
      </IconButton>
    </HStack>
  );
}
