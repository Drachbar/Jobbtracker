import {
  Badge,
  Box,
  Button,
  Card,
  Field,
  Grid,
  HStack,
  Input,
  Separator,
  Stack,
  Text
} from "@chakra-ui/react";
import type { Job } from "../../types/job";
import { JobStatusSelect } from "./JobStatusSelect";
import { useJobForm } from "../../hooks/useJobForm";

type Props = {
  onAdd: (job: Job) => void;
  editingJob: Job | null;
  onUpdate: (job: Job) => void;
  onCancelEdit: () => void;
};

export function JobForm({ onAdd, editingJob, onUpdate, onCancelEdit }: Props) {
  const {
    mode,
    setMode,
    company,
    setCompany,
    title,
    setTitle,
    url,
    setUrl,
    city,
    setCity,
    employmentType,
    setEmploymentType,
    occupation,
    setOccupation,
    status,
    setStatus,
    deadline,
    setDeadline,
    isFetching,
    adSource,
    isEditing,
    isValid,
    canFetch,
    fieldsLocked,
    lockedStyles,
    handleFetchInfo,
    handleSubmit
  } = useJobForm({
    onAdd,
    editingJob,
    onUpdate,
    onCancelEdit
  });

  const inputStyles = {
    bg: "white",
    borderColor: "gray.200",
    _hover: { borderColor: "gray.300" },
    _focusVisible: {
      borderColor: "blue.400",
      boxShadow: "0 0 0 1px var(--chakra-colors-blue-400)"
    },
    _dark: {
      bg: "whiteAlpha.50",
      borderColor: "whiteAlpha.200",
      _hover: { borderColor: "whiteAlpha.300" },
      _focusVisible: {
        borderColor: "blue.300",
        boxShadow: "0 0 0 1px var(--chakra-colors-blue-300)"
      }
    }
  };

  return (
    <Card.Root
      variant="outline"
      borderRadius="3xl"
      overflow="hidden"
      bg="white"
      borderColor="gray.200"
      shadow="sm"
      _dark={{
        bg: "gray.900",
        borderColor: "whiteAlpha.200"
      }}>
      <Box
        px={{ base: "4", md: "6" }}
        py="4"
        borderBottomWidth="1px"
        borderColor="border.muted"
        bg="blue.50"
        _dark={{ bg: "whiteAlpha.50" }}>
        <Stack gap="3">
          <HStack justify="space-between" align="start" wrap="wrap">
            <Box>
              <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
                {isEditing ? "Redigera jobb" : "Lägg till jobb"}
              </Text>
              <Text mt="1" fontSize="sm" color="fg.muted">
                {isEditing
                  ? "Uppdatera uppgifterna för jobbet."
                  : "Hämta uppgifter från annonslänk eller fyll i manuellt."}
              </Text>
            </Box>

            <Badge
              variant="subtle"
              colorPalette={isEditing ? "orange" : "blue"}
              borderRadius="full"
              px="3"
              py="1">
              {isEditing ? "Redigerar" : "Nytt jobb"}
            </Badge>
          </HStack>

          {!isEditing && (
            <HStack gap="3" wrap="wrap">
              <Button
                type="button"
                size="sm"
                borderRadius="full"
                variant={mode === "link" ? "solid" : "outline"}
                colorPalette="blue"
                _dark={
                  mode !== "link"
                    ? {
                        borderColor: "whiteAlpha.300",
                        color: "gray.100",
                        bg: "transparent"
                      }
                    : undefined
                }
                onClick={() => setMode("link")}>
                Annonslänk
              </Button>

              <Button
                type="button"
                size="sm"
                borderRadius="full"
                variant={mode === "manual" ? "solid" : "outline"}
                colorPalette="blue"
                onClick={() => setMode("manual")}>
                Manuellt
              </Button>
            </HStack>
          )}
        </Stack>
      </Box>

      <Card.Body p={{ base: "4", md: "6" }}>
        <form onSubmit={handleSubmit}>
          <Stack gap="6">
            {mode === "link" && !isEditing && (
              <Box
                p="4"
                borderWidth="1px"
                borderRadius="2xl"
                borderColor="border.muted"
                bg="gray.50"
                _dark={{ bg: "whiteAlpha.50", borderColor: "whiteAlpha.200" }}>
                <Stack gap="4">
                  <HStack justify="space-between" align="center" wrap="wrap">
                    <Text fontWeight="semibold">Hämta från annons</Text>

                    {adSource && (
                      <Badge
                        colorPalette={
                          adSource === "historical" ? "orange" : "green"
                        }
                        variant="subtle"
                        borderRadius="full">
                        {adSource === "historical"
                          ? "Historiskt arkiv"
                          : "Aktuell annons"}
                      </Badge>
                    )}
                  </HStack>

                  <Grid
                    templateColumns={{ base: "1fr", md: "1fr auto" }}
                    gap="4"
                    alignItems="end">
                    <Field.Root>
                      <Field.Label>Länk till annons</Field.Label>
                      <Input
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Klistra in annonslänk"
                        size="lg"
                      />
                    </Field.Root>

                    <Button
                      type="button"
                      variant="solid"
                      colorPalette="blue"
                      size="lg"
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
                      borderRadius="xl"
                      bg="orange.100"
                      border="1px dotted"
                      borderColor="orange.200"
                      _dark={{ bg: "orange.900" }}>
                      <Text fontSize="sm" fontWeight="medium">
                        🔒 Uppgifter hämtade från annons och är låsta
                      </Text>
                      <Text fontSize="sm" mt="1" color="fg.muted">
                        Byt till manuellt läge om du vill skriva över något
                        själv.
                      </Text>
                    </Box>
                  )}
                </Stack>
              </Box>
            )}

            <Separator />

            <Stack gap="4">
              <HStack justify="space-between" align="center" wrap="wrap">
                <Text fontSize="sm" fontWeight="semibold">
                  Uppgifter
                </Text>

                <Badge variant="outline" borderRadius="full">
                  {status.replace("_", " ")}
                </Badge>
              </HStack>

              <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="4">
                <Field.Root>
                  <Field.Label>Företag</Field.Label>
                  <Input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="t.ex. Isolerab AB"
                    readOnly={fieldsLocked}
                    {...inputStyles}
                    {...lockedStyles}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Titel</Field.Label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="t.ex. Säljare"
                    autoFocus={mode === "manual" || isEditing}
                    readOnly={fieldsLocked}
                    {...inputStyles}
                    {...lockedStyles}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Yrke</Field.Label>
                  <Input
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    placeholder="t.ex. Försäljning"
                    readOnly={fieldsLocked}
                    {...inputStyles}
                    {...lockedStyles}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Stad</Field.Label>
                  <Input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="t.ex. Norrköping"
                    readOnly={fieldsLocked}
                    {...inputStyles}
                    {...lockedStyles}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Anställningsform</Field.Label>
                  <Input
                    value={employmentType}
                    onChange={(e) => setEmploymentType(e.target.value)}
                    placeholder="t.ex. Heltid"
                    readOnly={fieldsLocked}
                    {...inputStyles}
                    {...lockedStyles}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Sista ansökningsdag</Field.Label>
                  <Input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    readOnly={fieldsLocked}
                    {...inputStyles}
                    {...lockedStyles}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Status</Field.Label>
                  <JobStatusSelect value={status} onChange={setStatus} />
                </Field.Root>
              </Grid>
            </Stack>

            <HStack justify="end" pt="2" gap="3">
              {isEditing && (
                <Button
                  type="button"
                  variant="outline"
                  borderRadius="full"
                  onClick={onCancelEdit}>
                  Avbryt
                </Button>
              )}

              <Button
                type="submit"
                colorPalette="blue"
                size="md"
                borderRadius="full"
                px="6"
                disabled={!isValid || isFetching}>
                {isEditing ? "Uppdatera" : "Spara"}
              </Button>
            </HStack>
          </Stack>
        </form>
      </Card.Body>
    </Card.Root>
  );
}
