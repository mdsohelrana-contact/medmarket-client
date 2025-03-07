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

const ProductDetails = ({ medicineData }: { medicineData: IMedicine }) => {
  //   state for better performance
  const [quantity, setQuantity] = useState(1);
  const [prescription, setPrescription] = useState<File | null>(null);
  const [selectedStrength, setSelectedStrength] = useState("");
  const [selectedDosageForm, setSelectedDosageForm] = useState("");

  // Handle Quantity Change
  const increaseQuantity = () => {
    if (quantity < medicine.stock) setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  // Handle Prescription Upload
  const handlePrescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPrescription(file);
  };

  // Handle Add to Cart with productId and quantity
  const handleAddToCart = async () => {
    const id = toast.loading("Adding to Cart...");

    try {
      const cartData = {
        medicineId: medicineData._id,
        quantity: quantity,
      };

      const response = await addToCart(cartData);

      if (response?.success) {
        toast.success("Added to Cart Successfully", { id: id });
      }
    } catch (error) {
      toast.error("Error adding to cart");
    }
  };

  // Handle Buy Now with Prescription Upload
  const handleBuyNow = async () => {
    // if (medicine.prescription_required && !prescription) {
    //   toast.warning("Please upload a valid prescription to proceed.");
    //   return;
    // }

    const orderData = {
      medicines: [
        {
          medicineId: medicineData._id,
          quantity: quantity,
          // strength: selectedStrength,
          // dosageForm: selectedDosageForm
        },
      ],
    };
    const res = await createCheckout(orderData);
    if (res.success && res?.data?.redirectUrl) {
      toast.success("Processing for Purchase...");
      redirect(res?.data?.redirectUrl);
    }
  };

  const medicine = medicineData;
  return (
    <div className="max-w-5xl mx-auto my-10 shadow-lg rounded-lg">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
            <Pill className="w-8 h-8 text-blue-500" /> {medicine?.name}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Image Section */}
          <div className="flex justify-center">
            <Image
              src={medicine?.imageUrl}
              alt={medicine?.name}
              width={500}
              height={300}
            />
          </div>

          <Separator />

          {/* Basic Info */}
          <div className="text-lg space-y-2">
            <p>
              <span className="font-semibold text-gray-500">Generic Name:</span>{" "}
              {medicine?.generic_name}
            </p>
            <p>
              <span className="font-semibold text-gray-500">Category:</span>{" "}
              {medicine?.category}
            </p>
            <p>
              <span className="font-semibold text-gray-500">
                Symptoms Treated:
              </span>{" "}
              {medicine?.symptoms}
            </p>
          </div>

          {/* Prescription Upload (if required) */}
          {medicine?.prescription_required && (
            <div className="space-y-2">
              <label className="block font-semibold text-gray-500">
                Upload Prescription
              </label>
              <Input
                type="file"
                accept="application/pdf,image/*"
                onChange={handlePrescriptionChange}
              />
              {prescription && (
                <p className="text-sm text-gray-500">
                  File uploaded: {prescription?.name}
                </p>
              )}
            </div>
          )}

          {/* Strength & Dosage Forms - Selectable */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <label htmlFor="strength" className="font-semibold text-gray-500">
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
                className="font-semibold text-gray-500"
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
            <p className="text-2xl font-bold text-blue-600">
              ${medicine?.price}
            </p>

            {medicine?.stock === 0 ? (
              <span className="text-gray-500">Out of stock</span>
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
              disabled={medicine?.stock === 0}
              className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white text-lg py-3"
            >
              <ShoppingCart className="w-6 h-6" />
              Add to Cart
            </Button>

            <Button
              onClick={handleBuyNow}
              disabled={medicine?.stock === 0}
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white text-lg py-3"
            >
              <CreditCard className="w-6 h-6" />
              Buy Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetails;
