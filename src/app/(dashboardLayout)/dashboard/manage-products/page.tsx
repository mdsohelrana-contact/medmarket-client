import AllProductsTable from "@/components/Modules/pages/DashboardPages/Product/All-Products/AllProductsTable";
import DemoBanner from "@/components/Modules/Shared/DemoBanner/DemoBanner";
import { getAllProducts } from "@/utils/actions/products";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const ManageProductsPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const query = await searchParams;

  const { data: medicines, meta } = await getAllProducts(query);

  return (
    <div className="">
      <div className="px-3">
        <DemoBanner
          title="Manage All-Products Here"
          description="This is all products manage page"
          imagePath="/images/products.jpg"
        />
      </div>
      <div className="p-5">
        <AllProductsTable medicines={medicines} meta={meta} />
      </div>
    </div>
  );
};

export default ManageProductsPage;
