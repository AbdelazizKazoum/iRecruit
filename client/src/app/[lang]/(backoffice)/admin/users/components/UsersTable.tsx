"use client";

import React, { useDeferredValue, useEffect, useMemo, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Trash2,
  Eye,
} from "lucide-react";
import { getDictionary } from "@/utils/getDictionary";
import { format, type Locale as DateFnsLocale } from "date-fns";
import { enUS, fr, ar } from "date-fns/locale";
import { Locale } from "@/configs/i18n";
import { userService } from "@/services/userService";
import { UserType } from "@/types/user.types";

const localeMap: Record<Locale, DateFnsLocale> = {
  en: enUS,
  fr: fr,
  ar: ar,
};

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

type UserRow = UserType & {
  role?: string;
  status?: string;
  createdAt?: string | Date;
  avatar?: string;
};

interface UsersTableProps {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  lang: Locale;
  initialUsers?: UserRow[];
  initialError?: string | null;
  initialLoaded?: boolean;
}

export function UsersTable({
  dictionary,
  lang,
  initialUsers = [],
  initialError = null,
  initialLoaded = false,
}: UsersTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [users, setUsers] = useState<UserRow[]>(initialUsers);
  const [isLoading, setIsLoading] = useState(!initialLoaded);
  const [error, setError] = useState<string | null>(initialError);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);

  // Defer expensive filtering while the user is typing.
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const { usersPage } = dictionary;

  const normalizeRole = (role?: string) => {
    const normalized = role?.toLowerCase().trim() || "";
    if (normalized === "candidat") return "candidate";
    if (normalized === "recruteur") return "recruiter";
    if (normalized === "administrateur") return "admin";
    return normalized;
  };

  useEffect(() => {
    let isMounted = true;

    const loadUsers = async () => {
      if (initialLoaded) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const data = await userService.getUsers();
        if (!isMounted) return;
        setUsers(Array.isArray(data) ? data : []);
      } catch {
        if (!isMounted) return;
        setError("Failed to load users.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, [initialLoaded]);

  const filteredUsers = useMemo(() => {
    const normalizedSearch = deferredSearchTerm.trim().toLowerCase();
    const normalizedRole = roleFilter.toLowerCase();

    return users.filter((user) => {
      const name = user.username || "";
      const email = user.email || "";
      const matchesSearch =
        normalizedSearch.length === 0 ||
        name.toLowerCase().includes(normalizedSearch) ||
        email.toLowerCase().includes(normalizedSearch);
      const matchesRole =
        roleFilter === "all" ||
        normalizeRole(user.role) === normalizedRole;

      return matchesSearch && matchesRole;
    });
  }, [users, roleFilter, deferredSearchTerm]);

  // Reset to the first page when filters or page size change.
  useEffect(() => {
    setCurrentPage(1);
  }, [roleFilter, searchTerm, pageSize]);

  const totalUsers = filteredUsers.length;
  const totalPages = Math.max(1, Math.ceil(totalUsers / pageSize));
  const safePage = Math.min(currentPage, totalPages);

  useEffect(() => {
    if (currentPage !== safePage) {
      setCurrentPage(safePage);
    }
  }, [currentPage, safePage]);

  // Slice after filtering so pagination stays client-side.
  const paginatedUsers = useMemo(() => {
    const startIndex = (safePage - 1) * pageSize;
    return filteredUsers.slice(startIndex, startIndex + pageSize);
  }, [filteredUsers, pageSize, safePage]);

  const startIndex =
    totalUsers === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const endIndex =
    totalUsers === 0
      ? 0
      : Math.min(startIndex + pageSize - 1, totalUsers);
  const paginationSummary = usersPage.table.pagination.summary
    .replace("{start}", startIndex.toString())
    .replace("{end}", endIndex.toString())
    .replace("{total}", totalUsers.toString());
  const pageSummary = usersPage.table.pagination.pageSummary
    .replace("{current}", safePage.toString())
    .replace("{total}", totalPages.toString());

  // Keep page changes within bounds.
  const goToPage = (nextPage: number) => {
    setCurrentPage(Math.min(Math.max(nextPage, 1), totalPages));
  };

  // Actions
  const handleMakeAdmin = (userId: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user._id === userId ? { ...user, role: "admin" } : user
      )
    );
  };

  const handleRemoveAdmin = (userId: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user._id === userId ? { ...user, role: "candidate" } : user
      )
    );
  };

  const handleDeleteUser = (userId: string) => {
    setUsers((prev) => prev.filter((user) => user._id !== userId));
  };

  return (
    <div className="space-y-4">
      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card p-4 rounded-lg border shadow-sm">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={usersPage.table.filters.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={usersPage.table.filters.role} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{usersPage.table.filters.all}</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="candidate">Candidate</SelectItem>
              <SelectItem value="recruiter">Recruiter</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-md border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>{usersPage.table.headers.user}</TableHead>
              <TableHead>{usersPage.table.headers.role}</TableHead>
              <TableHead>{usersPage.table.headers.status}</TableHead>
              <TableHead>{usersPage.table.headers.joined}</TableHead>
              <TableHead className="text-right">
                {usersPage.table.headers.actions}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center">
                  {dictionary.buttons.loading}
                </TableCell>
              </TableRow>
            )}
            {!isLoading && error && (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center">
                  {error}
                </TableCell>
              </TableRow>
            )}
            {!isLoading &&
              !error &&
              paginatedUsers.map((user) => {
                const displayName =
                  user.username || user.email || "Unknown";
                const displayEmail = user.email || "—";
                const roleLabel = user.role || "—";
                const statusLabel = user.status || "—";
                const statusValue = user.status?.toLowerCase() || "";
                const joinedDate = user.createdAt
                  ? new Date(user.createdAt)
                  : null;
                const hasJoinedDate =
                  joinedDate && !Number.isNaN(joinedDate.getTime());
                const statusVariant =
                  statusValue === "active"
                    ? "default"
                    : statusValue === "inactive"
                    ? "secondary"
                    : statusValue === "banned"
                    ? "destructive"
                    : "secondary";

                return (
              <TableRow key={user._id || user.email || user.username}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border">
                      <AvatarImage src={user.avatar} alt={displayName} />
                      <AvatarFallback>
                        {displayName.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">
                        {displayName}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {displayEmail}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {normalizeRole(user.role) === "admin" && (
                      <ShieldCheck className="h-4 w-4 text-primary" />
                    )}
                    <span className="capitalize">{roleLabel}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={statusVariant}
                    className={
                      statusValue === "active"
                        ? "bg-green-100 text-green-700 hover:bg-green-100/80 dark:bg-green-900/30 dark:text-green-400"
                        : ""
                    }
                  >
                    {statusLabel}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {hasJoinedDate
                    ? format(joinedDate, "MMM dd, yyyy", {
                        locale: localeMap[lang],
                      })
                    : "—"}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() =>
                          navigator.clipboard.writeText(user._id || "")
                        }
                      >
                        Copy ID
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        {usersPage.table.actions.viewProfile}
                      </DropdownMenuItem>
                      {normalizeRole(user.role) !== "admin" ? (
                        <DropdownMenuItem
                          onClick={() => handleMakeAdmin(user._id || "")}
                        >
                          <Shield className="mr-2 h-4 w-4" />
                          {usersPage.table.actions.makeAdmin}
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          onClick={() => handleRemoveAdmin(user._id || "")}
                        >
                          <ShieldAlert className="mr-2 h-4 w-4" />
                          {usersPage.table.actions.removeAdmin}
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600 focus:bg-red-50"
                        onClick={() => handleDeleteUser(user._id || "")}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        {usersPage.table.actions.deleteUser}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
                );
              })}
          </TableBody>
        </Table>
        {!isLoading && !error && filteredUsers.length > 0 && (
          <div className="flex flex-col gap-3 border-t bg-card px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-muted-foreground">
              {paginationSummary}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {usersPage.table.pagination.rowsPerPage}
                </span>
                <Select
                  value={String(pageSize)}
                  onValueChange={(value) => setPageSize(Number(value))}
                >
                  <SelectTrigger className="h-8 w-[90px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PAGE_SIZE_OPTIONS.map((size) => (
                      <SelectItem key={size} value={String(size)}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {pageSummary}
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(safePage - 1)}
                    disabled={safePage <= 1}
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    {dictionary.stepper.previous}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(safePage + 1)}
                    disabled={safePage >= totalPages}
                  >
                    {dictionary.stepper.next}
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        {!isLoading && !error && filteredUsers.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            No users found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
}
