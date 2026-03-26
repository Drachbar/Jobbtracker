"use client";

import { Field, Grid, Input, Stack, Text } from "@chakra-ui/react";

type Props = {
  company: string;
  setCompany: (value: string) => void;
  title: string;
  setTitle: (value: string) => void;
  occupation: string;
  setOccupation: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  employmentType: string;
  setEmploymentType: (value: string) => void;
  fieldsLocked: boolean;
  lockedStyles: any;
  autoFocusTitle: boolean;
};

export function JobDetailsSection({
  company,
  setCompany,
  title,
  setTitle,
  occupation,
  setOccupation,
  city,
  setCity,
  employmentType,
  setEmploymentType,
  fieldsLocked,
  lockedStyles
}: Props) {
  return (
    <Stack gap="5">
      <Text fontSize="sm" fontWeight="600" color="fg.muted">
        Jobbdetaljer
      </Text>

      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="5">
        <Field.Root>
          <Field.Label fontSize="sm" fontWeight="600">
            Företag
          </Field.Label>
          <Input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="t.ex. Isolerab AB"
            variant="flushed"
            readOnly={fieldsLocked}
            {...lockedStyles}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label fontSize="sm" fontWeight="600">
            Titel
          </Field.Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="t.ex. Säljare"
            variant="flushed"
            readOnly={fieldsLocked}
            {...lockedStyles}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label fontSize="sm" fontWeight="600">
            Yrke
          </Field.Label>
          <Input
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            placeholder="t.ex. Försäljning"
            variant="flushed"
            readOnly={fieldsLocked}
            {...lockedStyles}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label fontSize="sm" fontWeight="600">
            Stad
          </Field.Label>
          <Input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="t.ex. Norrköping"
            variant="flushed"
            readOnly={fieldsLocked}
            {...lockedStyles}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label fontSize="sm" fontWeight="600">
            Anställningsform
          </Field.Label>
          <Input
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value)}
            placeholder="t.ex. Heltid"
            variant="flushed"
            readOnly={fieldsLocked}
            {...lockedStyles}
          />
        </Field.Root>
      </Grid>
    </Stack>
  );
}
