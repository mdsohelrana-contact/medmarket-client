"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { IMedicine } from "@/types/medicinesTypes";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

type CartItemProps = {
  item: {
    medicineId: IMedicine;
    quantity: number;
    medicineInfo: {
      dosageForm: string;
      prescription: string;
      strength: string;
    };
  };
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
};

export const CartItem = ({
  item,
  updateQuantity,
  removeItem,
}: CartItemProps) => {
  const [quantity, setQuantity] = useState(item.quantity);


  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
  };

  const handleUpdate = (id: string) => {
    const cartItem = {
      medicineId: item.medicineId._id,
      quantity: quantity,
    };

    updateQuantity(id, quantity);
  };

  const imageUrl = item?.medicineInfo?.prescription;

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center p-4 gap-4">
        <div className="flex items-center gap-4 justify-between flex-1">
          <div className="w-16 h-16 relative">
            {item?.medicineInfo?.prescription === "" ? (
              <p className="text-gray-400 font-semibold">Prescription not required</p>
            ) : (
              <Image
                src={imageUrl}
                alt={item.medicineId.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            )}
          </div>
          <div className="font-medium text-lg truncate">
            {item?.medicineId?.name}
          </div>

          <div className="font-medium text-lg ">
            <p>{item?.medicineInfo?.dosageForm}</p>

            <p>{item?.medicineInfo?.strength}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleUpdateQuantity(quantity - 1)}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <Input
            min={1}
            className="w-14 text-center"
            size={1}
            value={quantity}
            onChange={(e) => handleUpdateQuantity(Number(e.target.value))}
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleUpdateQuantity(quantity + 1)}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <span className="w-20 text-center text-lg font-semibold">
          ${quantity * item?.medicineId?.price}
        </span>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeItem(item?.medicineId?._id)}
        >
          <Trash2 className="w-5 h-5 text-red-500" />
        </Button>

        {quantity !== item.quantity && (
          <Button
            onClick={() => handleUpdate(item?.medicineId?._id)}
            size="sm"
            variant={"outline"}
          >
            Update
          </Button>
        )}
      </div>

      <Separator />
    </>
  );
};
