"use client";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IMeta } from "@/types/orderTypes";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface IPaginationProps {
  metadata: IMeta;
}

export function PaginationDemo({ metadata }: IPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // console.log(metadata)

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

  // Get sort order from URL or default to ascending
  const [sortOrder, setSortOrder] = useState(searchParams.get("sort") || "price");

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page < 1 || page > metadata.totalPage) return;
    setCurrentPage(page);
    router.push(createQueryString({ page }));
  };

  // Handle sort change
  const handleSortChange = (value: string) => {
    setSortOrder(value);
    router.push(createQueryString({ sort: value, page: 1 })); 
  };

 

  return (
    <div>
     <div className="my-5">
       {/* Sorting Dropdown */}
       <Select onValueChange={handleSortChange} value={sortOrder}>
        <SelectTrigger>
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="-price">High Price</SelectItem>
            <SelectItem value="price">Low Price</SelectItem>
            <SelectItem value="-stock">High Stock</SelectItem>
            <SelectItem value="stock">Low Stock</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
     </div>

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
