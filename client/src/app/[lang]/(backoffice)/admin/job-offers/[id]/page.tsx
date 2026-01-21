/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import {
  Plus,
  Briefcase,
  Users,
  Clock,
  ChevronDown,
  ChevronUp,
  Filter,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CandidateListModal } from "../components/CandidateListModal";
import {
  Tranche,
  JobOfferSession,
  CreateTrancheData,
} from "@/types/tranche.types";
import { useTrancheStore } from "@/stores/useTrancheStore";
import { jobOffersService } from "@/services/jobOffersService";
import { RecruitmentSession } from "@/types/recruitment-session.types";
import { recruitmentSessionService } from "@/services/recruitmentSessionService";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";

export default function JobOfferRecruitmentManager({
  params,
}: {
  params: { id: string };
}) {
  const { id: jobOfferId } = params;
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTrancheForCandidates, setSelectedTrancheForCandidates] =
    useState<Tranche | null>(null);
  const [jobOfferTitle, setJobOfferTitle] = useState("");
  const { toast } = useToast();

  const { sessions, isLoading, fetchJobOfferSessions } = useTrancheStore();

  useEffect(() => {
    const initData = async () => {
      try {
        await fetchJobOfferSessions(jobOfferId);
        const offer = await jobOffersService.getJobOfferById(jobOfferId);
        // Assuming title can be localized object or string based on previous schema
        const title =
          typeof offer.title === "object" ? offer.title.en : offer.title;
        setJobOfferTitle(title || "Job Offer");
      } catch (error) {
        console.error("Failed to load data", error);
        toast({
          title: "Error",
          description: "Failed to load recruitment data",
          variant: "destructive",
        });
      }
    };
    initData();
  }, [jobOfferId, fetchJobOfferSessions, toast]);

  // Calculate total active candidates across all sessions
  const totalActiveCandidates = sessions.reduce((acc, session) => {
    return (
      acc +
      session.tranches.reduce(
        (tAcc, tranche) => tAcc + (tranche.currentCandidates || 0),
        0
      )
    );
  }, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Briefcase className="h-4 w-4" />
            <span>Job Offers</span>
            <span>/</span>
            <span className="font-medium text-foreground">{jobOfferTitle}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Recruitment Campaigns
          </h1>
          <p className="text-muted-foreground">
            Manage sessions and tranches for this position.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* CREATE TRANCHE DIALOG */}
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="shadow-sm">
                <Plus className="mr-2 h-4 w-4" />
                New Tranche
              </Button>
            </DialogTrigger>
            <CreateTrancheModal
              jobOfferId={jobOfferId}
              onClose={() => setIsCreateModalOpen(false)}
              onSuccess={() => fetchJobOfferSessions(jobOfferId)}
            />
          </Dialog>
        </div>
      </div>

      {/* DASHBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: SESSIONS & TRANCHES (Timeline) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Campaign Timeline
            </h2>
            <Button variant="ghost" size="sm" className="h-8">
              <Filter className="mr-2 h-3 w-3" /> Filter
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : sessions.length === 0 ? (
            <div className="text-center p-8 border rounded-lg bg-muted/10">
              <p className="text-muted-foreground">
                No recruitment sessions found for this job offer.
              </p>
            </div>
          ) : (
            sessions.map((session) => (
              <SessionCard
                key={session._id}
                session={session}
                tranches={session.tranches}
                onManageCandidates={setSelectedTrancheForCandidates}
              />
            ))
          )}
        </div>

        {/* RIGHT COLUMN: SUMMARY & STATS */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Active Candidates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalActiveCandidates}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Across all open tranches
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              <Button variant="outline" className="w-full justify-start">
                Config Session Years
              </Button>
              <Button variant="outline" className="w-full justify-start">
                View All Candidates
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {selectedTrancheForCandidates && (
        <CandidateListModal
          tranche={selectedTrancheForCandidates}
          isOpen={!!selectedTrancheForCandidates}
          onClose={() => setSelectedTrancheForCandidates(null)}
        />
      )}
    </div>
  );
}

// --- SUB-COMPONENT: SESSION CARD ---
function SessionCard({
  session,
  tranches,
  onManageCandidates,
}: {
  session: JobOfferSession;
  tranches: Tranche[];
  onManageCandidates: (tranche: Tranche) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Card
      className={`border-l-4 ${
        session.isActive ? "border-l-primary" : "border-l-muted"
      }`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-xl">{session.yearLabel}</CardTitle>
              {session.isActive ? (
                <Badge
                  variant="default"
                  className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200"
                >
                  Active Session
                </Badge>
              ) : (
                <Badge variant="secondary">Archived</Badge>
              )}
            </div>
            <CardDescription>
              {format(new Date(session.startDate), "PP")} -{" "}
              {format(new Date(session.endDate), "PP")}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-2">
          <div className="space-y-4">
            {!tranches || tranches.length === 0 ? (
              <div className="text-center py-6 border-2 border-dashed rounded-lg bg-muted/20">
                <p className="text-sm text-muted-foreground">
                  No tranches created for this session yet.
                </p>
              </div>
            ) : (
              tranches.map((tranche) => (
                <TrancheItem
                  key={tranche._id}
                  tranche={tranche}
                  onManageCandidates={onManageCandidates}
                />
              ))
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}

// --- SUB-COMPONENT: TRANCHE ITEM ---
function TrancheItem({
  tranche,
  onManageCandidates,
}: {
  tranche: Tranche;
  onManageCandidates: (tranche: Tranche) => void;
}) {
  const percentFull = tranche.maxCandidates
    ? Math.round((tranche.currentCandidates / tranche.maxCandidates) * 100)
    : 0;

  return (
    <div className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border bg-card hover:shadow-md transition-all duration-200 gap-4">
      <div className="flex items-start gap-4">
        <div
          className={`mt-1 p-2 rounded-full ${
            tranche.isOpen
              ? "bg-blue-50 text-blue-600"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          <Briefcase className="h-5 w-5" />
        </div>
        <div>
          <h4 className="font-semibold text-foreground flex items-center gap-2">
            {tranche.name}
            {tranche.isOpen ? (
              <span
                className="flex h-2 w-2 rounded-full bg-green-500"
                title="Open"
              />
            ) : (
              <span
                className="flex h-2 w-2 rounded-full bg-red-400"
                title="Closed"
              />
            )}
          </h4>
          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {format(new Date(tranche.startDate), "PP")} -{" "}
              {format(new Date(tranche.endDate), "PP")}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 w-full sm:w-auto border-t sm:border-0 pt-4 sm:pt-0 mt-2 sm:mt-0">
        {/* Candidates Stats */}
        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center min-w-[100px]">
          <span className="text-sm font-medium text-muted-foreground sm:hidden">
            Occupancy
          </span>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 text-sm font-medium">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>
                {tranche.currentCandidates}{" "}
                <span className="text-muted-foreground font-normal">
                  / {tranche.maxCandidates || "∞"}
                </span>
              </span>
            </div>
            {tranche.maxCandidates && (
              <div className="w-24 sm:w-full h-1.5 bg-secondary rounded-full mt-1 overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${percentFull}%` }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-end gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="outline"
            size="sm"
            className="h-8 flex-1 sm:flex-none whitespace-nowrap"
            onClick={() => onManageCandidates(tranche)}
          >
            Manage Candidates
          </Button>
          <div className="flex items-center gap-1 flex-1 sm:flex-none justify-end">
            <Button variant="ghost" size="sm">
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENT: CREATE MODAL ---
function CreateTrancheModal({
  jobOfferId,
  onClose,
  onSuccess,
}: {
  jobOfferId: string;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [sessions, setSessions] = useState<RecruitmentSession[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createTranche } = useTrancheStore();
  const { toast } = useToast();

  const [formData, setFormData] = useState<Partial<CreateTrancheData>>({
    jobOffer: jobOfferId,
    isOpen: true,
  });

  useEffect(() => {
    const fetchSessions = async () => {
      setLoadingSessions(true);
      try {
        const data = await recruitmentSessionService.getAllSessions();
        setSessions(data);
        if (data.length > 0) {
          setFormData((prev) => ({ ...prev, session: data[0]._id }));
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to fetch sessions",
          variant: "destructive",
        });
      } finally {
        setLoadingSessions(false);
      }
    };
    fetchSessions();
  }, [toast]);

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.session ||
      !formData.startDate ||
      !formData.endDate
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      toast({
        title: "Validation Error",
        description: "Start date must be before end date",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await createTranche(formData as CreateTrancheData);
      toast({
        title: "Success",
        description: "Tranche created successfully",
        className: "bg-green-500 text-white border-none",
      });
      onSuccess();
      onClose();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        (Array.isArray(error.response?.data?.message)
          ? error.response?.data?.message.join(", ")
          : "Failed to create tranche");

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Create New Recruitment Tranche</DialogTitle>
        <DialogDescription>
          Link a new operational tranche to a session for this job offer.
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-4 py-4">
        {/* Session Selection */}
        <div className="grid gap-2">
          <Label htmlFor="session">Recruitment Session (Year)</Label>
          <Select
            value={formData.session}
            onValueChange={(val) =>
              setFormData((prev) => ({ ...prev, session: val }))
            }
            disabled={loadingSessions}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={
                  loadingSessions ? "Loading..." : "Select a session"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {sessions.map((s) => (
                <SelectItem key={s._id} value={s._id}>
                  {s.yearLabel} {s.isActive ? "(Active)" : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tranche Name */}
        <div className="grid gap-2">
          <Label htmlFor="name">Tranche Name</Label>
          <Input
            id="name"
            placeholder="e.g., Tranche 1 - Winter"
            value={formData.name || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="start">Start Date</Label>
            <Input
              id="start"
              type="date"
              value={formData.startDate || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, startDate: e.target.value }))
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="end">End Date</Label>
            <Input
              id="end"
              type="date"
              value={formData.endDate || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, endDate: e.target.value }))
              }
            />
          </div>
        </div>

        {/* Capacity */}
        <div className="grid gap-2">
          <Label htmlFor="max">Max Candidates (Optional)</Label>
          <Input
            id="max"
            type="number"
            placeholder="Leave empty for unlimited"
            value={formData.maxCandidates || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                maxCandidates: e.target.value
                  ? Number(e.target.value)
                  : undefined,
              }))
            }
          />
        </div>

        {/* Status */}
        <div className="flex items-center justify-between rounded-lg border p-3 bg-muted/20">
          <div className="space-y-0.5">
            <Label className="text-base">Open Immediately</Label>
            <div className="text-xs text-muted-foreground">
              Candidates can apply as soon as created.
            </div>
          </div>
          <Switch
            checked={formData.isOpen}
            onCheckedChange={(checked) =>
              setFormData((prev) => ({ ...prev, isOpen: checked }))
            }
          />
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
            </>
          ) : (
            "Create Tranche"
          )}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
