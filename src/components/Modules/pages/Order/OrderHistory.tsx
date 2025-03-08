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
import Link from "next/link"; // Import Link for clickable items
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const OrderHistory = ({ orders }: { orders: IOrderHistoryResponse }) => {
  const { meta, result, totalCost } = orders;
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // Handle View Details button
  const handleViewDetails = (order: any) => {
    setSelectedOrder(order);
  };

  return (
    <div className="container mx-auto p-5">
      {/* Order History Section */}
      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">
            Your Order History
          </CardTitle>

          {/* Display Total Cost */}
          {totalCost && (
            <div className="text-lg font-semibold text-gray-900">
              Total Cost: ${totalCost.toFixed(2)}
            </div>
          )}
        </CardHeader>
        <CardContent>
          {/* Order Table */}
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="text-lg">Product Name(s)</TableHead>
                <TableHead className="text-lg">Date</TableHead>
                <TableHead className="text-lg">Total</TableHead>
                <TableHead className="text-lg">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-lg">
                    No orders found.{" "}
                    <Button variant="link" className="ml-2">
                      Start Shopping
                    </Button>
                  </TableCell>
                </TableRow>
              ) : (
                result?.map((order) => (
                  <>
                    <TableRow key={order._id}>
                      <TableCell className="space-y-1">
                        {/* Display product names with link */}
                        <ul>
                          {order.medicines?.map((product: any) => (
                            <li
                              key={product._id}
                              className="text-blue-600 hover:underline"
                            >
                              <Link
                                href={`/shop/${product.medicineId._id}`}
                                className="text-md font-semibold"
                              >
                                {product.medicineId.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell className="text-gray-600 text-lg font-semibold">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-gray-800 font-semibold">
                        ${order.totalPrice.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        {(order.orderIntent === "mompleted" && (
                          <Badge color="success" className="ml-2">
                            Completed
                          </Badge>
                        )) ||
                          (order.orderIntent === "canceled" && (
                            <Badge color="danger" className="ml-2">
                              Canceled
                            </Badge>
                          )) ||
                          (order.orderIntent === "processing" && (
                            <Badge color="warning" className="ml-2">
                              Processing
                            </Badge>
                          )) || (
                            <Badge color="info" className="ml-2">
                              Pending
                            </Badge>
                          )}
                      </TableCell>
                    </TableRow>
                  </>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Optional Modal for Order Details */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Order Details
            </h3>
            <div className="space-y-4">
              <p className="text-lg">
                <strong>Order ID:</strong> {selectedOrder._id}
              </p>
              <p className="text-lg">
                <strong>Date:</strong>{" "}
                {new Date(selectedOrder.createdAt).toLocaleDateString()}
              </p>
              <p className="text-lg">
                <strong>Total Price:</strong> $
                {selectedOrder.totalPrice.toFixed(2)}
              </p>
              <p className="text-lg">
                <strong>Status:</strong> {selectedOrder.orderIntent}
              </p>
              <p className="text-lg">
                <strong>Product(s):</strong>
                <ul>
                  {selectedOrder.medicines?.map((product: any) => (
                    <li key={product._id}>{product.medicineId.name}</li>
                  ))}
                </ul>
              </p>
              <div className="mt-4 flex justify-end gap-4">
                <Button
                  variant="outline"
                  onClick={() => setSelectedOrder(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
