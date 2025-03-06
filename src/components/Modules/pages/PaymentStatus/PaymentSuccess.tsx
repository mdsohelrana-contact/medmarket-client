"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { TOrder } from "@/types/paymentTypes";
import { CheckCircleIcon } from "lucide-react";
import Link from "next/link";

const PaymentSuccess = ({ orderDetails }: { orderDetails: TOrder }) => {
  const { _id, totalPrice, medicines } = orderDetails;

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="max-w-3xl w-full bg-white shadow-xl rounded-lg p-10">
        {/* Payment Success Alert */}
        <Alert
          variant="default"
          className="flex items-center gap-4 border-l-4 border-green-500 bg-green-50 p-4 rounded-lg"
        >
          <div className="flex-shrink-0">
            <CheckCircleIcon className="w-16 h-16 text-green-600" />
          </div>
          <div>
            <AlertTitle className="text-2xl font-semibold text-green-700">
              Payment Successful
            </AlertTitle>
            <AlertDescription className="text-gray-700 mt-2">
              Your payment has been processed successfully. Thank you for your
              purchase!
            </AlertDescription>
          </div>
        </Alert>

        {/* Order Details Section */}
        <div className="mt-8 space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">Order Details</h3>

          <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-semibold text-gray-800">{_id}</span>
            </div>
            <div>
              {medicines?.map((medicine) => (
                <div key={medicine?._id}>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Product Name:</span>
                    <span className="font-semibold text-gray-800">
                      {medicine?.medicineId?.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Quantity:</span>
                    <span className="font-semibold text-gray-800">
                      {medicine?.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Total Amount:</span>
              <span className="font-semibold text-green-600">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Return to Homepage Button */}
        <div className="mt-8 text-center">
          <Link href="/">
            <Button
              variant="default"
              size="lg"
              className="bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 rounded-lg shadow-md transition-all duration-300"
            >
              Return to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
