"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Command,
  Database,
  Frame,
  LifeBuoy,
  Map,
  NotebookPen,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  UtilityPoleIcon,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { PaperPlaneIcon } from "@radix-ui/react-icons"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Master",
      url: "#",
      icon: Database,
      isActive: true,
      items: [
        {
          title: "Subject",
          url: "/dashboard/master/subject",
        },
        {
          title: "Study Group",
          url: "/dashboard/master/study-group",
        },
        {
          title: "Student",
          url: "/dashboard/master/student",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Util",
      url: "/dashboard/util",
      icon: UtilityPoleIcon,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Report",
      url: "/dashboard/report",
      icon: NotebookPen,
      isActive: true,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">SMAN 1 Srengat</span>
                  <span className="truncate text-xs">Blitar</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
