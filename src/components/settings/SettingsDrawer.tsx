import { Drawer, Stack, Text } from '@chakra-ui/react';
import { ColorModeButton } from '../ui/color-mode';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function SettingsDrawer({ open, onClose }: Props) {
  return (
    <Drawer.Root open={open} onOpenChange={(e) => !e.open && onClose()}>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Inställningar</Drawer.Title>
          </Drawer.Header>

          <Drawer.Body>
            <Stack gap="6">
              <Stack gap="2">
                <Text fontWeight="medium">Tema</Text>
                <ColorModeButton alignSelf="flex-start" />
              </Stack>

              <Stack gap="2">
                <Text fontWeight="medium">Om appen</Text>
                <Text fontSize="sm" color="fg.muted">
                  Jobbtracker hjälper dig hålla koll på jobb du vill söka, har sökt och gått vidare
                  med.
                </Text>
              </Stack>
            </Stack>
          </Drawer.Body>

          <Drawer.CloseTrigger />
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
}
