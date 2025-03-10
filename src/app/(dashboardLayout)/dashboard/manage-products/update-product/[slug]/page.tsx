"use client";
import UpdateProductForm from "@/components/Modules/pages/DashboardPages/Product/All-Products/UpdateProductData";
import { Skeleton } from "@/components/ui/skeleton";
import { getSingleProduct } from "@/utils/actions/products";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ProductUpdatePage = () => {
  const { slug } = useParams();
  const [medicineData, setMedicineData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); //

  useEffect(() => {
    const fetchData = async () => {
      const {data} = await getSingleProduct(slug as string);
      setMedicineData(data);

      setIsLoading(false);
    };

    fetchData();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="max-w-lg mx-auto mt-10 space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-5 w-1/2" />
      </div>
    );
  }

  // console.log(medicineData,"medicineData")

  return (
    <div>
      <UpdateProductForm medicine={medicineData} />
    </div>
  );
};

export default ProductUpdatePage;
