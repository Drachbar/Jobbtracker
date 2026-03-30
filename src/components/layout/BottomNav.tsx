import { Avatar, Box, IconButton, Text, VStack } from '@chakra-ui/react';
import { LuPlus, LuSettings } from 'react-icons/lu';

type Props = {
  onOpenProfile: () => void;
  onOpenSettings: () => void;
  onCreateJob: () => void;
  active?: 'profile' | 'settings' | 'none';
};

function vibrate() {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(10);
  }
}

export function BottomNav({ onOpenProfile, onOpenSettings, onCreateJob, active = 'none' }: Props) {
  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      minH="92px"
      pb="env(safe-area-inset-bottom)"
      borderTopWidth="1px"
      borderColor="blackAlpha.100"
      bg="whiteAlpha.900"
      backdropFilter="blur(16px)"
      borderTopRadius="2xl"
      zIndex="1000"
      _dark={{
        bg: 'blackAlpha.700',
        borderColor: 'whiteAlpha.200',
      }}
    >
      <Box position="relative" minH="92px" pb="env(safe-area-inset-bottom)" maxW="460px" mx="auto">
        <VStack position="absolute" left="32px" top="50%" transform="translateY(-50%)" gap="1">
          <IconButton
            aria-label="Profil"
            rounded="full"
            variant="ghost"
            size="xl"
            color={active === 'profile' ? 'blue.500' : undefined}
            bg={active === 'profile' ? 'blue.50' : undefined}
            onClick={() => {
              vibrate();
              onOpenProfile();
            }}
            _hover={{
              bg: active === 'profile' ? 'blue.100' : 'blackAlpha.50',
              _dark: {
                bg: active === 'profile' ? 'blue.900' : 'whiteAlpha.100',
              },
            }}
            _dark={{
              color: active === 'profile' ? 'blue.300' : undefined,
              bg: active === 'profile' ? 'blue.900' : undefined,
            }}
          >
            <Avatar.Root size="sm">
              <Avatar.Fallback name="Victoria" />
            </Avatar.Root>
          </IconButton>

          <Text
            fontSize="xs"
            color={active === 'profile' ? 'blue.500' : 'fg.muted'}
            _dark={{ color: active === 'profile' ? 'blue.300' : 'fg.muted' }}
          >
            Profil
          </Text>
        </VStack>

        <VStack position="absolute" left="50%" top="-42px" transform="translateX(-50%)" gap="1">
          <IconButton
            aria-label="Lägg till jobb"
            boxSize="82px"
            rounded="full"
            bg="white"
            color="gray.700"
            borderWidth="1px"
            borderColor="gray.200"
            boxShadow="0 10px 28px rgba(0,0,0,0.18)"
            _hover={{
              bg: 'gray.50',
              transform: 'scale(1.05)',
            }}
            _active={{
              transform: 'scale(0.96)',
            }}
            _dark={{
              bg: 'gray.800',
              color: 'gray.200',
              borderColor: 'gray.700',
              _hover: {
                bg: 'gray.700',
              },
            }}
            transition="all 0.15s ease"
            onClick={() => {
              vibrate();
              onCreateJob();
            }}
          >
            <LuPlus size={34} />
          </IconButton>

          <Text fontSize="xs" color="fg.muted">
            Lägg till
          </Text>
        </VStack>

        <VStack position="absolute" right="32px" top="50%" transform="translateY(-50%)" gap="1">
          <IconButton
            aria-label="Inställningar"
            rounded="full"
            variant="ghost"
            size="xl"
            color={active === 'settings' ? 'blue.500' : 'gray.700'}
            bg={active === 'settings' ? 'blue.50' : undefined}
            onClick={() => {
              vibrate();
              onOpenSettings();
            }}
            _hover={{
              bg: active === 'settings' ? 'blue.100' : 'blackAlpha.50',
              _dark: {
                bg: active === 'settings' ? 'blue.900' : 'whiteAlpha.100',
              },
            }}
            _dark={{
              color: active === 'settings' ? 'blue.300' : 'gray.200',
              bg: active === 'settings' ? 'blue.900' : undefined,
            }}
          >
            <LuSettings size={22} />
          </IconButton>

          <Text
            fontSize="xs"
            color={active === 'settings' ? 'blue.500' : 'fg.muted'}
            _dark={{ color: active === 'settings' ? 'blue.300' : 'fg.muted' }}
          >
            Inställningar
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}
