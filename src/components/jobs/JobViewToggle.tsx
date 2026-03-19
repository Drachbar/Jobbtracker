import { Button, ButtonGroup } from "@chakra-ui/react";
import { List, Grid2x2 } from "lucide-react";

type Props = {
  viewMode: "list" | "board";
  onChange: (mode: "list" | "board") => void;
};

export function JobViewToggle({ viewMode, onChange }: Props) {
  return (
    <ButtonGroup size="sm" variant="outline">
      <Button
        onClick={() => onChange("list")}
        colorPalette={viewMode === "list" ? "blue" : "gray"}>
        <List size={18} />
      </Button>

      <Button
        onClick={() => onChange("board")}
        colorPalette={viewMode === "board" ? "blue" : "gray"}>
        <Grid2x2 size={18} />
      </Button>
    </ButtonGroup>
  );
}
