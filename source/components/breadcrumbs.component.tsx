"use client"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { toTitleCase } from "../util/util";
import { usePathname } from "next/navigation";

export default function BreadCrumbData(){
    const pathname = usePathname();
    const pathArray = pathname.split('/').filter((segment) => segment);
  
    return(
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
    )
}