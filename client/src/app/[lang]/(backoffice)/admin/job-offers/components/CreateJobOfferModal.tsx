/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useApiClient from "@/hooks/useApiClient";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "react-toastify";

const createJobOfferSchema = z.object({
  title: z.object({
    fr: z.string().min(1, "French title is required"),
    en: z.string().min(1, "English title is required"),
    ar: z.string().min(1, "Arabic title is required"),
  }),
  description: z.object({
    fr: z.string().min(1, "French description is required"),
    en: z.string().min(1, "English description is required"),
    ar: z.string().min(1, "Arabic description is required"),
  }),
  tags: z.object({
    fr: z.string().min(1, "French tags are required"),
    en: z.string().min(1, "English tags are required"),
    ar: z.string().min(1, "Arabic tags are required"),
  }),
  datePublication: z.string().min(1, "Publication date is required"),
  dateLimite: z.string().min(1, "Application deadline is required"),
  image: z.string().url("Must be a valid URL").optional(),
  city: z.object({
    fr: z.string().min(1, "French city is required"),
    en: z.string().min(1, "English city is required"),
    ar: z.string().min(1, "Arabic city is required"),
  }),
  department: z.object({
    fr: z.string().min(1, "French department is required"),
    en: z.string().min(1, "English department is required"),
    ar: z.string().min(1, "Arabic department is required"),
  }),
  nombreCandidats: z.coerce.number().min(1, "Number of candidates is required"),
});

type CreateJobOfferValues = z.infer<typeof createJobOfferSchema>;

interface CreateJobOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  dictionary: {
    createJobOfferModal: {
      title: string;
      description: string;
      jobTitle: string;
      jobDescription: string;
      tags: string;
      city: string;
      department: string;
      publicationDate: string;
      deadline: string;
      candidates: string;
      imageUrl: string;
      cancel: string;
      create: string;
      creating: string;
      successMessage: string;
      errorMessage: string;
    };
  };
}

export function CreateJobOfferModal({
  isOpen,
  onClose,
  dictionary,
}: CreateJobOfferModalProps) {
  const apiClient = useApiClient();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateJobOfferValues>({
    resolver: zodResolver(createJobOfferSchema),
    defaultValues: {
      title: { fr: "", en: "", ar: "" },
      description: { fr: "", en: "", ar: "" },
      tags: { fr: "", en: "", ar: "" },
      datePublication: new Date().toISOString().split("T")[0],
      dateLimite: "",
      image: "",
      city: { fr: "", en: "", ar: "" },
      department: { fr: "", en: "", ar: "" },
      nombreCandidats: 1,
    },
  });

  const onSubmit = async (data: CreateJobOfferValues) => {
    try {
      await apiClient.post("/job-offers", data);
      toast.success(dictionary.createJobOfferModal.successMessage);
      reset();
      onClose();
      router.refresh(); // Refresh the page to show the new job offer
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          dictionary.createJobOfferModal.errorMessage
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{dictionary.createJobOfferModal.title}</DialogTitle>
          <DialogDescription>
            {dictionary.createJobOfferModal.description}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ScrollArea className="h-[60vh] p-4">
            <div className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label>{dictionary.createJobOfferModal.jobTitle}</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Controller
                    name="title.fr"
                    control={control}
                    render={({ field }) => (
                      <Input placeholder="Titre (FR)" {...field} />
                    )}
                  />
                  <Controller
                    name="title.en"
                    control={control}
                    render={({ field }) => (
                      <Input placeholder="Title (EN)" {...field} />
                    )}
                  />
                  <Controller
                    name="title.ar"
                    control={control}
                    render={({ field }) => (
                      <Input placeholder="العنوان (AR)" {...field} />
                    )}
                  />
                </div>
                {errors.title && (
                  <p className="text-sm text-red-500">
                    {errors.title.fr?.message ||
                      errors.title.en?.message ||
                      errors.title.ar?.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label>{dictionary.createJobOfferModal.jobDescription}</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Controller
                    name="description.fr"
                    control={control}
                    render={({ field }) => (
                      <Textarea placeholder="Description (FR)" {...field} />
                    )}
                  />
                  <Controller
                    name="description.en"
                    control={control}
                    render={({ field }) => (
                      <Textarea placeholder="Description (EN)" {...field} />
                    )}
                  />
                  <Controller
                    name="description.ar"
                    control={control}
                    render={({ field }) => (
                      <Textarea placeholder="الوصف (AR)" {...field} />
                    )}
                  />
                </div>
                {errors.description && (
                  <p className="text-sm text-red-500">
                    {errors.description.fr?.message ||
                      errors.description.en?.message ||
                      errors.description.ar?.message}
                  </p>
                )}
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label>{dictionary.createJobOfferModal.tags}</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Controller
                    name="tags.fr"
                    control={control}
                    render={({ field }) => (
                      <Input placeholder="Tags (FR)" {...field} />
                    )}
                  />
                  <Controller
                    name="tags.en"
                    control={control}
                    render={({ field }) => (
                      <Input placeholder="Tags (EN)" {...field} />
                    )}
                  />
                  <Controller
                    name="tags.ar"
                    control={control}
                    render={({ field }) => (
                      <Input placeholder="الكلمات الدالة (AR)" {...field} />
                    )}
                  />
                </div>
                {errors.tags && (
                  <p className="text-sm text-red-500">
                    {errors.tags.fr?.message ||
                      errors.tags.en?.message ||
                      errors.tags.ar?.message}
                  </p>
                )}
              </div>

              {/* City */}
              <div className="space-y-2">
                <Label>{dictionary.createJobOfferModal.city}</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Controller
                    name="city.fr"
                    control={control}
                    render={({ field }) => (
                      <Input placeholder="Ville (FR)" {...field} />
                    )}
                  />
                  <Controller
                    name="city.en"
                    control={control}
                    render={({ field }) => (
                      <Input placeholder="City (EN)" {...field} />
                    )}
                  />
                  <Controller
                    name="city.ar"
                    control={control}
                    render={({ field }) => (
                      <Input placeholder="المدينة (AR)" {...field} />
                    )}
                  />
                </div>
                {errors.city && (
                  <p className="text-sm text-red-500">
                    {errors.city.fr?.message ||
                      errors.city.en?.message ||
                      errors.city.ar?.message}
                  </p>
                )}
              </div>

              {/* Department */}
              <div className="space-y-2">
                <Label>{dictionary.createJobOfferModal.department}</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Controller
                    name="department.fr"
                    control={control}
                    render={({ field }) => (
                      <Input placeholder="Département (FR)" {...field} />
                    )}
                  />
                  <Controller
                    name="department.en"
                    control={control}
                    render={({ field }) => (
                      <Input placeholder="Department (EN)" {...field} />
                    )}
                  />
                  <Controller
                    name="department.ar"
                    control={control}
                    render={({ field }) => (
                      <Input placeholder="القسم (AR)" {...field} />
                    )}
                  />
                </div>
                {errors.department && (
                  <p className="text-sm text-red-500">
                    {errors.department.fr?.message ||
                      errors.department.en?.message ||
                      errors.department.ar?.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Publication Date */}
                <div className="space-y-2">
                  <Label htmlFor="datePublication">
                    {dictionary.createJobOfferModal.publicationDate}
                  </Label>
                  <Controller
                    name="datePublication"
                    control={control}
                    render={({ field }) => (
                      <Input id="datePublication" type="date" {...field} />
                    )}
                  />
                  {errors.datePublication && (
                    <p className="text-sm text-red-500">
                      {errors.datePublication.message}
                    </p>
                  )}
                </div>

                {/* Application Deadline */}
                <div className="space-y-2">
                  <Label htmlFor="dateLimite">
                    {dictionary.createJobOfferModal.deadline}
                  </Label>
                  <Controller
                    name="dateLimite"
                    control={control}
                    render={({ field }) => (
                      <Input id="dateLimite" type="date" {...field} />
                    )}
                  />
                  {errors.dateLimite && (
                    <p className="text-sm text-red-500">
                      {errors.dateLimite.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Number of Candidates */}
                <div className="space-y-2">
                  <Label htmlFor="nombreCandidats">
                    {dictionary.createJobOfferModal.candidates}
                  </Label>
                  <Controller
                    name="nombreCandidats"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="nombreCandidats"
                        type="number"
                        min="1"
                        {...field}
                      />
                    )}
                  />
                  {errors.nombreCandidats && (
                    <p className="text-sm text-red-500">
                      {errors.nombreCandidats.message}
                    </p>
                  )}
                </div>

                {/* Image URL */}
                <div className="space-y-2">
                  <Label htmlFor="image">
                    {dictionary.createJobOfferModal.imageUrl}
                  </Label>
                  <Controller
                    name="image"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="image"
                        placeholder="https://example.com/image.png"
                        {...field}
                      />
                    )}
                  />
                  {errors.image && (
                    <p className="text-sm text-red-500">
                      {errors.image.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </ScrollArea>
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              {dictionary.createJobOfferModal.cancel}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? dictionary.createJobOfferModal.creating
                : dictionary.createJobOfferModal.create}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}