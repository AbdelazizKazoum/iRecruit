"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import { getDictionary } from "@/utils/getDictionary";
import { format, type Locale as DateFnsLocale } from "date-fns";
import { enUS, fr, ar } from "date-fns/locale";
import { Locale } from "@/configs/i18n";

const localeMap: Record<Locale, DateFnsLocale> = {
  en: enUS,
  fr: fr,
  ar: ar,
};

// Mock Data Type
interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "candidate" | "recruiter";
  status: "active" | "inactive" | "banned";
  joinedAt: Date;
  avatar?: string;
}

// Mock Data
const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "admin",
    status: "active",
    joinedAt: new Date("2023-01-15"),
    avatar: "/avatars/01.png",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    role: "candidate",
    status: "active",
    joinedAt: new Date("2023-02-20"),
    avatar: "/avatars/02.png",
  },
  {
    id: "3",
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "recruiter",
    status: "inactive",
    joinedAt: new Date("2023-03-10"),
    avatar: "/avatars/03.png",
  },
  {
    id: "4",
    name: "Diana Prince",
    email: "diana@example.com",
    role: "candidate",
    status: "active",
    joinedAt: new Date("2023-04-05"),
    avatar: "/avatars/04.png",
  },
  {
    id: "5",
    name: "Evan Wright",
    email: "evan@example.com",
    role: "candidate",
    status: "banned",
    joinedAt: new Date("2023-05-12"),
    avatar: "/avatars/05.png",
  },
];

interface UsersTableProps {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  lang: Locale;
}

export function UsersTable({ dictionary, lang }: UsersTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [users, setUsers] = useState<User[]>(MOCK_USERS);

  const { usersPage } = dictionary;

  // Filter Logic
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  // Actions
  const handleMakeAdmin = (userId: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, role: "admin" } : user
      )
    );
  };

  const handleRemoveAdmin = (userId: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, role: "candidate" } : user
      )
    );
  };

  const handleDeleteUser = (userId: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId));
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
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        {user.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">
                        {user.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {user.role === "admin" && (
                      <ShieldCheck className="h-4 w-4 text-primary" />
                    )}
                    <span className="capitalize">{user.role}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      user.status === "active"
                        ? "default"
                        : user.status === "inactive"
                        ? "secondary"
                        : "destructive"
                    }
                    className={
                      user.status === "active"
                        ? "bg-green-100 text-green-700 hover:bg-green-100/80 dark:bg-green-900/30 dark:text-green-400"
                        : ""
                    }
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {format(user.joinedAt, "MMM dd, yyyy", {
                    locale: localeMap[lang],
                  })}
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
                        onClick={() => navigator.clipboard.writeText(user.id)}
                      >
                        Copy ID
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        {usersPage.table.actions.viewProfile}
                      </DropdownMenuItem>
                      {user.role !== "admin" ? (
                        <DropdownMenuItem
                          onClick={() => handleMakeAdmin(user.id)}
                        >
                          <Shield className="mr-2 h-4 w-4" />
                          {usersPage.table.actions.makeAdmin}
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          onClick={() => handleRemoveAdmin(user.id)}
                        >
                          <ShieldAlert className="mr-2 h-4 w-4" />
                          {usersPage.table.actions.removeAdmin}
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600 focus:bg-red-50"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        {usersPage.table.actions.deleteUser}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredUsers.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            No users found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
}
