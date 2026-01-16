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
import { Badge } from "@/components/ui/badge";
import {
  MoreHorizontal,
  Search,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  GitBranch,
  Briefcase,
} from "lucide-react";
import { getDictionary } from "@/utils/getDictionary";
import { useJobOffersStore } from "@/stores/useJobOffers.store";
import { Locale } from "@/configs/i18n";
import { JobOffersTableRowSkeleton } from "./JobOffersTableRowSkeleton";
import { useRouter } from "next/navigation"; // Assuming Next.js router

interface JobOffersTableProps {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  lang: Locale;
}

export function JobOffersTable({ dictionary, lang }: JobOffersTableProps) {
  const router = useRouter(); // For navigation to the new Dashboard
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [cityFilter, setCityFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  const { jobOffers, pagination, fetchJobOffers, loading } =
    useJobOffersStore();
  const { offersPage } = dictionary;

  // Fetch job offers when filters or page change
  useEffect(() => {
    const params: {
      page?: number;
      limit?: number;
      title?: string;
      department?: string;
      city?: string;
    } = { page: currentPage, limit };
    if (departmentFilter !== "all") params.department = departmentFilter;
    if (cityFilter !== "all") params.city = cityFilter;
    if (searchTerm.trim()) params.title = searchTerm.trim();

    fetchJobOffers(params);
  }, [
    currentPage,
    departmentFilter,
    cityFilter,
    searchTerm,
    fetchJobOffers,
    limit,
  ]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDepartmentFilterChange = (value: string) => {
    setDepartmentFilter(value);
    setCurrentPage(1);
  };

  const handleCityFilterChange = (value: string) => {
    setCityFilter(value);
    setCurrentPage(1);
  };

  // --- NEW NAVIGATION ACTION ---
  const handleManageRecruitment = (offerId: string) => {
    // Navigate to the new Sessions/Tranches Dashboard
    router.push(`/${lang}/admin/job-offers/${offerId}`);
  };

  const handleEditOffer = (offerId: string) => {
    console.log("Edit offer:", offerId);
  };

  const handleDeleteOffer = (offerId: string) => {
    console.log("Delete offer:", offerId);
  };

  return (
    <div className="space-y-4">
      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card p-4 rounded-lg border shadow-sm">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={offersPage.table.filters.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select
            value={departmentFilter}
            onValueChange={handleDepartmentFilterChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={offersPage.table.filters.department} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {offersPage.table.filters.all}
              </SelectItem>
              <SelectItem value="IT">IT</SelectItem>
              <SelectItem value="HR">HR</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>
          <Select value={cityFilter} onValueChange={handleCityFilterChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={offersPage.table.filters.city} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {offersPage.table.filters.all}
              </SelectItem>
              <SelectItem value="Casablanca">Casablanca</SelectItem>
              <SelectItem value="Rabat">Rabat</SelectItem>
              <SelectItem value="Marrakech">Marrakech</SelectItem>
              <SelectItem value="Fez">Fez</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Job Offers Table */}
      <div className="rounded-md border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className={lang === "ar" ? "text-right" : ""}>
                {offersPage.table.headers.title}
              </TableHead>
              <TableHead className={lang === "ar" ? "text-right" : ""}>
                {offersPage.table.headers.department}
              </TableHead>
              {/* Removed City from headers to reduce clutter if needed, or keep it */}
              <TableHead className={lang === "ar" ? "text-right" : ""}>
                {offersPage.table.headers.city}
              </TableHead>
              <TableHead className={lang === "ar" ? "text-right" : "text-left"}>
                Status
              </TableHead>
              <TableHead
                className={lang === "ar" ? "text-right" : "text-right"}
              >
                {offersPage.table.headers.actions}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: limit }).map((_, index) => (
                <JobOffersTableRowSkeleton key={index} />
              ))
            ) : jobOffers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className={`text-center py-8 text-muted-foreground ${
                    lang === "ar" ? "text-right" : ""
                  }`}
                >
                  No job offers found matching your filters.
                </TableCell>
              </TableRow>
            ) : (
              jobOffers.map((offer) => (
                <TableRow
                  key={offer._id}
                  className="group hover:bg-muted/30 cursor-pointer transition-colors"
                  onClick={() => handleManageRecruitment(offer._id || "")}
                >
                  <TableCell className={lang === "ar" ? "text-right" : ""}>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-md text-primary hidden sm:block">
                        <Briefcase className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {offer.title?.[lang] || offer.title?.en || "Untitled"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ID: {offer._id?.slice(0, 8)}...
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className={lang === "ar" ? "text-right" : ""}>
                    <Badge variant="outline" className="capitalize">
                      {offer.department?.[lang] ||
                        offer.department?.en ||
                        "N/A"}
                    </Badge>
                  </TableCell>
                  <TableCell className={lang === "ar" ? "text-right" : ""}>
                    <span className="capitalize text-sm text-muted-foreground">
                      {offer.city?.[lang] || offer.city?.en || "N/A"}
                    </span>
                  </TableCell>
                  <TableCell className={lang === "ar" ? "text-right" : ""}>
                    {/* Visual indicator for active recruitment */}
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      <span className="text-xs font-medium text-green-700 dark:text-green-400">
                        Active
                      </span>
                    </div>
                  </TableCell>
                  <TableCell
                    className={lang === "ar" ? "text-right" : "text-right"}
                  >
                    <div
                      className="flex justify-end items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Quick Action Button for Primary Use Case */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hidden md:flex h-8 gap-1 text-muted-foreground hover:text-primary"
                        onClick={() => handleManageRecruitment(offer._id || "")}
                      >
                        <GitBranch className="h-3.5 w-3.5" />
                        <span className="text-xs">Sessions</span>
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() =>
                              handleManageRecruitment(offer._id || "")
                            }
                          >
                            <GitBranch className="mr-2 h-4 w-4" />
                            Manage Sessions
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleEditOffer(offer._id || "")}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            {offersPage.table.actions.editOffer}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600 focus:text-red-600 focus:bg-red-50"
                            onClick={() => handleDeleteOffer(offer._id || "")}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            {offersPage.table.actions.deleteOffer}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination (Kept same logic as original) */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between px-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
            {pagination.total} job offers
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page <= 1 || loading}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            {/* Simplified Pagination for brevity in this example */}
            <span className="text-sm font-medium">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(Number(pagination.page) + 1)}
              disabled={pagination.page >= pagination.totalPages || loading}
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
