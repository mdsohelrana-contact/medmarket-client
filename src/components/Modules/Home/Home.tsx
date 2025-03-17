"use client";
import { IMedicine } from "@/types/medicinesTypes";
import ProductCard from "../Shared/Product/ProductCard";
import Banner from "./Banner/Banner";
import TitleContainer from "../Shared/TitleContainer/TitleContainer";
import { PackageSearch } from "lucide-react";
import BrandingSection from "./Banner/BrandingSection";
import ReviewSection from "./ReviewSection/ReviewSection";
import FeaturesSection from "./Banner/FeaturesSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = ({ medicines }: { medicines: IMedicine[] }) => {
  return (
    <div className="my-7 px-4  lg:px-8">
    <Banner/>

      <div className="mt-7">
        <TitleContainer
          title="Your Trusted Online Pharmacy"
          description="Find high-quality medicines, health essentials, and wellness products at the best prices. Fast delivery, secure payments, and expert advice – all in one place."
        />
      </div>

      <div className="mt-12">
        {/* Show medicines data using grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {medicines?.length > 0 ? (
            medicines
              ?.slice(0, 4)
              .map((medicine: IMedicine) => (
                <ProductCard key={medicine._id} medicine={medicine} />
              ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <PackageSearch className="text-gray-400 text-6xl mb-4" />
              <p className="text-gray-500 text-lg font-medium">
                No medicines available
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <Button>
            <Link href="/shop">Shop here</Link>{" "}
          </Button>
        </div>
      </div>

      <div className="mt-16">
        <FeaturesSection />
      </div>

      <div className="mt-12">
        <TitleContainer
          title=" What customers are saying"
          description="
          See what our satisfied customers are saying about our online pharmacy.
        "
        />
        <ReviewSection />
      </div>
    </div>
  );
};

export default Home;
