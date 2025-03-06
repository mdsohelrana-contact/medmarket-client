"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Eye, Heart, Truck, BadgeDollarSign } from "lucide-react";
import { IMedicine } from "@/types/medicinesTypes";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ medicine }: { medicine: IMedicine }) => {
  console.log(medicine);
  return (
    <>
      <Link href={`/shop/${medicine?._id}`}>
        <Card className="p-4 cursor-pointer  rounded-xl shadow-lg">
          {/* Product Image */}
          <div className="  rounded-lg flex items-center justify-center">
            <Image
              src={medicine?.imageUrl}
              width={300}
              height={200}
              alt={medicine?.name}
            />
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
              <Button
                variant={"default"}
                className=" flex items-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to cart</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </Link>
    </>
  );
};

export default ProductCard;
