import AllOrdersTable from '@/components/Modules/pages/DashboardPages/Order/AllOrdersTable'
import DemoBanner from '@/components/Modules/Shared/DemoBanner/DemoBanner';
import { getAllOrders } from '@/utils/actions/orders';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const ManageProductsPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const query = await searchParams;

  const { data: orders, meta } = await getAllOrders();

  return (
    <div>

      <DemoBanner title='Orders manage here...' description='All Orders show here' />

      <div className='p-5'>

      <AllOrdersTable orders={orders} meta={meta}/>
      </div>
    </div>
  )
}

export default ManageProductsPage