"use client"
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import styles from "./BrandingSection.module.css";
import TitleContainer from "../../Shared/TitleContainer/TitleContainer";

export default function BrandingSection() {
  const router = useRouter();
  const pathname = usePathname();
  
  // State to hold search parameters
  const [searchParams, setSearchParams] = useState({
    name: "",
    category: "",
    symptoms: "",
  });

  // Handle the input change for search fields
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Update the searchParams state
    setSearchParams((prev) => {
      const updatedParams = { ...prev, [name]: value };

      // Build the query string from updated searchParams
      const query = new URLSearchParams(updatedParams).toString();

      // Update the URL with the query string
      router.push(`${pathname}?${query}`);

      return updatedParams; // Return updated state
    });
  };

  return (
    <section>
      <div
        className={`${styles.container} relative w-full py-20 text-center border rounded-lg`}
      >
        <div className="max-w-3xl mx-auto px-6">
          <TitleContainer
            title="Discover the Perfect Medicine for You"
            description="Effortlessly search for medicines by name, category, or symptoms with our powerful search tool."
          />

          <Card className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <CardContent className="flex items-center gap-4 py-4">
              <Input
                name="name"
                type="text"
                placeholder="Search by name..."
                className="w-full text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                onChange={handleSearchChange}
                value={searchParams.name}
              />
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700 transition duration-200 ease-in-out py-3 px-6 rounded-lg flex items-center"
                onClick={() => {
                  const query = new URLSearchParams(searchParams).toString();
                  router.push(`${pathname}?${query}`);
                }}
              >
                <Search className="w-5 h-5 mr-3" />
                Search
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Brand Infinity Slide */}
        <div
          className={`absolute bottom-0 left-0 w-full py-4 ${styles.infinityLoopContainer}`}
        >
          <div className={styles.infinityLoop}>
            <div>Brand 1</div>
            <div>Brand 2</div>
            <div>Brand 3</div>
            <div>Brand 4</div>
            <div>Brand 5</div>
            {/* Add more brand names as necessary */}
          </div>
        </div>
      </div>
    </section>
  );
}
