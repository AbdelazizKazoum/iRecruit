"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RecruitmentSession } from "@/types/recruitment-session.types";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  Clock,
  StickyNote,
  CheckCircle2,
  XCircle,
  Hash,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ShowSessionModalProps {
  session: RecruitmentSession | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShowSessionModal({
  session,
  open,
  onOpenChange,
}: ShowSessionModalProps) {
  if (!session) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden gap-0">
        <div className="bg-muted/30 p-6 pb-4 border-b">
          <DialogHeader className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <DialogTitle className="text-xl font-bold flex items-center gap-2">
                  <Hash className="h-5 w-5 text-primary" />
                  {session.yearLabel}
                </DialogTitle>
                <p className="text-sm text-muted-foreground ml-7">
                  Recruitment Session Details
                </p>
              </div>
              <Badge
                variant={session.isActive ? "default" : "secondary"}
                className={
                  session.isActive
                    ? "bg-green-600 hover:bg-green-700 border-transparent px-3 py-1"
                    : "px-3 py-1"
                }
              >
                {session.isActive ? (
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Active</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <XCircle className="h-3.5 w-3.5" />
                    <span>Inactive</span>
                  </div>
                )}
              </Badge>
            </div>
          </DialogHeader>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1.5 p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <CalendarDays className="h-4 w-4" />
                Start Date
              </div>
              <div className="text-lg font-semibold pl-6">
                {format(new Date(session.startDate), "MMMM d, yyyy")}
              </div>
            </div>
            <div className="flex flex-col space-y-1.5 p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <CalendarDays className="h-4 w-4" />
                End Date
              </div>
              <div className="text-lg font-semibold pl-6">
                {format(new Date(session.endDate), "MMMM d, yyyy")}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <StickyNote className="h-4 w-4 text-primary" />
              Description
            </div>
            <div className="rounded-md bg-muted/50 p-4 text-sm leading-relaxed min-h-[80px]">
              {session.description || (
                <span className="text-muted-foreground italic">
                  No description provided.
                </span>
              )}
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground bg-muted/20 -mx-6 -mb-6 p-4 border-t">
            <div className="flex items-center gap-2 pl-2">
              <Clock className="h-3.5 w-3.5" />
              Created: {format(new Date(session.createdAt), "PPP p")}
            </div>
            <div className="flex items-center gap-2 justify-end pr-2">
              <Clock className="h-3.5 w-3.5" />
              Last Updated: {format(new Date(session.updatedAt), "PPP p")}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
