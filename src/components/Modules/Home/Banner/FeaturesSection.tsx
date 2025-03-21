import { CheckCircleIcon } from "lucide-react";
import React from "react";
import TitleContainer from "../../Shared/TitleContainer/TitleContainer";

const FeaturesSection = () => {
  return (
    <div className="px-6 mx-auto text-center  lg:px-36 pt-10 pb-16 border rounded-lg shadow-lg">
      <TitleContainer
        title="Why Choose Us"
        description="We're committed to providing the best possible experience for our customers."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-start items-center gap-12 ">
        <div className="flex items-center space-x-6 hover:scale-105 transition-transform duration-300 ease-in-out">
          <CheckCircleIcon className="text-green-500 w-14 h-14" />
          <p className="font-medium font-description text-lg">
            Affordable medicines for everyone
          </p>
        </div>
        <div className="flex items-center space-x-6 hover:scale-105 transition-transform duration-300 ease-in-out">
          <CheckCircleIcon className="text-green-500 w-14 h-14" />
          <p className="font-medium font-description text-lg">
            Automatic refills, delivered to your door
          </p>
        </div>
        <div className="flex items-center space-x-6 hover:scale-105 transition-transform duration-300 ease-in-out">
          <CheckCircleIcon className="text-green-500 w-14 h-14" />
          <p className="font-medium font-description text-lg">
            24/7 support from certified pharmacists
          </p>
        </div>
        <div className="flex items-center space-x-6 hover:scale-105 transition-transform duration-300 ease-in-out">
          <CheckCircleIcon className="text-green-500 w-14 h-14" />
          <p className="font-medium font-description text-lg">
            Quick and reliable delivery service
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
