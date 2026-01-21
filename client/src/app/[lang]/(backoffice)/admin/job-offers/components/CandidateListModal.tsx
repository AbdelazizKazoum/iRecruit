"use client";

import React, { useState } from "react";
import { Briefcase, Eye, Filter, Mail } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CandidateDetailView } from "./CandidateDetailView";
import { CandidateProfile, MOCK_CANDIDATES } from "./types";
import { Tranche } from "@/types/tranche.types";

interface CandidateListModalProps {
  tranche: Tranche;
  isOpen: boolean;
  onClose: () => void;
}

export function CandidateListModal({
  tranche,
  isOpen,
  onClose,
}: CandidateListModalProps) {
  const [selectedCandidate, setSelectedCandidate] =
    useState<CandidateProfile | null>(null);

  // If a candidate is selected, show the detail view instead of the list
  if (selectedCandidate) {
    return (
      <CandidateDetailView
        candidate={selectedCandidate}
        onBack={() => setSelectedCandidate(null)}
        onClose={onClose}
      />
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col p-0 gap-0">
        <DialogHeader className="p-6 border-b">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
            <Briefcase className="h-4 w-4" />
            <span>{tranche.name}</span>
          </div>
          <DialogTitle className="text-2xl">
            Candidates Application List
          </DialogTitle>
          <DialogDescription>
            Review and manage the {MOCK_CANDIDATES.length} applications for this
            tranche.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Input placeholder="Search candidates..." className="max-w-sm" />
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-3">
              {MOCK_CANDIDATES.map((candidate) => (
                <div
                  key={candidate._id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors cursor-pointer group"
                  onClick={() => setSelectedCandidate(candidate)}
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10 border">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${candidate.personalInformation.prenom} ${candidate.personalInformation.nom}`}
                      />
                      <AvatarFallback>
                        {candidate.personalInformation.prenom[0]}
                        {candidate.personalInformation.nom[0]}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-base">
                          {candidate.personalInformation.prenom}{" "}
                          {candidate.personalInformation.nom}
                        </h4>
                        <Badge
                          variant="outline"
                          className={`capitalize text-[10px] h-5 px-1.5 border ${
                            candidate.status === "accepted"
                              ? "bg-green-500 text-white border-transparent"
                              : candidate.status === "rejected"
                              ? "bg-orange-500 text-white border-transparent"
                              : "bg-yellow-50 text-yellow-800 border-yellow-400"
                          }`}
                        >
                          {candidate.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />{" "}
                          {candidate.personalInformation.email}
                        </span>
                        <span>•</span>
                        <span>
                          Applied:{" "}
                          {new Date(candidate.appliedDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
