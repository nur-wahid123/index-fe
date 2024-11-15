"use client"

import * as React from "react"
import {
  Command,
  Database,
  NotebookPen,
  Send,
  Tags,
  User,
  Users,
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
import { axiosInstance } from "@/source/util/request.util"
import ENDPOINT from "@/source/config/url"
import { JwtPayload } from "@/source/types/jwt-payload.interface"
import Link from "next/link"

const data = {
  navMain: [
    {
      title: "Master Data",
      url: "#",
      icon: Database,
      isActive: true,
      items: [
        {
          title: "Mata Pelajaran",
          icon: Tags,
          url: "/dashboard/master/subject",
        },
        {
          title: "Kelas",
          icon: NotebookPen,
          url: "/dashboard/master/class",
        },
        {
          title: "Rombongan Belajar",
          icon: Users,
          url: "/dashboard/master/study-group",
        },
        {
          title: "Siswa",
          icon: User,
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
  const [user, setUser] = React.useState<JwtPayload>({
    email:"",
    sub:0,
    username:"",
    avatar:""
  });
  const fetchUser = React.useCallback(async () => {
     await axiosInstance.get(ENDPOINT.GET_PROFILE).then((res) => {
       setUser(res.data.data);
     })
     .catch(err => console.log(err));
  },[])
  React.useEffect(() => {
    fetchUser();
  },[])
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">SMAN 1 Srengat</span>
                  <span className="truncate text-xs">Blitar</span>
                </div>
              </Link>
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
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
