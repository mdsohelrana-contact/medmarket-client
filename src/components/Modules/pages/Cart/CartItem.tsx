"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { IMedicine } from "@/types/medicinesTypes";

import { Minus, Plus, SaveIcon, Trash2 } from "lucide-react";
import { useState } from "react";

type CartItemProps = {
  item: {
    medicineId: IMedicine;
    quantity: number;
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

  // handle update
  const handleUpdate = (id: string) => {
    const cartItem = {
      medicineId: item.medicineId._id,
      quantity: quantity,
    };

    console.log(cartItem)

    updateQuantity(id, quantity);
  };

  return (
    <>
      <div className="flex flex-wrap md:flex-nowrap justify-between items-center px-2 md:px-6">
        <span className="flex-1 font-medium text-lg truncate">
          {item?.medicineId?.name}
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleUpdateQuantity(quantity - 1)}
          >
            <Minus className="w-4 h-4" />
          </Button>
          {/* <span className="w-6 text-center text-lg">{item?.quantity}</span> */}

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
        <span className="w-20 text-right text-lg font-semibold">
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
