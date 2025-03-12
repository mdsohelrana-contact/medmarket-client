import ShopHome from "@/components/Modules/pages/Shop/ShopeHome";
import { getAllProducts } from "@/utils/actions/products";

const ShopPage = async () => {
  const { data,meta } = await getAllProducts();
  return (
    <div className="my-10">
      <ShopHome medicines={data} meta={meta} />
    </div>
  );
};

export default ShopPage;
