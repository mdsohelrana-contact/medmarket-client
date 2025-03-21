"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Pill, ShoppingCart, Minus, Plus, CreditCard } from "lucide-react"; // ShadCN UI Icons
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { IMedicine } from "@/types/medicinesTypes";
import { redirect } from "next/navigation";
import { createCheckout } from "@/utils/actions/payment";
import { addToCart } from "@/utils/actions/cart";
import useImageUploader from "@/utils/useImageUploader";
import SFormImageUpload from "../Form/SFormImageUpload";
import { FormProvider, useForm } from "react-hook-form";
import { decodedToken } from "@/utils/decodedToken";

const ProductDetails = ({ medicineData }: { medicineData: IMedicine }) => {
  const form = useForm();
  const { uploadImagesToCloudinary, isUploading } = useImageUploader();

  //   state for better performance
  const [quantity, setQuantity] = useState(1);
  const [prescription, setPrescription] = useState<File | File[]>([]);
  const [selectedStrength, setSelectedStrength] = useState(
    medicineData?.strength[0]
  );
  const [selectedDosageForm, setSelectedDosageForm] = useState(
    medicineData?.dosage_form[0]
  );

  // Handle Quantity Change
  const increaseQuantity = () => {
    if (quantity < medicine.stock) setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  // get token from local storage
  const token = localStorage.getItem("accessToken") as string;

  // Handle Add to Cart with productId and quantity
  const handleAddToCart = async () => {
    if (!token) {
      toast.error("Please login to add medicine to cart.");
      redirect("/login");
    }

    if (medicine.prescription_required && !prescription) {
      toast.warning("Please upload a valid prescription to proceed.");
      return;
    }

    const id = toast.loading("Adding to Cart...");

    if (
      medicine?.prescription_required &&
      Array.isArray(prescription) &&
      prescription.length === 0
    ) {
      return toast.warning(
        "Please upload a valid prescription to add to cart.",
        {
          id: id,
        }
      );
    }

    const uploadedImageUrl = await uploadImagesToCloudinary(
      prescription,
      false
    );

    try {
      const cartData = {
        medicineId: medicineData._id,
        quantity: quantity,
        medicineInfo: {
          strength: selectedStrength,
          dosageForm: selectedDosageForm,
          prescription: uploadedImageUrl,
        },
      };

      const response = await addToCart(cartData);

      if (response?.success) {
        toast.success("Added to Cart Successfully", { id: id });
      } else {
        toast.error(response.message || "Error adding to cart");
      }
    } catch (error) {
      toast.error("Error adding to cart");
    }
  };

  // Handle Buy Now with Prescription Upload
  const handleBuyNow = async () => {
    if (!token) {
      toast.error("Please login to buy now.");
      redirect("/login");
    }

    if (quantity > medicineData.stock) {
      toast.error("Not enough stock available. Please reduce the quantity.");
      return;
    }

    if (
      medicine.prescription_required &&
      Array.isArray(prescription) &&
      prescription.length === 0
    ) {
      toast.warning("Please upload a valid prescription to proceed.");
      return;
    }

    const uploadedImageUrl = await uploadImagesToCloudinary(
      prescription,
      false
    );
    const orderData = {
      medicines: [
        {
          medicineId: medicineData._id,
          quantity: quantity,
          medicineInfo: {
            strength: selectedDosageForm,
            dosageForm: selectedDosageForm,
            prescription: uploadedImageUrl,
          },
        },
      ],
    };

    const res = await createCheckout(orderData);

    console.log(res);

    if (res.success && res?.data?.redirectUrl) {
      toast.success("Processing for Purchase...");
      redirect(res?.data?.redirectUrl);
    } else {
      toast.error(res.message || "Something went wrong with the checkout.");
    }
  };

  const medicine = medicineData;
  return (
    <div className="max-w-5xl mx-auto my-10 shadow-lg rounded-lg">
      <FormProvider {...form}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
              <Pill className="w-8 h-8 text-blue-500 font-title" /> {medicine?.name}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Image Section */}
            <div className="flex justify-center">
              {medicine?.imageUrl &&
                medicine?.imageUrl.map((image) => (
                  <Image
                    src={image}
                    layout="responsive"
                    width={700}
                    height={500}
                    alt={medicine?.name}
                    className="rounded-lg w-full"
                  />
                ))}
            </div>

            <Separator />

            {/* Basic Info */}
            <div className="text-lg space-y-2">
              <p>
                <span className="font-semibold font-description text-gray-500">
                  Generic Name:
                </span>{" "}
                {medicine?.generic_name}
              </p>
              <p>
                <span className="font-semibold font-description text-gray-500">Category:</span>{" "}
                {medicine?.category}
              </p>
              <p>
                <span className="font-semibold font-description text-gray-500">
                  Symptoms Treated:
                </span>{" "}
                {medicine?.symptoms}
              </p>

              <p>
                <span className="font-semibold font-description text-gray-500">
                  Manufacturer By:
                </span>{" "}
                {medicine?.manufacturer_details || "Unknown Manufacturer"}
              </p>
              <p>
                <span className="font-semibold font-description text-gray-500">
                  Expiry date:
                </span>{" "}
                {medicine?.expiry_date || "No Expiry Date Available"}
              </p>
              <p>
                <span className="font-semibold font-description text-gray-500">Stock:</span>{" "}
                {medicine?.stock}
              </p>
            </div>

            {/* Prescription Upload */}
            {medicine?.prescription_required && (
              <SFormImageUpload
                control={form.control}
                name="imageUrl"
                label="Prescription Image"
                multiple={false}
                onImageUpload={setPrescription}
              />
            )}

            {/* Strength & Dosage Forms - Selectable */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <label
                  htmlFor="strength"
                  className="font-semibold font-description text-gray-500"
                >
                  Strength:
                </label>
                <select
                  id="strength"
                  value={selectedStrength}
                  onChange={(e) => setSelectedStrength(e.target.value)}
                  className="border border-gray-300 p-2 rounded"
                >
                  {medicine?.strength?.map((s: string, idx: number) => (
                    <option key={idx} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label
                  htmlFor="dosage_form"
                  className="font-semibold font-description text-gray-500"
                >
                  Dosage Form:
                </label>
                <select
                  id="dosage_form"
                  value={selectedDosageForm}
                  onChange={(e) => setSelectedDosageForm(e.target.value)}
                  className="border border-gray-300 p-2 rounded"
                >
                  {medicine?.dosage_form?.map((d: string, idx: number) => (
                    <option key={idx} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Separator />

            {/* Price & Quantity Selector */}
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-blue-600 font-title">
                ${medicine?.price}
              </p>

              {medicine?.stock === 0 ? (
                <span className="text-gray-500 font-description">Out of stock</span>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={decreaseQuantity}
                    disabled={quantity === 1}
                  >
                    <Minus className="w-6 h-6" />
                  </Button>
                  <Input
                    type="text"
                    value={quantity}
                    readOnly
                    className="w-14 text-center text-lg font-bold"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={increaseQuantity}
                    disabled={quantity >= medicine?.stock}
                  >
                    <Plus className="w-6 h-6" />
                  </Button>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <Button
                onClick={handleAddToCart}
                disabled={medicine?.stock === 0 || isUploading}
                className="font-description flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white text-lg py-3"
              >
                <ShoppingCart className="w-6 h-6" />
                Add to Cart
              </Button>

              <Button
                onClick={handleBuyNow}
                disabled={medicine?.stock === 0 || isUploading}
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white text-lg py-3 font-description"
              >
                <CreditCard className="w-6 h-6" />
                Buy Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </FormProvider>
    </div>
  );
};

export default ProductDetails;
