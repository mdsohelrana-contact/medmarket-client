"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Eye,
  Heart,
  Truck,
  BadgeDollarSign,
  EyeIcon,
} from "lucide-react";
import { IMedicine } from "@/types/medicinesTypes";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { addToCart } from "@/utils/actions/cart";

const ProductCard = ({ medicine }: { medicine: IMedicine }) => {
  // Handle Add to Cart with productId and quantity
  const handleAddToCart = async () => {
    const id = toast.loading("Adding to Cart...");

    try {
      const cartData = {
        medicineId: medicine?._id,
      };

      const response = await addToCart(cartData);

      if (response?.success) {
        toast.success("Added to Cart Successfully", { id: id });
      }
    } catch (error) {
      toast.error("Error adding to cart");
    }
  };

  return (
    <>
      <Card className="p-4 rounded-xl shadow-lg">
        {/* Product Image */}
        <div className="  rounded-lg flex items-center justify-center">
          {medicine?.imageUrl &&
            medicine?.imageUrl.map((image, index) => (
              <Image
                src={image}
                key={index}
                width={300}
                height={200}
                alt={medicine?.name}
                className="rounded-lg"
              />
            ))}
        </div>

        <CardContent className="mt-4">
          {/* Discount Badge */}
          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-lg">
            Up to 35% off
          </span>

          {/* Product Title */}
          <h2 className="mt-2 text-lg font-semibold">{medicine?.name}</h2>

          {/* Rating */}
          <div className="flex items-center space-x-1 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-yellow-400 text-sm">
                ★
              </span>
            ))}
            <span className="text-sm ml-1">5.0 (455)</span>
          </div>

          {/* Delivery & Price Badge */}
          <div className="flex items-center gap-2 text-sm mt-2 ">
            <div className="flex items-center">
              <Truck className="w-4 h-4 mr-1" /> Fast Delivery
            </div>
            <div className="flex items-center">
              <BadgeDollarSign className="w-4 h-4 mr-1" /> Best Price
            </div>
          </div>

          {/* Price & Add to Cart */}
          <div className="flex items-center justify-between mt-4">
            <span className="text-2xl font-bold">${medicine?.price}</span>
            <Link href={`/shop/${medicine?._id}`}>
              <Button
                onClick={handleAddToCart}
                variant={"default"}
                className=" flex items-center space-x-2"
              >
                <EyeIcon className="w-5 h-5" />
                <span>View Details</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ProductCard;
