"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { IOrderHistoryResponse } from "@/types/orderTypes";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PaginationDemo } from "../DashboardPages/Product/All-Products/DemoPagination";

const OrderHistory = ({ orders }: { orders: IOrderHistoryResponse }) => {
  const { result = [], totalCost = 0 } = orders || {};


  return (
    <div className="container mx-auto p-5">
      {result.length === 0 ? (
        <div>
          <Card className="w-full max-w-5xl shadow-xl p-6 rounded-lg">
            <CardHeader className="text-center text-2xl font-bold p-4 font-title">
              Your Order History
            </CardHeader>
            <Separator />
            <CardContent className="space-y-4 mt-5 text-center overflow-x-auto">
              <p className="font-description">No items in your order history.</p>
              <div>
                <Link href="/">
                  <Button
                    variant="outline"
                    className="w-full py-3 text-lg  transition-colors font-description"
                  >
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card className=" shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold font-title">
              Your Order History
            </CardTitle>
            {totalCost > 0 && (
              <div className="text-lg font-semibold  mt-2 font-description">
                Total Cost:{" "}
                <span className="text-blue-600 font-title">${totalCost.toFixed(2)}</span>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-lg font-semibold font-title ">
                    Product Name(s)
                  </TableHead>
                  <TableHead className="text-lg font-semibold font-title">Date</TableHead>
                  <TableHead className="text-lg font-semibold font-title">
                    Total
                  </TableHead>
                  <TableHead className="text-lg font-semibold font-title">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.map((order) => (
                  <TableRow
                    key={order?._id || Math.random()}
                    className=" transition-colors"
                  >
                    <TableCell className="space-y-1">
                      <ul>
                        {order?.medicines?.map((product: any) => (
                          <li
                            key={product?._id || Math.random()}
                            className="text-blue-600 hover:underline"
                          >
                            <Link
                              href={`/shop/${product?.medicineId?._id}`}
                              className="text-md font-semibold font-description"
                            >
                              {product?.medicineId?.name || "Unknown Product"}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell className="text-lg font-semibold font-title">
                      {order?.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : "N/A"}
                    </TableCell>
                    <TableCell className="font-semibold font-title">
                      ${order?.totalPrice?.toFixed(2) || "0.00"}
                    </TableCell>
                    <TableCell className="font-description">
                      {order?.orderIntent === "completed" ? (
                        <Badge className="bg-green-500 text-white">
                          Completed
                        </Badge>
                      ) : order?.orderIntent === "canceled" ? (
                        <Badge className="bg-red-500 text-white">
                          Canceled
                        </Badge>
                      ) : order?.orderIntent === "processing" ? (
                        <Badge className="bg-yellow-500 text-black">
                          Processing
                        </Badge>
                      ) : (
                        <Badge className="bg-blue-500 text-white">
                          Pending
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

          <div className="mt-5">
          <PaginationDemo metadata={orders.meta} />
          </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OrderHistory;
