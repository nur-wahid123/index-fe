"use client"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { toTitleCase } from "@/source/util/util"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Page({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pathArray = pathname.split('/').filter((segment) => segment);
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
                <Breadcrumb>
                  <BreadcrumbList>
                    {pathArray.map((segment, index) => {
                      const path = '/' + pathArray.slice(0, index + 1).join('/');
                      const isLast = index === pathArray.length - 1;
                      if(segment === "master"){
                        return (
                          ''
                        )
                      }

                      return (
                        <div key={index} className="flex items-center">
                          {!isLast ? (
                            <>
                              <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href={path}>
                                  {toTitleCase(segment)}
                                </BreadcrumbLink>
                              </BreadcrumbItem>
                              <BreadcrumbSeparator className="hidden md:block" />
                            </>
                          ) : (
                            <BreadcrumbItem>
                              <BreadcrumbPage>
                                {toTitleCase(segment)}
                              </BreadcrumbPage>
                            </BreadcrumbItem>
                          )}
                        </div>
                      );
                    })}
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  )
}
