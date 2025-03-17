"use client";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DemoBanner = ({
  title,
  description,
  imagePath,
  breadcrumbs,
}: {
  title: string;
  description: string;
  imagePath?: string;
  breadcrumbs?: { label: string; href: string }[];
}) => {
  const currentPath = usePathname();
  return (
    <div
      className="relative flex items-center justify-center h-[300px] md:h-[400px] lg:h-[500px] bg-cover bg-center text-center "
      style={{ backgroundImage: `url(${imagePath || "/images/banner.jpg"})`,
         borderRadius: '20px'
       }}
    >
      <div className="absolute rounded-md inset-0 bg-black bg-opacity-70"></div>
      <div className="relative z-10 max-w-3xl px-6 md:px-12 ">
        <h2 className="mb-4 font-title text-3xl md:text-5xl font-bold text-white">
          {title}
        </h2>
        <p className="text-lg md:text-xl font-description text-gray-300 mb-3">
          {description}
        </p>

        <div className="flex justify-center mb-5">
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs?.map((breadcrumb, index) => (
                <>
                  <BreadcrumbItem key={index}>
                    {breadcrumb.href === currentPath ? (
                      <span className="font-description text-lg font-semibold text-white">
                        {breadcrumb.label}
                      </span>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link
                          className="font-description text-lg font-semibold "
                          href={breadcrumb?.href}
                        >
                          {breadcrumb?.label}
                        </Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                </>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </div>
  );
};

export default DemoBanner;
