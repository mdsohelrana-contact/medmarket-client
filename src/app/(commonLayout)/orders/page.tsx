import OrderHistory from "@/components/Modules/pages/Order/OrderHistory";
import DemoBanner from "@/components/Modules/Shared/DemoBanner/DemoBanner";
import { getOrdersByUserId } from "@/utils/actions/orders";



const OrderHistoryPage = async () => {
  const { data: ordersHistory } = await getOrdersByUserId();


  return (
    <div className="my-10">
      <DemoBanner
        title="Your orders "
        description="
      Your orders description 
      "
      imagePath="/images/orders2.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Orders", href: "/orders" },
        ]}
      />
      <OrderHistory orders={ordersHistory || null} />
    </div>
  );
};

export default OrderHistoryPage;
