/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { Locale } from "@/configs/i18n";
import { getDictionary } from "@/utils/getDictionary";
import { jobOffersService } from "@/services/jobOffersService";
import { useJobOffersStore } from "@/stores/useJobOffers.store";
import { OfferType } from "@/types/application.types";
import { resolveImageUrl } from "@/utils/resolveImageUrl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type JobOfferFormState = {
  title: string;
  description: string;
  tag: string;
  datePublication: string;
  depotAvant: string;
  city: string;
  department: string;
  candidatesNumber: string;
  grade: string;
  organisme: string;
  specialite: string;
  etablissement: string;
  imageFile: File | null;
};

interface JobOfferFormProps {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  lang: Locale;
  mode: "create" | "edit";
  jobOfferId?: string;
}

const toMulti = (value: string) => ({
  fr: value,
  en: value,
  ar: value,
});

const toDateInputValue = (value?: string) => {
  if (!value) return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toISOString().slice(0, 10);
};

const pickEnglish = (value?: { fr?: string; en?: string; ar?: string }) =>
  value?.en || value?.fr || value?.ar || "";

export default function JobOfferForm({
  dictionary,
  lang,
  mode,
  jobOfferId,
}: JobOfferFormProps) {
  const router = useRouter();
  const { createOffer, updateOffer } = useJobOffersStore();
  const [isLoading, setIsLoading] = useState(mode === "edit");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingImageUrl, setExistingImageUrl] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const modalLabels = dictionary?.createJobOfferModal;
  const validationMessage = "Please fill all required fields.";

  const [formData, setFormData] = useState<JobOfferFormState>({
    title: "",
    description: "",
    tag: "",
    datePublication: "",
    depotAvant: "",
    city: "",
    department: "",
    candidatesNumber: "",
    grade: "",
    organisme: "",
    specialite: "",
    etablissement: "",
    imageFile: null,
  });

  useEffect(() => {
    if (mode !== "edit" || !jobOfferId) return;

    const loadOffer = async () => {
      setIsLoading(true);
      try {
        const offer = await jobOffersService.getJobOfferById(jobOfferId);
        setFormData({
          title: pickEnglish(offer?.title),
          description: pickEnglish(offer?.description),
          tag: pickEnglish(offer?.tag),
          datePublication: toDateInputValue(offer?.datePublication),
          depotAvant: toDateInputValue(offer?.depotAvant),
          city: pickEnglish(offer?.city),
          department: pickEnglish(offer?.department),
          candidatesNumber: offer?.candidatesNumber
            ? String(offer.candidatesNumber)
            : "",
          grade: pickEnglish(offer?.grade),
          organisme: pickEnglish(offer?.organisme),
          specialite: pickEnglish(offer?.specialite),
          etablissement: pickEnglish(offer?.etablissement),
          imageFile: null,
        });
        setExistingImageUrl(offer?.imageUrl || "");
      } catch {
        toast.error("Failed to load job offer.");
      } finally {
        setIsLoading(false);
      }
    };

    loadOffer();
  }, [dictionary, jobOfferId, mode]);

  useEffect(() => {
    if (!formData.imageFile) {
      setImagePreviewUrl("");
      return;
    }
    const previewUrl = URL.createObjectURL(formData.imageFile);
    setImagePreviewUrl(previewUrl);
    return () => URL.revokeObjectURL(previewUrl);
  }, [formData.imageFile]);

  const handleFieldChange = (key: keyof JobOfferFormState, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validateForm = () => {
    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.tag.trim() ||
      !formData.city.trim() ||
      !formData.department.trim() ||
      !formData.datePublication ||
      !formData.depotAvant
    ) {
      toast.error(validationMessage);
      return false;
    }

    const candidatesNumber = Number(formData.candidatesNumber);
    if (!Number.isFinite(candidatesNumber) || candidatesNumber <= 0) {
      toast.error("Please provide a valid candidates number.");
      return false;
    }

    if (mode === "create" && !formData.imageFile) {
      toast.error("Please add an image.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;

    const payload: Record<string, unknown> = {
      title: toMulti(formData.title.trim()),
      description: toMulti(formData.description.trim()),
      tag: toMulti(formData.tag.trim()),
      datePublication: formData.datePublication,
      depotAvant: formData.depotAvant,
      city: toMulti(formData.city.trim()),
      department: toMulti(formData.department.trim()),
      candidatesNumber: Number(formData.candidatesNumber),
    };

    const optionalFields = [
      ["grade", formData.grade],
      ["organisme", formData.organisme],
      ["specialite", formData.specialite],
      ["etablissement", formData.etablissement],
    ];

    optionalFields.forEach(([key, value]) => {
      if (value && value.trim()) {
        payload[key] = toMulti(value.trim());
      }
    });

    setIsSubmitting(true);
    try {
      if (mode === "create") {
        await createOffer(payload as Partial<OfferType>, formData.imageFile);
      } else if (jobOfferId) {
        await updateOffer(jobOfferId, payload as Partial<OfferType>, formData.imageFile);
      }
      router.push(`/${lang}/admin/job-offers`);
    } catch {
      // Errors are already handled by the store; keep the UI responsive.
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const titleText =
    mode === "create"
      ? modalLabels?.title || "Create Job Offer"
      : "Edit Job Offer";
  const subtitleText =
    mode === "create"
      ? modalLabels?.description || "Fill in the job offer details."
      : "Update the job offer details.";

  const resolvedImageUrl = resolveImageUrl(existingImageUrl);
  const previewSrc = imagePreviewUrl || resolvedImageUrl;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{titleText}</h1>
        <p className="text-muted-foreground">
          {subtitleText}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {"Basic information"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">
              {modalLabels?.jobTitle || "Job Title"}
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(event) => handleFieldChange("title", event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">
              {modalLabels?.jobDescription || "Job Description"}
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(event) =>
                handleFieldChange("description", event.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tag">
              {modalLabels?.tags || "Tags"}
            </Label>
            <Input
              id="tag"
              value={formData.tag}
              onChange={(event) => handleFieldChange("tag", event.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {"Details"}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="datePublication">
              {modalLabels?.publicationDate || "Publication Date"}
            </Label>
            <Input
              id="datePublication"
              type="date"
              value={formData.datePublication}
              onChange={(event) =>
                handleFieldChange("datePublication", event.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="depotAvant">
              {modalLabels?.deadline || "Application Deadline"}
            </Label>
            <Input
              id="depotAvant"
              type="date"
              value={formData.depotAvant}
              onChange={(event) =>
                handleFieldChange("depotAvant", event.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="candidatesNumber">
              {modalLabels?.candidates || "Number of Candidates"}
            </Label>
            <Input
              id="candidatesNumber"
              type="number"
              min={1}
              value={formData.candidatesNumber}
              placeholder={"e.g. 10"}
              onChange={(event) =>
                handleFieldChange("candidatesNumber", event.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageFile">
              {modalLabels?.imageUrl || "Image"}
            </Label>
            <Input
              id="imageFile"
              type="file"
              accept="image/*"
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  imageFile: event.target.files?.[0] || null,
                }))
              }
            />
            {previewSrc ? (
              <div className="mt-2 overflow-hidden rounded-md border">
                <img
                  src={previewSrc}
                  alt="Job offer"
                  className="h-48 w-full object-cover"
                />
              </div>
            ) : null}
          </div>
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="city">
              {modalLabels?.city || "City"}
            </Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(event) => handleFieldChange("city", event.target.value)}
            />
          </div>
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="department">
              {modalLabels?.department || "Department"}
            </Label>
            <Input
              id="department"
              value={formData.department}
              onChange={(event) =>
                handleFieldChange("department", event.target.value)
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {"Optional details"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="grade">
              {"Grade"}
            </Label>
            <Input
              id="grade"
              value={formData.grade}
              onChange={(event) => handleFieldChange("grade", event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="organisme">
              {"Organization"}
            </Label>
            <Input
              id="organisme"
              value={formData.organisme}
              onChange={(event) =>
                handleFieldChange("organisme", event.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="specialite">
              {"Speciality"}
            </Label>
            <Input
              id="specialite"
              value={formData.specialite}
              onChange={(event) =>
                handleFieldChange("specialite", event.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="etablissement">
              {"Institution"}
            </Label>
            <Input
              id="etablissement"
              value={formData.etablissement}
              onChange={(event) =>
                handleFieldChange("etablissement", event.target.value)
              }
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push(`/${lang}/admin/job-offers`)}
        >
          {modalLabels?.cancel || "Cancel"}
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {mode === "create"
                ? modalLabels?.creating || "Creating..."
                : "Saving..."}
            </>
          ) : mode === "create" ? (
            modalLabels?.create || "Create Offer"
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </form>
  );
}
