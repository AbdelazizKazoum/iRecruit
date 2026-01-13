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
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getDictionary } from "@/utils/getDictionary";
import { useJobOffersStore } from "@/stores/useJobOffers.store";
import { Locale } from "@/configs/i18n";
import { JobOffersTableRowSkeleton } from "./JobOffersTableRowSkeleton";

interface JobOffersTableProps {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  lang: Locale;
}

export function JobOffersTable({ dictionary, lang }: JobOffersTableProps) {
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
      setCurrentPage(1); // Reset to first page when searching
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle filter changes
  const handleDepartmentFilterChange = (value: string) => {
    setDepartmentFilter(value);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleCityFilterChange = (value: string) => {
    setCityFilter(value);
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Actions (placeholder - need API endpoints)
  const handleViewDetails = (offerId: string) => {
    // TODO: Implement view details
    console.log("View details:", offerId);
  };

  const handleEditOffer = (offerId: string) => {
    // TODO: Implement edit offer
    console.log("Edit offer:", offerId);
  };

  const handleDeleteOffer = (offerId: string) => {
    // TODO: Implement delete offer
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
              <SelectItem value="Tangier">Tangier</SelectItem>
              <SelectItem value="Agadir">Agadir</SelectItem>
              <SelectItem value="Meknes">Meknes</SelectItem>
              <SelectItem value="Oujda">Oujda</SelectItem>
              <SelectItem value="Kenitra">Kenitra</SelectItem>
              <SelectItem value="Tetouan">Tetouan</SelectItem>
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
              <TableHead className={lang === "ar" ? "text-right" : ""}>
                {offersPage.table.headers.city}
              </TableHead>
              <TableHead className={lang === "ar" ? "text-right" : ""}>
                {offersPage.table.headers.date}
              </TableHead>
              <TableHead className={lang === "ar" ? "text-right" : "text-left"}>
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
                <TableRow key={offer._id}>
                  <TableCell className={lang === "ar" ? "text-right" : ""}>
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">
                        {offer.title?.[lang] || offer.title?.en || "Untitled"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {offer.tag?.[lang] || offer.tag?.en || ""}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className={lang === "ar" ? "text-right" : ""}>
                    <span className="capitalize">
                      {offer.department?.[lang] ||
                        offer.department?.en ||
                        "N/A"}
                    </span>
                  </TableCell>
                  <TableCell className={lang === "ar" ? "text-right" : ""}>
                    <span className="capitalize">
                      {offer.city?.[lang] || offer.city?.en || "N/A"}
                    </span>
                  </TableCell>
                  <TableCell className={lang === "ar" ? "text-right" : ""}>
                    <Badge
                      variant="default"
                      className="bg-blue-100 text-blue-700 hover:bg-blue-100/80 dark:bg-blue-900/30 dark:text-blue-400"
                    >
                      {new Date(offer.datePublication).toLocaleDateString()}
                    </Badge>
                  </TableCell>
                  <TableCell
                    className={lang === "ar" ? "text-right" : "text-left"}
                  >
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
                            navigator.clipboard.writeText(offer._id || "")
                          }
                        >
                          Copy ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleViewDetails(offer._id || "")}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          {offersPage.table.actions.viewDetails}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleEditOffer(offer._id || "")}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          {offersPage.table.actions.editOffer}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-600 focus:bg-red-50"
                          onClick={() => handleDeleteOffer(offer._id || "")}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          {offersPage.table.actions.deleteOffer}
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
            <div className="flex items-center space-x-1">
              {pagination.totalPages <= 5
                ? // Show all pages if 5 or fewer
                  Array.from({ length: pagination.totalPages }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        disabled={loading}
                        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-8 px-3 text-xs ${
                          pageNum === currentPage
                            ? "bg-primary-500 text-white-300 shadow hover:bg-primary/90"
                            : "border border-primary-500 text-primary-500 bg-background shadow-sm hover:bg-primary hover:text-white-100"
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
                        disabled={loading}
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
