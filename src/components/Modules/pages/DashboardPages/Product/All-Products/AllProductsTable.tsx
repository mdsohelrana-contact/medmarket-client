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
import { useRouter } from "next/navigation";

const AllProductsTable = ({
  medicines,
  meta,
}: {
  medicines: IMedicine[];
  meta: IMeta;
}) => {
  const router = useRouter();

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

  // handle update medicine
  const handleUpdateMedicine = (medicineId: string) => {
    console.log(medicineId, "for update medicine");
    router.push(`/dashboard/manage-products/update-product/${medicineId}`);
  };

  return (
    <>
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
