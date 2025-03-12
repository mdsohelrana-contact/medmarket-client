"use client";
import PaymentCancel from "@/components/Modules/pages/PaymentStatus/PaymentCancel";
import PaymentSuccess from "@/components/Modules/pages/PaymentStatus/PaymentSuccess";
import { checkPaymentStatus, getOrderData } from "@/utils/actions/payment";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [orderDetails, setOrderDetails] = useState<{ data: any } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    const fetchPaymentStatus = async () => {
      if (sessionId) {
        const checkId = {
          sessionId: sessionId,
        };
        try {
          const status = await checkPaymentStatus(checkId);

          if (status?.success && status?.data.orderId) {
            const orderData = await getOrderData(status?.data.orderId);

            setOrderDetails(orderData);
          }

          setPaymentStatus(status?.success);

          setLoading(false);
        } catch (error) {
          console.error("Failed to fetch payment status:", error);
        }
      }
    };

    fetchPaymentStatus();
  }, [sessionId]);

  const orderData = orderDetails?.data;

  return (
    <div className="my-14">
      {loading ? (
        <Loader2 />
      ) : paymentStatus ? (
        <PaymentSuccess orderDetails={orderData} />
      ) : (
        <PaymentCancel />
      )}
    </div>
  );
};

export default SuccessPage;
