"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { XCircleIcon } from "lucide-react";

const PaymentCancel = () => {
  return (
    <div className="flex max-w-3xl mx-auto justify-center items-center min-h-screen  p-6">
      <div className="w-full bg-white shadow-xl rounded-lg p-10">
        {/* Payment Cancel Alert */}
        <Alert
          variant="destructive"
          className="flex items-center gap-4 p-6 rounded-lg bg-red-50 border-l-4 border-red-500"
        >
          {/* Align icon properly with text */}
          <div className="flex-shrink-0">
            <XCircleIcon className="w-16 h-16 text-red-600" />
          </div>
          <div>
            <AlertTitle className="text-2xl font-semibold text-red-800">
              Payment Cancelled
            </AlertTitle>
            <AlertDescription className="text-gray-700 mt-2">
              We encountered an issue with processing your payment. Please try
              again or contact support if the issue persists.
            </AlertDescription>
          </div>
        </Alert>

        {/* Retry Button */}
        <div className="mt-8 text-center">
          <Button
            variant="destructive"
            size="lg"
            className="bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 rounded-lg shadow-md transition-all duration-300"
          >
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
