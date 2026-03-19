import { useEffect, useState } from "react";
import type { Job, JobStatus } from "../types/job";
import { toaster } from "../components/ui/toaster";

type Props = {
  onAdd: (job: Job) => void;
  editingJob: Job | null;
  onUpdate: (job: Job) => void;
  onCancelEdit: () => void;
};

type AdSource = "jobsearch" | "historical";

type FetchAdResult = {
  data: any;
  source: AdSource;
};

function formatDate(value: string | Date | null | undefined): string {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toISOString().split("T")[0];
}

function getAdIdFromUrl(url: string): string | null {
  const match = url.match(/annonser\/(\d+)/);
  return match?.[1] ?? null;
}

async function fetchAdById(adId: string): Promise<FetchAdResult> {
  const sources: Array<{ source: AdSource; url: string }> = [
    {
      source: "jobsearch",
      url: `https://jobsearch.api.jobtechdev.se/ad/${adId}`
    },
    {
      source: "historical",
      url: `https://historical.api.jobtechdev.se/ad/${adId}`
    }
  ];

  for (const { source, url } of sources) {
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      return { data, source };
    }

    if (response.status !== 404) {
      throw new Error(`API error ${response.status}`);
    }
  }

  throw new Error("Annonsen hittades inte i aktuellt eller historiskt API");
}

export function useJobForm({
  onAdd,
  editingJob,
  onUpdate,
  onCancelEdit
}: Props) {
  const [mode, setMode] = useState<"link" | "manual">("link");

  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [city, setCity] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [occupation, setOccupation] = useState("");
  const [status, setStatus] = useState<JobStatus>("vill_soka");
  const [deadline, setDeadline] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [adSource, setAdSource] = useState<AdSource | null>(null);

  const isEditing = editingJob !== null;
  const isValid = company.trim() !== "" && title.trim() !== "";
  const canFetch = url.trim() !== "" && !isFetching && !isEditing;
  const fieldsLocked = mode === "link" && adSource !== null && !isEditing;

  const lockedStyles = fieldsLocked
    ? {
        bg: "gray.100",
        _dark: { bg: "gray.900" },
        cursor: "not-allowed",
        opacity: 0.8,
        borderColor: "gray.200"
      }
    : {};

  function resetForm() {
    setCompany("");
    setTitle("");
    setUrl("");
    setCity("");
    setEmploymentType("");
    setOccupation("");
    setStatus("vill_soka");
    setDeadline("");
    setAdSource(null);
    setIsFetching(false);
  }

  useEffect(() => {
    if (editingJob) {
      setMode("manual");
      setCompany(editingJob.company ?? "");
      setTitle(editingJob.title ?? "");
      setUrl(editingJob.url ?? "");
      setCity(editingJob.city ?? "");
      setEmploymentType(editingJob.employmentType ?? "");
      setOccupation(editingJob.occupation ?? "");
      setStatus(editingJob.status);
      setDeadline(formatDate(editingJob.deadline));
      setAdSource(null);
      return;
    }

    resetForm();
    setMode("link");
  }, [editingJob]);

  async function handleFetchInfo() {
    if (!url.trim() || isFetching || isEditing) return;

    setIsFetching(true);

    try {
      const adId = getAdIdFromUrl(url);

      if (!adId) {
        toaster.create({
          title: "Ogiltig länk",
          description: "Kunde inte hitta annons-id i länken.",
          type: "error",
          closable: true
        });
        return;
      }

      const { data, source } = await fetchAdById(adId);

      const cityValue =
        data.workplace_address?.municipality ??
        data.workplace_address?.city ??
        data.workplace_address?.region ??
        data.application_details?.location ??
        "";

      const occupationValue =
        data.occupation?.label ??
        data.occupation_group?.label ??
        data.profession?.label ??
        "";

      const deadlineValue =
        data.last_publication_date ?? data.application_deadline ?? "";

      setTitle(data.headline ?? "");
      setCompany(data.employer?.name ?? "");
      setCity(cityValue);
      setDeadline(formatDate(deadlineValue));
      setEmploymentType(data.working_hours_type?.label ?? "");
      setOccupation(occupationValue);
      setAdSource(source);

      toaster.create({
        title: "Annons hämtad",
        description:
          source === "historical"
            ? "Information hämtades från historiskt arkiv."
            : "Informationen fylldes i automatiskt.",
        type: "success",
        closable: true
      });
    } catch (error) {
      console.error(error);
      setAdSource(null);

      toaster.create({
        title: "Kunde inte hämta annonsen",
        description:
          error instanceof Error
            ? error.message
            : "Ett oväntat fel inträffade.",
        type: "error",
        closable: true
      });
    } finally {
      setIsFetching(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!company.trim() || !title.trim()) {
      toaster.create({
        title: "Saknar information",
        description: "Fyll i företag och titel.",
        type: "error",
        closable: true
      });
      return;
    }

    const jobData: Job = editingJob
      ? {
          ...editingJob,
          company: company.trim(),
          title: title.trim(),
          url: url.trim(),
          city: city.trim(),
          employmentType: employmentType.trim(),
          occupation: occupation.trim(),
          status,
          deadline: formatDate(deadline),
          adId: getAdIdFromUrl(url) ?? editingJob.adId
        }
      : {
          id: crypto.randomUUID(),
          company: company.trim(),
          title: title.trim(),
          url: url.trim(),
          city: city.trim(),
          employmentType: employmentType.trim(),
          occupation: occupation.trim(),
          status,
          deadline: formatDate(deadline),
          createdAt: new Date().toISOString(),
          adId: getAdIdFromUrl(url) ?? undefined
        };

    if (editingJob) {
      onUpdate(jobData);

      toaster.create({
        title: "Jobb uppdaterat",
        description: `${jobData.title} uppdaterades.`,
        type: "success",
        closable: true
      });

      onCancelEdit();
      return;
    }

    onAdd(jobData);

    toaster.create({
      title: "Jobb sparat",
      description: `${jobData.title} hos ${jobData.company} lades till.`,
      type: "success",
      closable: true
    });

    resetForm();
    setMode("link");
  }

  return {
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
  };
}
