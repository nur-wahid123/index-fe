"use client"
import { AppSidebar } from "@/components/app-sidebar"
import "./../globals.css";
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import BreadCrumbData from "@/source/components/breadcrumbs.component"

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <BreadCrumbData/>
              </div>
            </header>
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </SidebarInset>
        </SidebarProvider>
        <Toaster/>
      </body>
    </html>
  )
}
