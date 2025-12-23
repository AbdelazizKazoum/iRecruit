"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  Briefcase,
  FileText,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  UserPlus,
  BarChart3,
  Search,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Locale } from "@/configs/i18n";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { getDictionary } from "@/utils/getDictionary";

// Mock Data
const recentApplications = [
  {
    id: 1,
    candidate: "Sarah Connor",
    role: "Senior Frontend Developer",
    date: "2h ago",
    status: "Pending",
    avatar: "/avatars/02.png",
    initials: "SC",
  },
  {
    id: 2,
    candidate: "John Smith",
    role: "Backend Engineer",
    date: "4h ago",
    status: "Reviewed",
    avatar: "/avatars/03.png",
    initials: "JS",
  },
  {
    id: 3,
    candidate: "Emily Blunt",
    role: "UI/UX Designer",
    date: "1d ago",
    status: "Rejected",
    avatar: "/avatars/04.png",
    initials: "EB",
  },
  {
    id: 4,
    candidate: "Michael Scott",
    role: "Regional Manager",
    date: "1d ago",
    status: "Interview",
    avatar: "/avatars/05.png",
    initials: "MS",
  },
  {
    id: 5,
    candidate: "Dwight Schrute",
    role: "Assistant to the RM",
    date: "2d ago",
    status: "Pending",
    avatar: "/avatars/06.png",
    initials: "DS",
  },
];

// const upcomingInterviews = [
//   {
//     id: 1,
//     candidate: "Alice Johnson",
//     role: "Product Manager",
//     time: "10:00 AM",
//     date: "Today",
//   },
//   {
//     id: 2,
//     candidate: "Bob Williams",
//     role: "DevOps Engineer",
//     time: "02:30 PM",
//     date: "Today",
//   },
//   {
//     id: 3,
//     candidate: "Charlie Brown",
//     role: "QA Tester",
//     time: "11:00 AM",
//     date: "Tomorrow",
//   },
// ];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

interface AdminDashboardContentProps {
  lang: Locale;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}

export default function AdminDashboardContent({
  lang,
  dictionary,
}: AdminDashboardContentProps) {
  const { adminDashboard } = dictionary;

  const stats = [
    {
      title: adminDashboard.stats.totalCandidates,
      value: "2,345",
      change: "+12%",
      trend: "up",
      icon: Users,
      description: adminDashboard.stats.vsLastMonth,
    },
    {
      title: adminDashboard.stats.activeJobOffers,
      value: "45",
      change: "+5",
      trend: "up",
      icon: Briefcase,
      description: adminDashboard.stats.newPositions,
    },
    {
      title: adminDashboard.stats.pendingApplications,
      value: "128",
      change: "-2%",
      trend: "down",
      icon: FileText,
      description: adminDashboard.stats.vsLastWeek,
    },
    {
      title: adminDashboard.stats.interviews,
      value: "12",
      change: "+4",
      trend: "up",
      icon: Clock,
      description: adminDashboard.stats.scheduledToday,
    },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {adminDashboard.title}
          </h1>
          <p className="text-muted-foreground mt-1">
            {adminDashboard.subtitle}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex">
            <Calendar className="mr-2 h-4 w-4" />
            {adminDashboard.last30Days}
          </Button>
          <Button size="sm" asChild>
            <Link href={`/${lang}/admin/job-offers/new`}>
              <Plus className="mr-2 h-4 w-4" />
              {adminDashboard.postJob}
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div key={index} variants={item}>
            <Card className="hover:shadow-md transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div
                  className={`p-2 rounded-full ${
                    index === 0
                      ? "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                      : index === 1
                      ? "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                      : index === 2
                      ? "bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400"
                      : "bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400"
                  }`}
                >
                  <stat.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs mt-1">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                  ) : stat.trend === "down" ? (
                    <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                  ) : (
                    <TrendingUp className="h-3 w-3 text-muted-foreground mr-1" />
                  )}
                  <span
                    className={
                      stat.trend === "up"
                        ? "text-green-500 font-medium"
                        : stat.trend === "down"
                        ? "text-red-500 font-medium"
                        : "text-muted-foreground"
                    }
                  >
                    {stat.change}
                  </span>
                  <span className="text-muted-foreground ml-1">
                    {stat.description}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Applications */}
        <motion.div variants={item} className="col-span-4">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{adminDashboard.recentApplications.title}</CardTitle>
                <CardDescription>
                  {adminDashboard.recentApplications.description}
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/${lang}/admin/applications`}>
                  {adminDashboard.recentApplications.viewAll}
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentApplications.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-9 w-9 border">
                        <AvatarImage src={app.avatar} alt={app.candidate} />
                        <AvatarFallback>{app.initials}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors">
                          {app.candidate}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {app.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div
                        className={`text-xs px-2.5 py-0.5 rounded-full font-medium border
                                ${
                                  app.status === "Pending"
                                    ? "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-900"
                                    : ""
                                }
                                ${
                                  app.status === "Reviewed"
                                    ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900"
                                    : ""
                                }
                                ${
                                  app.status === "Rejected"
                                    ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900"
                                    : ""
                                }
                                ${
                                  app.status === "Interview"
                                    ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900"
                                    : ""
                                }
                            `}
                      >
                        {app.status}
                      </div>
                      <div className="text-xs text-muted-foreground w-16 text-right">
                        {app.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column */}
        <div className="col-span-3 space-y-4">
          {/* Quick Actions */}
          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <CardTitle>{adminDashboard.quickActions.title}</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center gap-2 hover:border-primary hover:text-primary transition-colors"
                  asChild
                >
                  <Link href={`/${lang}/admin/job-offers/new`}>
                    <Briefcase className="h-5 w-5" />
                    <span className="text-xs">
                      {adminDashboard.quickActions.postJob}
                    </span>
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center gap-2 hover:border-primary hover:text-primary transition-colors"
                  asChild
                >
                  <Link href={`/${lang}/admin/users/invite`}>
                    <UserPlus className="h-5 w-5" />
                    <span className="text-xs">
                      {adminDashboard.quickActions.inviteUser}
                    </span>
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center gap-2 hover:border-primary hover:text-primary transition-colors"
                  asChild
                >
                  <Link href={`/${lang}/admin/applications`}>
                    <Search className="h-5 w-5" />
                    <span className="text-xs">
                      {adminDashboard.quickActions.search}
                    </span>
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center gap-2 hover:border-primary hover:text-primary transition-colors"
                  asChild
                >
                  <Link href={`/${lang}/admin/settings`}>
                    <BarChart3 className="h-5 w-5" />
                    <span className="text-xs">
                      {adminDashboard.quickActions.reports}
                    </span>
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Upcoming Interviews */}
          {/* <motion.div variants={item}>
            <Card>
              <CardHeader>
                <CardTitle>{adminDashboard.upcomingInterviews.title}</CardTitle>
                <CardDescription>
                  {adminDashboard.upcomingInterviews.next24Hours}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingInterviews.map((interview) => (
                    <div
                      key={interview.id}
                      className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0"
                    >
                      <div className="bg-primary/10 text-primary p-2 rounded-md">
                        <Clock className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">
                          {interview.candidate}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {interview.role}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-medium bg-muted px-1.5 py-0.5 rounded">
                            {interview.time}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {interview.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div> */}
        </div>
      </div>
    </motion.div>
  );
}
