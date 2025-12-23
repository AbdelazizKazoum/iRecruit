import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Briefcase, FileText, TrendingUp, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Locale } from "@/configs/i18n";

// Mock Data - In a real app, this would come from an API
const stats = [
  {
    title: "Total Candidates",
    value: "2,345",
    change: "+180 from last month",
    icon: Users,
    trend: "up",
  },
  {
    title: "Active Job Offers",
    value: "45",
    change: "+5 new this week",
    icon: Briefcase,
    trend: "up",
  },
  {
    title: "Pending Applications",
    value: "128",
    change: "12 requires attention",
    icon: FileText,
    trend: "down",
  },
  {
    title: "Interviews Scheduled",
    value: "12",
    change: "For the next 3 days",
    icon: Clock,
    trend: "neutral",
  },
];

const recentApplications = [
  {
    id: 1,
    candidate: "Sarah Connor",
    role: "Senior Frontend Developer",
    date: "2 hours ago",
    status: "Pending",
  },
  {
    id: 2,
    candidate: "John Smith",
    role: "Backend Engineer",
    date: "4 hours ago",
    status: "Reviewed",
  },
  {
    id: 3,
    candidate: "Emily Blunt",
    role: "UI/UX Designer",
    date: "1 day ago",
    status: "Rejected",
  },
  {
    id: 4,
    candidate: "Michael Scott",
    role: "Regional Manager",
    date: "1 day ago",
    status: "Interview",
  },
];

export default function AdminDashboard({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s what&apos;s happening with your recruitment
          platform today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Applications */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>
              You have 128 total applications pending review.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {recentApplications.map((app) => (
                <div key={app.id} className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {app.candidate}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Applied for{" "}
                      <span className="font-medium text-foreground">
                        {app.role}
                      </span>
                    </p>
                  </div>
                  <div className="ml-auto font-medium text-sm text-muted-foreground">
                    {app.date}
                  </div>
                  <div
                    className={`ml-4 text-xs px-2 py-1 rounded-full 
                    ${
                      app.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                        : ""
                    }
                    ${
                      app.status === "Reviewed"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                        : ""
                    }
                    ${
                      app.status === "Rejected"
                        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                        : ""
                    }
                    ${
                      app.status === "Interview"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                        : ""
                    }
                  `}
                  >
                    {app.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions / Secondary Stats */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks you might want to perform.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button className="w-full justify-start" asChild>
              <Link href={`/${lang}/admin/job-offers/new`}>
                <Briefcase className="mr-2 h-4 w-4" />
                Post New Job Offer
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href={`/${lang}/admin/users/invite`}>
                <Users className="mr-2 h-4 w-4" />
                Invite Recruiter
              </Link>
            </Button>
            <Button
              variant="secondary"
              className="w-full justify-start"
              asChild
            >
              <Link href={`/${lang}/admin/settings`}>
                <TrendingUp className="mr-2 h-4 w-4" />
                View Analytics Report
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
