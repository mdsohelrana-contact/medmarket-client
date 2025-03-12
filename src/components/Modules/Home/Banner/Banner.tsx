"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import BrandingSection from "./BrandingSection";

const Banner = () => {
  return (
    <section className="relative w-full py-20 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-center">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-extrabold mb-5 leading-tight">
          Discover the Perfect Medicine for You
        </h1>
        <p className="text-xl mb-8 opacity-80">
          Effortlessly search for medicines by name or category with our
          powerful search tool.
        </p>

        <Card className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-5">
          <CardContent className="flex items-center gap-4 py-4">
            <Input
              type="text"
              placeholder="Search for medicines..."
              className="w-full text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
            />
            <Button className="bg-blue-600 text-white hover:bg-blue-700 transition duration-200 ease-in-out py-3 px-6 rounded-lg flex items-center">
              <Search className="w-5 h-5 mr-3" />
              Search
            </Button>
          </CardContent>

          {/* branding section */}
        </Card>
          <BrandingSection />
      </div>
    </section>
  );
};

export default Banner;
