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

// const invoices = [
//   {
//     invoice: "INV001",
//     paymentStatus: "Paid",
//     totalAmount: "$250.00",
//     paymentMethod: "Credit Card",
//   },
//   {
//     invoice: "INV002",
//     paymentStatus: "Pending",
//     totalAmount: "$150.00",
//     paymentMethod: "PayPal",
//   },
//   {
//     invoice: "INV003",
//     paymentStatus: "Unpaid",
//     totalAmount: "$350.00",
//     paymentMethod: "Bank Transfer",
//   },
//   {
//     invoice: "INV004",
//     paymentStatus: "Paid",
//     totalAmount: "$450.00",
//     paymentMethod: "Credit Card",
//   },
//   {
//     invoice: "INV005",
//     paymentStatus: "Paid",
//     totalAmount: "$550.00",
//     paymentMethod: "PayPal",
//   },
//   {
//     invoice: "INV006",
//     paymentStatus: "Pending",
//     totalAmount: "$200.00",
//     paymentMethod: "Bank Transfer",
//   },
//   {
//     invoice: "INV007",
//     paymentStatus: "Unpaid",
//     totalAmount: "$300.00",
//     paymentMethod: "Credit Card",
//   },
// ];

const AllProductsTable = ({
  medicines,
  meta,
}: {
  medicines: IMedicine[];
  meta: IMeta;
}) => {

  // handle remove medicine
  const handleRemoveMedicine = async (medicineId: string) => {
    try {
      const res = await removeMedicine(medicineId);

      console.log("Remove Item Response:", res);

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
                  // onClick={() => removeItem(item?.medicineId?._id)}
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
