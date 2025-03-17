"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import styles from "./BrandingSection.module.css";
import TitleContainer from "../../Shared/TitleContainer/TitleContainer";
import Image from "next/image";

export default function BrandingSection() {
  const router = useRouter();
  const pathname = usePathname();

  const brands = [
    { name: "GSK", logo: "https://i.ibb.co.com/wZrG2302/pngwing-com-2.png" },
    {
      name: "Merck",
      logo: "https://i.ibb.co.com/j9Z688nJ/62cd6d6d55d69259cb08dc53624ab35c.png",
    },
    // {
    //   name: "Roche",
    //   logo: "https://i.ibb.co.com/HL32kRhg/kisspng-roche-diagnostics-roche-holding-ag-blood-glucose-m-pharma-5acfb9296b3c97-1203857115235627934.pn",
    // },

    { name: "Pfizer", logo: "https://i.ibb.co.com/v4bJWR2k/pngwing-com-3.png" },
    {
      name: "Novartis",
      logo: "https://i.ibb.co.com/C55Hs8FP/pngwing-com-4.png",
    },
    {
      name: "AstraZeneca",
      logo: "https://i.ibb.co.com/6c7R3js2/pngwing-com-5.png",
    },
    { name: "Sanofi", logo: "https://i.ibb.co.com/ksqGzHpB/pngwing-com-6.png" },
  ];

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
        className={`${styles.container} relative w-full py-20 text-center g`}
      >

        {/* Brand Infinity Slide */}
        <div
          className={`absolute bottom-0  left-0 w-full py-4 ${styles.infinityLoopContainer}`}
        >
          <div className={styles.infinityLoop}>
          {brands.map((brand, index) => (
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={100}
                  height={80}
                />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
