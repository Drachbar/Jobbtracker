"use client";

import {
  createListCollection,
  DatePicker,
  Field,
  Grid,
  Portal,
  Select,
  Stack,
  Text
} from "@chakra-ui/react";
import { parseDate } from "@internationalized/date";
import { LuCalendar } from "react-icons/lu";
import { JOB_STATUSES, getStatusLabel } from "../../../utils/job-status";

type Props = {
  deadline: string;
  setDeadline: (value: string) => void;
  status: (typeof JOB_STATUSES)[number];
  setStatus: (value: (typeof JOB_STATUSES)[number]) => void;
  fieldsLocked: boolean;
  lockedStyles: any;
};

export function JobStatusSection({
  deadline,
  setDeadline,
  status,
  setStatus,
  fieldsLocked,
  lockedStyles
}: Props) {
  const statusCollection = createListCollection({
    items: JOB_STATUSES.map((statusValue) => ({
      label: getStatusLabel(statusValue),
      value: statusValue
    }))
  });

  return (
    <Stack gap="5">
      <Text fontSize="sm" fontWeight="600" color="fg.muted">
        Status och datum
      </Text>

      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="5">
        <Field.Root>
          <Field.Label fontSize="sm" fontWeight="600">
            Sista ansökningsdag
          </Field.Label>

          <DatePicker.Root
            variant="flushed"
            value={deadline ? [parseDate(deadline)] : []}
            onValueChange={(e) => {
              const value = e.value?.[0];
              setDeadline(value ? value.toString() : "");
            }}
            disabled={fieldsLocked}
            positioning={{ placement: "bottom-start" }}>
            <DatePicker.Control>
              <DatePicker.Input
                placeholder="Välj datum"
                bg="transparent"
                borderColor="gray.300"
                _hover={{ borderColor: "gray.400" }}
                _focusVisible={{
                  borderColor: "blue.400",
                  boxShadow: "0 1px 0 0 var(--chakra-colors-blue-400)"
                }}
                _dark={{
                  borderColor: "whiteAlpha.300",
                  _hover: { borderColor: "whiteAlpha.400" },
                  _focusVisible: {
                    borderColor: "blue.300",
                    boxShadow: "0 1px 0 0 var(--chakra-colors-blue-300)"
                  }
                }}
                {...lockedStyles}
              />

              <DatePicker.IndicatorGroup>
                <DatePicker.Trigger>
                  <LuCalendar />
                </DatePicker.Trigger>
              </DatePicker.IndicatorGroup>
            </DatePicker.Control>

            <Portal>
              <DatePicker.Positioner>
                <DatePicker.Content borderRadius="xl" boxShadow="xl">
                  <DatePicker.View view="day">
                    <DatePicker.Header />
                    <DatePicker.DayTable />
                  </DatePicker.View>

                  <DatePicker.View view="month">
                    <DatePicker.Header />
                    <DatePicker.MonthTable />
                  </DatePicker.View>

                  <DatePicker.View view="year">
                    <DatePicker.Header />
                    <DatePicker.YearTable />
                  </DatePicker.View>
                </DatePicker.Content>
              </DatePicker.Positioner>
            </Portal>
          </DatePicker.Root>
        </Field.Root>

        <Field.Root>
          <Field.Label fontSize="sm" fontWeight="600">
            Status
          </Field.Label>

          <Select.Root
            collection={statusCollection}
            value={[status]}
            onValueChange={({ value }) => {
              const nextStatus = value[0];
              if (nextStatus) {
                setStatus(nextStatus as (typeof JOB_STATUSES)[number]);
              }
            }}
            positioning={{ placement: "bottom-start" }}
            size="md">
            <Select.HiddenSelect />

            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Välj status" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>

            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {statusCollection.items.map((item) => (
                    <Select.Item item={item} key={item.value}>
                      {item.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        </Field.Root>
      </Grid>
    </Stack>
  );
}
