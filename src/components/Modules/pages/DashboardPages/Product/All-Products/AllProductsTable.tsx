"use client";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IMedicine } from "@/types/medicinesTypes";
import { PaginationDemo } from "./DemoPagination";
import { IMeta } from "@/types/orderTypes";
import { Edit, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { removeMedicine } from "@/utils/actions/products";
import { toast } from "sonner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const AllProductsTable = ({
  medicines,
  meta,
}: {
  medicines: IMedicine[];
  meta: IMeta;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // handle remove medicine
  const handleRemoveMedicine = async (medicineId: string) => {
    try {
      const res = await removeMedicine(medicineId);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message || "Failed to remove item");
      }
    } catch (error) {
      toast.error("Something went wrong while removing the item");
      console.error(error);
    }
  };

  // Preserve existing query params
  const createQueryString = (params: Record<string, string | number>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([key, value]) => {
      newParams.set(key, value.toString());
    });
    return `${pathname}?${newParams.toString()}`;
  };

  // Get sort order from URL or default to ascending
  const [sortOrder, setSortOrder] = useState(
    searchParams.get("sort") || "price"
  );

  // handle update medicine
  const handleUpdateMedicine = (medicineId: string) => {
    console.log(medicineId, "for update medicine");
    router.push(`/dashboard/manage-products/update-product/${medicineId}`);
  };

  // Handle sort change
  const handleSortChange = (value: string) => {
    setSortOrder(value);
    router.push(createQueryString({ sort: value, page: 1 }));
  };

  return (
    <>
      <div className="my-5 text-center mx-auto">
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Name</TableHead>
            <TableHead>Need RX</TableHead>
            <TableHead>In-Stock</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Update</TableHead>
            <TableHead className="text-right">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medicines?.map((medicine) => (
            <TableRow key={medicine?._id} className="font-medium">
              <TableCell>{medicine?.name}</TableCell>

              {medicine?.prescription_required ? (
                <TableCell className="">
                  <Badge variant="default">Yes</Badge>
                </TableCell>
              ) : (
                <TableCell className="">
                  {" "}
                  <Badge variant="outline">No</Badge>
                </TableCell>
              )}
              <TableCell>{medicine?.stock}</TableCell>
              <TableCell className="text-right">${medicine?.price}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveMedicine(medicine?._id)}
                >
                  <Trash2 className="w-6 h-6 text-red-500" />
                </Button>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleUpdateMedicine(medicine?._id)}
                >
                  <Edit className="w-6 h-6 " />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="text-lg">
            <TableCell colSpan={3}>Total Medicines</TableCell>
            <TableCell className="text-right">{meta.total}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="my-2">
        <PaginationDemo metadata={meta} />
      </div>
    </>
  );
};

export default AllProductsTable;
