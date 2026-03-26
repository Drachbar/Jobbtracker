import { CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { JobForm } from "./form/JobForm";
import type { Job } from "../../types/job";

type Props = {
  open: boolean;
  onClose: () => void;
  onAdd: (job: Job) => void;
  onUpdate: (job: Job) => void;
  editingJob: Job | null;
};

export function JobModal({
  open,
  onClose,
  onAdd,
  onUpdate,
  editingJob
}: Props) {
  const isEditing = editingJob !== null;

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(details) => {
        if (!details.open) onClose();
      }}
      size="lg">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content borderRadius="2xl">
            <Dialog.Header>
              <Dialog.Title>
                {isEditing ? "Redigera jobb" : "Lägg till jobb"}
              </Dialog.Title>
            </Dialog.Header>

            <Dialog.CloseTrigger asChild>
              <CloseButton />
            </Dialog.CloseTrigger>

            <Dialog.Body pb="6">
              <JobForm
                onAdd={(job) => {
                  onAdd(job);
                  onClose();
                }}
                editingJob={editingJob}
                onUpdate={(job) => {
                  onUpdate(job);
                  onClose();
                }}
                onCancelEdit={onClose}
              />
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
