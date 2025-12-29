"use client";

import React, { useState, useEffect } from "react";
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
  MoreHorizontal,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getDictionary } from "@/utils/getDictionary";
import { useUserStore } from "@/stores/useUserStore";
import { UserType } from "@/types/user.types";

// User Type (matches API response)
interface User extends UserType {
  role?: string;
}

interface UsersTableProps {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}

export function UsersTable({ dictionary }: UsersTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  console.log("🚀 ~ UsersTable ~ currentPage:", currentPage);
  const limit = 5;

  const { users, pagination, fetchUsers, isLoading } = useUserStore();
  const { usersPage } = dictionary;

  // Fetch users when filters or page change
  useEffect(() => {
    const params: {
      page?: number;
      limit?: number;
      role?: string;
      username?: string;
    } = { page: currentPage, limit };
    if (roleFilter !== "all") params.role = roleFilter;
    if (searchTerm.trim()) params.username = searchTerm.trim();

    fetchUsers(params);
  }, [currentPage, roleFilter, searchTerm, fetchUsers, limit]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1); // Reset to first page when searching
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle role filter change
  const handleRoleFilterChange = (value: string) => {
    setRoleFilter(value);
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Actions (placeholder - need API endpoints)
  const handleMakeAdmin = (userId: string) => {
    // TODO: Implement API call to update user role
    console.log("Make admin:", userId);
  };

  const handleRemoveAdmin = (userId: string) => {
    // TODO: Implement API call to update user role
    console.log("Remove admin:", userId);
  };

  const handleDeleteUser = (userId: string) => {
    // TODO: Implement API call to delete user
    console.log("Delete user:", userId);
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
          <Select value={roleFilter} onValueChange={handleRoleFilterChange}>
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
              <TableHead>Status</TableHead>
              <TableHead className="text-right">
                {usersPage.table.headers.actions}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  Loading users...
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-8 text-muted-foreground"
                >
                  No users found matching your filters.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id || user._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border">
                        <AvatarImage src="" alt={user.username} />
                        <AvatarFallback>
                          {user.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">
                          {user.username}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {(user as User).role === "admin" && (
                        <ShieldCheck className="h-4 w-4 text-primary" />
                      )}
                      <span className="capitalize">
                        {(user as User).role || "candidate"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="default"
                      className="bg-green-100 text-green-700 hover:bg-green-100/80 dark:bg-green-900/30 dark:text-green-400"
                    >
                      Active
                    </Badge>
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
                            navigator.clipboard.writeText(
                              user.id || user._id || ""
                            )
                          }
                        >
                          Copy ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          {usersPage.table.actions.viewProfile}
                        </DropdownMenuItem>
                        {(user as User).role !== "admin" ? (
                          <DropdownMenuItem
                            onClick={() =>
                              handleMakeAdmin(user.id || user._id || "")
                            }
                          >
                            <Shield className="mr-2 h-4 w-4" />
                            {usersPage.table.actions.makeAdmin}
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            onClick={() =>
                              handleRemoveAdmin(user.id || user._id || "")
                            }
                          >
                            <ShieldAlert className="mr-2 h-4 w-4" />
                            {usersPage.table.actions.removeAdmin}
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-600 focus:bg-red-50"
                          onClick={() =>
                            handleDeleteUser(user.id || user._id || "")
                          }
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          {usersPage.table.actions.deleteUser}
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

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between px-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
            {pagination.total} users
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page <= 1 || isLoading}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="flex items-center space-x-1">
              {pagination.totalPages <= 5
                ? // Show all pages if 5 or fewer
                  Array.from({ length: pagination.totalPages }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        disabled={isLoading}
                        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-8 px-3 text-xs ${
                          pageNum === pagination.page
                            ? "bg-primary text-primary-foreground shadow hover:bg-primary/90"
                            : "border border-primary text-primary bg-background shadow-sm hover:bg-primary hover:text-white-100"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })
                : // Show paginated view with current page centered
                  Array.from({ length: 5 }, (_, i) => {
                    const startPage = Math.max(
                      1,
                      Math.min(pagination.totalPages - 4, pagination.page - 2)
                    );
                    const pageNum = startPage + i;

                    if (pageNum > pagination.totalPages) return null;

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        disabled={isLoading}
                        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-8 px-3 text-xs ${
                          pageNum === pagination.page
                            ? "bg-primary text-primary-foreground shadow hover:bg-primary/90"
                            : "border border-primary text-primary bg-background shadow-sm hover:bg-primary hover:text-white-100"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages || isLoading}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
