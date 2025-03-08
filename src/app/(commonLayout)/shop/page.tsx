import ShopHome from "@/components/Modules/pages/Shop/ShopeHome";
import { getAllProducts } from "@/utils/actions/products";
import React from "react";

const ShopPage = async () => {
  const { data } = await getAllProducts();

  console.log(data, "from shop page");

  return (
    <div className="my-10">
      <ShopHome medicines={data} />
    </div>
  );
};

export default ShopPage;
