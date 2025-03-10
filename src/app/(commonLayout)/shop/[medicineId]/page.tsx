"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductDetails from "@/components/Modules/Shared/Product/ProductDetails";
import { getSingleProduct } from "@/utils/actions/products";
import { Skeleton } from "@/components/ui/skeleton";

const MedicineDetails = () => {
  const { medicineId } = useParams();
  const [medicineData, setMedicineData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); //

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSingleProduct(medicineId as string);
      setMedicineData(data);

      setIsLoading(false);
    };

    fetchData();
  }, [medicineId]);

  if (isLoading) {
    return (
      <div className="max-w-lg mx-auto mt-10 space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-5 w-1/2" />
      </div>
    );
  }
  return (
    <div className="my-10">
      <ProductDetails medicineData={medicineData?.data} />
    </div>
  );
};

export default MedicineDetails;
