"use client";

import styles from "./BrandingSection.module.css";

import Image from "next/image";

export default function BrandingSection() {


  const brands = [
    { name: "GSK", logo: "https://i.ibb.co.com/wZrG2302/pngwing-com-2.png" },
    {
      name: "Merck",
      logo: "https://i.ibb.co.com/j9Z688nJ/62cd6d6d55d69259cb08dc53624ab35c.png",
    },

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


  return (
    <section>
      <div
        className={`${styles.container} relative w-full py-20 text-center g`}
      >

        {/* Brand Infinity Slide */}
        <div
          className={`absolute bottom-0  left-0 w-full py-4 ${styles?.infinityLoopContainer}`}
        >
          <div className={styles.infinityLoop}>
          {brands?.map((brand, index) => (
                <Image
                  key={index}
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
