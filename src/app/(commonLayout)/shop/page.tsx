import ShopHome from "@/components/Modules/pages/Shop/ShopeHome";
import { getAllProducts } from "@/utils/actions/products";

const ShopPage = async ({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) => {
  const { data } = await getAllProducts(undefined);
  return (
    <div className="my-10">
      <ShopHome medicines={data} />
    </div>
  );
};

export default ShopPage;
