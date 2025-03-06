import { IMedicine } from "@/types/medicinesTypes";
import ProductCard from "../Shared/Product/ProductCard";
import Banner from "./Banner/Banner";

import TitleContainer from "../Shared/TitleContainer/TitleContainer";
import { PackageSearch } from "lucide-react";
import { getAllProducts } from "@/utils/actions/products";

const Home = async () => {
  const { data: medicines } = await getAllProducts();

  return (
    <div className="my-10">
      <Banner />

      <div>
        <TitleContainer
          title="Your Trusted Online Pharmacy"
          description="Find high-quality medicines, health essentials, and wellness products at the best prices. Fast delivery, secure payments, and expert advice – all in one place."
        />

        <div>
          {/* show medicines data use grid  */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {medicines?.length > 0 ? (
              medicines?.map((medicine: IMedicine) => (
                <ProductCard key={medicine._id} medicine={medicine} />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-10">
                <PackageSearch className="text-gray-400 text-6xl mb-4" />
                <p className="text-gray-500 text-lg font-medium">
                  No medicines available
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
