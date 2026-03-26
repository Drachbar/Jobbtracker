import { SegmentGroup } from "@chakra-ui/react";
import { List, Grid2x2 } from "lucide-react";

type Props = {
  viewMode: "list" | "board";
  onChange: (mode: "list" | "board") => void;
};

export function JobViewToggle({ viewMode, onChange }: Props) {
  return (
    <SegmentGroup.Root
      value={viewMode}
      onValueChange={(e) => onChange(e.value as "list" | "board")}
      size="md">
      <SegmentGroup.Indicator />

      <SegmentGroup.Items
        items={[
          {
            value: "list",
            label: <List size={18} />
          },
          {
            value: "board",
            label: <Grid2x2 size={18} />
          }
        ]}
      />
    </SegmentGroup.Root>
  );
}
