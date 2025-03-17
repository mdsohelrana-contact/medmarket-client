"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { TCart } from "@/types/cartTypes";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import SFormInput from "../../Shared/Form/SFormInput";
import { checkoutFormSchema } from "./checkoutValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCheckout } from "@/utils/actions/payment";
import { useRouter } from "next/navigation";

// Define the form data type
interface FormData {
  phoneNumber: string;
  city: string;
  country: string;
}

interface CheckoutFormProps {
  cart: TCart | null;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ cart }) => {
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      phoneNumber: "",
      city: "",
      country: "",
    },
  });

  const handleSubmit = async (data: FormData) => {
    const medicines = cart?.items?.map((item) => ({
      medicineId: item.medicineId._id,
      quantity: item.quantity,
      medicineInfo: {
        dosageForm: item.medicineInfo?.dosageForm || "",
        strength: item.medicineInfo?.strength || "",
        prescription: item.medicineInfo?.prescription || "",
      },
    }));

    const orderData = {
      medicines,
      address: {
        city: data.city,
        country: data.country,
      },
      phoneNumber: data.phoneNumber,
    };

    console.log(orderData, "from response: ");

    try {
      const res = await createCheckout(orderData);

      console.log(res, "Check response");

      if (res.success && res.data?.redirectUrl) {
        toast.success("Processing for Purchase...");
        router.push(res.data.redirectUrl);
      } else {
        throw new Error(res.message || "Unknown error during checkout.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Please order maximum 2 items in your single checkout");
    }
  };

  return (
    <div className="my-10 max-w-5xl mx-auto">
      <Card className="shadow-xl p-6 rounded-lg">
        <CardHeader className="text-center text-3xl font-bold p-4">
          Checkout
        </CardHeader>
        <Separator />
        <CardContent className="space-y-4 mt-5">
          {/* Order Details Section */}
          <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>
          <div className="space-y-2 text-lg">
            {cart && cart.items && cart.items.length > 0 ? (
              cart.items.map((item) => (
                <div
                  key={item.medicineId?._id}
                  className="flex justify-between"
                >
                  <span className="font-medium text-lg truncate">
                    {item?.medicineId?.name}
                  </span>
                  <span>{item?.quantity} X</span>
                  <span>${item?.medicineId?.price}</span>
                </div>
              ))
            ) : (
              <p>No items in cart</p>
            )}
          </div>
          <div className="flex justify-between font-bold text-xl mt-4 pt-4">
            <span>Total</span>
            <span>${cart?.totalPrice?.toFixed(2) || 0}</span>
          </div>

          <Separator />
          {/* Form Fields */}
          <Form {...form}>
            <h3 className="text-2xl font-semibold mb-4">Shipping Address</h3>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="space-y-4 mt-5">
                <SFormInput
                  control={form.control}
                  name="phoneNumber"
                  placeholder="015555555"
                  label="Phone Number"
                />
                <SFormInput
                  control={form.control}
                  name="city"
                  placeholder="City Name"
                  label="City Name"
                />
                <SFormInput
                  control={form.control}
                  name="country"
                  placeholder="Country Name"
                  label="Country Name"
                />
              </div>
              <div className="flex justify-center mt-6">
                <Button
                  type="submit"
                  className="w-full md:w-1/2 py-3 text-lg bg-blue-600 hover:bg-blue-700"
                >
                  Complete Checkout
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutForm;
