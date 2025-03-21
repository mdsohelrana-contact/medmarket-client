"use client";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { IMeta } from "@/types/orderTypes";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface IPaginationProps {
  metadata: IMeta;
}

export function PaginationDemo({ metadata }: IPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Preserve existing query params
  const createQueryString = (params: Record<string, string | number>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([key, value]) => {
      newParams.set(key, value.toString());
    });
    return `${pathname}?${newParams.toString()}`;
  };

  // Get page number from URL or default to 1
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page < 1 || page > metadata.totalPage) return;
    setCurrentPage(page);
    router.push(createQueryString({ page }));
  };

  return (
    <div>
      {/* Pagination Controls */}
      <Pagination>
        <PaginationContent>
          {/* Previous Button */}
          <PaginationItem>
            <Button
              size="icon"
              variant="outline"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </PaginationItem>

          {/* Page Numbers */}
          {Array.from({ length: metadata.totalPage }).map((_, index) => {
            const pageNum = index + 1;
            return (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  isActive={currentPage === pageNum}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {/* Next Button */}
          <PaginationItem>
            <Button
              size="icon"
              variant="outline"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === metadata.totalPage}
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
