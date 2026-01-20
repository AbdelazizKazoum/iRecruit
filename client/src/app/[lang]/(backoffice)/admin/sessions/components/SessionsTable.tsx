/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Search, Eye, Edit, Trash2, Plus } from "lucide-react";
import { getDictionary } from "@/utils/getDictionary";
import { Locale } from "@/configs/i18n";
import { useRecruitmentSession } from "@/stores/useRecruitmentSessionStore";
import { format } from "date-fns";
import { CreateSessionModal } from "./CreateSessionModal";
import { EditSessionModal } from "./EditSessionModal";
import { ShowSessionModal } from "./ShowSessionModal";
import { RecruitmentSession } from "@/types/recruitment-session.types";

interface SessionsTableProps {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  lang: Locale;
}

export function SessionsTable({ dictionary, lang }: SessionsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const { sessions, loading, fetchSessions, deleteSession } =
    useRecruitmentSession();

  const [selectedSession, setSelectedSession] =
    useState<RecruitmentSession | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isShowOpen, setIsShowOpen] = useState(false);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this session?")) {
      await deleteSession(id);
    }
  };

  const handleEdit = (session: RecruitmentSession) => {
    setSelectedSession(session);
    setIsEditOpen(true);
  };

  const handleShow = (session: RecruitmentSession) => {
    setSelectedSession(session);
    setIsShowOpen(true);
  };

  const filteredSessions = sessions.filter((session) =>
    session.yearLabel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Header with Add Button and Search */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <CreateSessionModal>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Session
            </Button>
          </CreateSessionModal>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search sessions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-64"
          />
        </div>
      </div>

      {/* Sessions Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Year Label</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24">
                  Loading...
                </TableCell>
              </TableRow>
            ) : filteredSessions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24">
                  No sessions found.
                </TableCell>
              </TableRow>
            ) : (
              filteredSessions.map((session) => (
                <TableRow key={session._id}>
                  <TableCell className="font-medium">
                    {session.yearLabel}
                  </TableCell>
                  <TableCell>
                    {format(new Date(session.startDate), "yyyy-MM-dd")}
                  </TableCell>
                  <TableCell>
                    {format(new Date(session.endDate), "yyyy-MM-dd")}
                  </TableCell>
                  <TableCell>
                    <Badge variant={session.isActive ? "default" : "secondary"}>
                      {session.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => {
                            setTimeout(() => handleShow(session), 100);
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            // Small timeout to allow the dropdown to close properly before opening the dialog
                            // preventing pointer-events: none from getting stuck on body
                            setTimeout(() => handleEdit(session), 100);
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDelete(session._id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <EditSessionModal
        session={selectedSession}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />

      <ShowSessionModal
        session={selectedSession}
        open={isShowOpen}
        onOpenChange={setIsShowOpen}
      />
    </div>
  );
}
