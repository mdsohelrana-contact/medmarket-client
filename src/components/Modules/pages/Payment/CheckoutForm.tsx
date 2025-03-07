"use client";
import React, { useState } from "react";
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

// CheckoutForm Component
const CheckoutForm = ({ cart }: { cart: TCart | null }) => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(checkoutFormSchema),
  });

  const handleSubmit = async (data: any) => {
    const medicineIds = cart?.items.map((item) => ({
      medicineId: item.medicineId._id,
      quantity: item.quantity,
    }));

    const orderData = {
      medicines: medicineIds,
      address: {
        city: data.city,
        country: data.country,
      },
      phoneNumber: data.phoneNumber,
    };

    try {
      const res = await createCheckout(orderData);

      if (res.success && res?.data?.redirectUrl) {
        toast.success("Processing for Purchase...");
        router.push(res?.data?.redirectUrl);
      }
    } catch (error) {
      toast.error("Something went wrong with the checkout.");
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
            {cart?.items?.map((item) => (
              <div key={item.medicineId?._id} className="flex justify-between ">
                <div>
                  <span className="flex-1 font-medium text-lg truncate">
                    {item?.medicineId?.name}
                  </span>
                </div>
                <div>
                  <span className="flex-1 font-medium text-lg truncate">
                    {item?.quantity} X
                  </span>
                </div>
                <div>
                  <span className="flex-1 font-medium text-lg truncate">
                    ${item?.medicineId?.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-bold text-xl mt-4 pt-4">
            <span>Total</span>
            <span>${cart?.totalPrice.toFixed(2) || 0}</span>
          </div>

          <Separator />
          {/* Form Fields */}
          <Form {...form}>
            {/* shipping address */}
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
                  placeholder="rajsha@example123.com"
                  label="City Name"
                />
                <SFormInput
                  control={form.control}
                  name="country"
                  placeholder="rajsha@example123.com"
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
