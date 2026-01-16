"use client";

import React, { useState } from "react";
import {
  Plus,
  Briefcase,
  Users,
  Clock,
  ChevronDown,
  ChevronUp,
  Filter,
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
import { Switch } from "@radix-ui/react-switch";

// --- MOCK TYPES BASED ON YOUR SCHEMAS ---

interface Session {
  _id: string;
  yearLabel: string; // "2025/2026"
  isActive: boolean;
  startDate: string;
  endDate: string;
}

interface Tranche {
  _id: string;
  name: string; // "Tranche 1"
  session: Session; // The parent session
  jobOfferId: string;
  startDate: string;
  endDate: string;
  isOpen: boolean;
  maxCandidates?: number;
  currentCandidates: number; // Added for UI visualization
}

// --- MOCK DATA ---
const MOCK_SESSIONS: Session[] = [
  {
    _id: "s1",
    yearLabel: "2025/2026",
    isActive: true,
    startDate: "2025-09-01",
    endDate: "2026-06-30",
  },
  {
    _id: "s2",
    yearLabel: "2024/2025",
    isActive: false,
    startDate: "2024-09-01",
    endDate: "2025-06-30",
  },
];

const MOCK_TRANCHES: Tranche[] = [
  {
    _id: "t1",
    name: "Tranche 1",
    session: MOCK_SESSIONS[0],
    jobOfferId: "job1",
    startDate: "2025-10-01",
    endDate: "2025-12-31",
    isOpen: true,
    maxCandidates: 50,
    currentCandidates: 12,
  },
  {
    _id: "t2",
    name: "Tranche 2",
    session: MOCK_SESSIONS[0],
    jobOfferId: "job1",
    startDate: "2026-01-01",
    endDate: "2026-03-31",
    isOpen: false,
    maxCandidates: 40,
    currentCandidates: 0,
  },
  {
    _id: "t3",
    name: "Regular Recruitment",
    session: MOCK_SESSIONS[1],
    jobOfferId: "job1",
    startDate: "2024-09-01",
    endDate: "2024-11-30",
    isOpen: false,
    maxCandidates: 100,
    currentCandidates: 98,
  },
];

interface JobOfferRecruitmentManagerProps {
  jobOfferTitle: string;
  jobOfferId: string;
}

export default function JobOfferRecruitmentManager({
  jobOfferTitle = "Senior Fullstack Developer",
}: JobOfferRecruitmentManagerProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Group Tranches by Session ID for the UI
  const groupedTranches = MOCK_SESSIONS.reduce((acc, session) => {
    acc[session._id] = MOCK_TRANCHES.filter(
      (t) => t.session._id === session._id
    );
    return acc;
  }, {} as Record<string, Tranche[]>);

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
              sessions={MOCK_SESSIONS}
              onClose={() => setIsCreateModalOpen(false)}
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

          {MOCK_SESSIONS.map((session) => (
            <SessionCard
              key={session._id}
              session={session}
              tranches={groupedTranches[session._id] || []}
            />
          ))}
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
              <div className="text-3xl font-bold">12</div>
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
    </div>
  );
}

// --- SUB-COMPONENT: SESSION CARD ---
function SessionCard({
  session,
  tranches,
}: {
  session: Session;
  tranches: Tranche[];
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
              {new Date(session.startDate).toLocaleDateString()} -{" "}
              {new Date(session.endDate).toLocaleDateString()}
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
            {tranches.length === 0 ? (
              <div className="text-center py-6 border-2 border-dashed rounded-lg bg-muted/20">
                <p className="text-sm text-muted-foreground">
                  No tranches created for this session yet.
                </p>
              </div>
            ) : (
              tranches.map((tranche) => (
                <TrancheItem key={tranche._id} tranche={tranche} />
              ))
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}

// --- SUB-COMPONENT: TRANCHE ITEM ---
function TrancheItem({ tranche }: { tranche: Tranche }) {
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
              {new Date(tranche.startDate).toLocaleDateString()} -{" "}
              {new Date(tranche.endDate).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Candidates Stats */}
        <div className="flex flex-col items-end min-w-[100px]">
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
            <div className="w-full h-1.5 bg-secondary rounded-full mt-1 overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${percentFull}%` }}
              />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
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
  );
}

// --- SUB-COMPONENT: CREATE MODAL ---
function CreateTrancheModal({
  sessions,
  onClose,
}: {
  sessions: Session[];
  onClose: () => void;
}) {
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
          <Select defaultValue={sessions[0]?._id}>
            <SelectTrigger>
              <SelectValue placeholder="Select a session" />
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
          <Input id="name" placeholder="e.g., Tranche 1 - Winter" />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="start">Start Date</Label>
            <Input id="start" type="date" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="end">End Date</Label>
            <Input id="end" type="date" />
          </div>
        </div>

        {/* Capacity */}
        <div className="grid gap-2">
          <Label htmlFor="max">Max Candidates (Optional)</Label>
          <Input
            id="max"
            type="number"
            placeholder="Leave empty for unlimited"
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
          <Switch defaultChecked />
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onClose}>Create Tranche</Button>
      </DialogFooter>
    </DialogContent>
  );
}
