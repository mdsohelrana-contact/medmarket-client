"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import BrandingSection from "./BrandingSection";

const Banner = () => {
  return (
    <section className="relative w-full py-5 border border-gray-200 rounded-md text-center">
      <div className=" mx-auto px-6">
        <h1 className="text-4xl font-extrabold mb-5 leading-tight">
          Discover the Perfect Medicine for You
        </h1>
        <p className="text-xl mb-8 opacity-80">
          Effortlessly search for medicines by name or category with our
          powerful search tool.
        </p>

        <Card className="mx-auto  shadow-lg rounded-lg overflow-hidden mb-5">
          <CardContent className="flex items-center gap-4 py-4">
            <Input
              type="text"
              placeholder="Search for medicines..."
              className="w-full text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
            />
            <Button className=" transition duration-200 ease-in-out py-3 px-6 rounded-lg flex items-center">
              <Search className="w-5 h-5 mr-3" />
              Search
            </Button>
          </CardContent>

          {/* branding section */}
        </Card>
          <div className="">
          <BrandingSection />
          </div>
      </div>
    </section>
  );
};

export default Banner;
