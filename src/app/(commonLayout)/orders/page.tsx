import OrderHistory from "@/components/Modules/pages/Order/OrderHistory";
import DemoBanner from "@/components/Modules/Shared/DemoBanner/DemoBanner";
import { getOrdersByUserId } from "@/utils/actions/orders";



const OrderHistoryPage = async () => {
  const { data: ordersHistory } = await getOrdersByUserId();

  console.log("order history", ordersHistory);

  return (
    <div className="my-10">
      <DemoBanner
        title="Your orders "
        description="
      Your orders description 
      "
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Orders", href: "/orders" },
        ]}
      />
      <OrderHistory orders={ordersHistory} />
    </div>
  );
};

export default OrderHistoryPage;
