"use client";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IMeta, IOrderHistoryResponse, Order } from "@/types/orderTypes";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PaginationDemo } from "../Product/All-Products/DemoPagination";
import { updateOrderIntentStatus } from "@/utils/actions/orders";
import Image from "next/image";
import { CardHeader } from "@/components/ui/card";
import { useState } from "react";

const AllOrdersTable = ({
  orders,
}: {
  orders: IOrderHistoryResponse;
  meta: IMeta;
}) => {
  const router = useRouter();

  // Function to update order intent
  const handleUpdateIntent = async (orderId: string, newIntent: string) => {
    try {
      const updateStatus = {
        intentStatus: newIntent,
      };

      const res = await updateOrderIntentStatus(updateStatus, orderId);
      if (res.success) {
        toast.success(res.message);
        router.refresh(); // Refresh the page or refetch data
      } else {
        toast.error(res.message || "Failed to update order intent.");
      }
    } catch (error) {
      toast.error("Failed to update order intent.");
    }
  };

  return (
    <div className="rounded-md border shadow-sm">
      <CardHeader>
        <div className="text-xl font-semibold font-title">
          Total Orders :{" "}
          <span className="text-blue-600 font-title text-xl">
            {orders?.meta?.total}
          </span>
        </div>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow>
            {/* <TableHead className="">userId</TableHead> */}
            <TableHead>Rx</TableHead>
            <TableHead>Order-Intent</TableHead>
            <TableHead>Payment-Status</TableHead>
            <TableHead className="text-right">Total Amount</TableHead>
            <TableHead className="text-right">Update-Intent</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.result?.map((order) => {
            const isEditable =
              ["pending", "processing", "shipped"].includes(
                order?.orderIntent
              ) && order?.transactionInfo?.paymentStatus === "paid";

            return (
              <TableRow key={order?._id} className="font-medium">
                {/* <TableCell>{order?.userId}</TableCell> */}
                <TableCell>
                  <div className="w-16 h-16 relative">
                    {order?.medicines?.map((item) =>
                      item.medicineInfo.prescription === "" ? (
                        <p className="text-sm py-5">Rx not required</p>
                      ) : (
                        <Image
                          src={item?.medicineInfo.prescription}
                          alt={item.medicineId.name}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-lg"
                        />
                      )
                    )}
                  </div>
                </TableCell>

                <TableCell>
                  {order.orderIntent === "delivered" ? (
                    <Badge className="bg-green-700 text-white font-bold ">
                      Delivered
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className=" font-bold ">
                      {order?.orderIntent}
                    </Badge>
                  )}
                </TableCell>

                <TableCell>
                  {order?.transactionInfo.paymentStatus === "paid" ? (
                    <Badge className="bg-green-700 text-white font-bold ">
                      Paid
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className=" font-bold ">
                      {order?.orderIntent}
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className=" font-bold ">
                    ${order?.totalPrice.toFixed(2)}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                  {isEditable ? (
                    <>
                      {order.orderIntent === "pending" && (
                        <Button
                          onClick={() =>
                            handleUpdateIntent(order._id, "processing")
                          }
                          className="bg-blue-500"
                        >
                          Mark as Processing
                        </Button>
                      )}
                      {order.orderIntent === "processing" && (
                        <Button
                          onClick={() =>
                            handleUpdateIntent(order._id, "shipped")
                          }
                          variant="outline"
                        >
                          Mark as Shipped
                        </Button>
                      )}
                      {order.orderIntent === "shipped" && (
                        <Button
                          onClick={() =>
                            handleUpdateIntent(order._id, "delivered")
                          }
                          className="bg-green-500"
                        >
                          Mark as Delivered
                        </Button>
                      )}
                    </>
                  ) : (
                    <Badge className="bg-green-700 text-white font-bold">
                      Delivered
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="my-2">
        <PaginationDemo metadata={orders?.meta} />
      </div>
    </div>
  );
};

export default AllOrdersTable;
