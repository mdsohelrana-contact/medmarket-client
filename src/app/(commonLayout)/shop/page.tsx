import ShopHome from "@/components/Modules/pages/Shop/ShopeHome";
import { getAllProducts } from "@/utils/actions/products";

const ShopPage = async () => {
  const { data,meta } = await getAllProducts();
  return (
    <div className="mt-14 md:mt-10">
      <ShopHome medicines={data} meta={meta} />
    </div>
  );
};

export default ShopPage;
