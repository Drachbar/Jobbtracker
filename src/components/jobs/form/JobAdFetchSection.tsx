"use client";

import {
  Badge,
  Box,
  Button,
  Field,
  Grid,
  HStack,
  Input,
  Stack,
  Text
} from "@chakra-ui/react";

type Props = {
  url: string;
  setUrl: (value: string) => void;
  adSource?: string | null;
  isFetching: boolean;
  canFetch: boolean;
  fieldsLocked: boolean;
  handleFetchInfo: () => void;
};

export function JobAdFetchSection({
  url,
  setUrl,
  adSource,
  isFetching,
  canFetch,
  fieldsLocked,
  handleFetchInfo
}: Props) {
  return (
    <Stack gap="4">
      <HStack justify="space-between" align="center" wrap="wrap">
        <Text fontSize="sm" fontWeight="600">
          Hämta från annons
        </Text>

        {adSource && (
          <Badge
            colorPalette={adSource === "historical" ? "orange" : "green"}
            variant="subtle"
            borderRadius="full">
            {adSource === "historical" ? "Historiskt arkiv" : "Aktuell annons"}
          </Badge>
        )}
      </HStack>

      <Grid
        templateColumns={{ base: "1fr", md: "1fr auto" }}
        gap="4"
        alignItems="end">
        <Field.Root>
          <Field.Label fontSize="sm" fontWeight="600">
            Länk till annons
          </Field.Label>
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Klistra in annonslänk"
            variant="flushed"
            size="lg"
          />
        </Field.Root>

        <Button
          type="button"
          variant="solid"
          colorPalette="blue"
          size="md"
          borderRadius="lg"
          onClick={handleFetchInfo}
          loading={isFetching}
          disabled={!canFetch}>
          Hämta info
        </Button>
      </Grid>

      {fieldsLocked && (
        <Box
          px="3"
          py="3"
          borderRadius="lg"
          bg="orange.50"
          borderWidth="1px"
          borderColor="orange.200"
          _dark={{ bg: "orange.950", borderColor: "orange.800" }}>
          <Text fontSize="sm" fontWeight="600">
            Uppgifter hämtade från annons och är låsta
          </Text>
          <Text fontSize="sm" mt="1" color="fg.muted">
            Byt till manuellt läge om du vill skriva över något själv.
          </Text>
        </Box>
      )}
    </Stack>
  );
}
