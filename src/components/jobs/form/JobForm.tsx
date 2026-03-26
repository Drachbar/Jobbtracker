"use client";

import { Card, Stack } from "@chakra-ui/react";
import type { Job } from "../../../types/job";
import { useJobForm } from "../../../hooks/useJobForm";
import { JobAdFetchSection } from "./JobAdFetchSection";
import { JobDetailsSection } from "./JobDetailsSection";
import { JobFormActions } from "./JobFormActions";
import { JobFormHeader } from "./JobFormHeader";
import { JobStatusSection } from "./JobStatusSection";

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

  return (
    <Card.Root
      variant="outline"
      borderRadius="xl"
      bg="bg"
      borderColor="gray.200"
      shadow="xs"
      _dark={{
        bg: "gray.900",
        borderColor: "whiteAlpha.200"
      }}>
      <Card.Body p={{ base: "5", md: "6" }}>
        <form onSubmit={handleSubmit}>
          <Stack gap="8">
            <JobFormHeader
              isEditing={isEditing}
              mode={mode}
              setMode={setMode}
              status={status}
            />

            {mode === "link" && !isEditing && (
              <JobAdFetchSection
                url={url}
                setUrl={setUrl}
                adSource={adSource}
                isFetching={isFetching}
                canFetch={canFetch}
                fieldsLocked={fieldsLocked}
                handleFetchInfo={handleFetchInfo}
              />
            )}

            <JobDetailsSection
              company={company}
              setCompany={setCompany}
              title={title}
              setTitle={setTitle}
              occupation={occupation}
              setOccupation={setOccupation}
              city={city}
              setCity={setCity}
              employmentType={employmentType}
              setEmploymentType={setEmploymentType}
              fieldsLocked={fieldsLocked}
              lockedStyles={lockedStyles}
              autoFocusTitle={mode === "manual" || isEditing}
            />

            <JobStatusSection
              deadline={deadline}
              setDeadline={setDeadline}
              status={status}
              setStatus={setStatus}
              fieldsLocked={fieldsLocked}
              lockedStyles={lockedStyles}
            />

            <JobFormActions
              isEditing={isEditing}
              isValid={isValid}
              isFetching={isFetching}
              onCancelEdit={onCancelEdit}
            />
          </Stack>
        </form>
      </Card.Body>
    </Card.Root>
  );
}
