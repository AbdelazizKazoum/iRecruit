"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Briefcase, Eye, Filter, Loader2, Mail } from "lucide-react";
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
import { CandidateProfile } from "./types";
import { Tranche } from "@/types/tranche.types";
import clientApi from "@/libs/clientApi";

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
  // Track candidate list state for the selected tranche.
  const [candidates, setCandidates] = useState<CandidateProfile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Reset modal state when a new tranche is opened.
  useEffect(() => {
    if (!isOpen) {
      return;
    }
    setSelectedCandidate(null);
    setSearchTerm("");
  }, [isOpen, tranche._id]);

  // Fetch candidates for the active tranche when the modal opens.
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    let isCancelled = false; // Avoid state updates after unmount.

    const loadCandidates = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const response = await clientApi.get<CandidateProfile[]>(
          `/application/tranche/${tranche._id}`
        );
        if (!isCancelled) {
          setCandidates(response.data);
        }
      } catch {
        if (!isCancelled) {
          setCandidates([]);
          setErrorMessage("Failed to load candidates. Please retry.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    loadCandidates();

    return () => {
      isCancelled = true;
    };
  }, [isOpen, tranche._id]);

  // Filter candidates client-side using the search term.
  const filteredCandidates = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      return candidates;
    }
    return candidates.filter((candidate) => {
      const fullName = `${candidate.personalInformation.prenom} ${candidate.personalInformation.nom}`;
      const email = candidate.personalInformation.email || "";
      return `${fullName} ${email}`.toLowerCase().includes(term);
    });
  }, [candidates, searchTerm]);

  // Keep the header count stable while loading data.
  const candidateCount = isLoading ? "..." : candidates.length;

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
            Review and manage the {candidateCount} applications for this
            tranche.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Input
                placeholder="Search candidates..."
                className="max-w-sm"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-3">
              {isLoading ? (
                <div className="flex justify-center py-10">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : errorMessage ? (
                <div className="text-sm text-red-600">{errorMessage}</div>
              ) : filteredCandidates.length === 0 ? (
                <div className="text-sm text-muted-foreground">
                  No applications found for this tranche.
                </div>
              ) : (
                filteredCandidates.map((candidate) => (
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
                          <span>ƒ?½</span>
                          <span>
                            Applied:{" "}
                            {new Date(
                              candidate.appliedDate
                            ).toLocaleDateString()}
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
                ))
              )}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
