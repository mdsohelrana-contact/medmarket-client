"use client"; // Forces client-side rendering

import { useEffect, useState } from "react";
import AllOrdersTable from "@/components/Modules/pages/DashboardPages/Order/AllOrdersTable";
import DemoBanner from "@/components/Modules/Shared/DemoBanner/DemoBanner";
import { getAllOrders } from "@/utils/actions/orders";
import { IOrderHistoryResponse } from "@/types/orderTypes";

const ManageProductsPage = () => {
  const [orders, setOrders] = useState<IOrderHistoryResponse>({ meta: { page: 0, total: 0, totalPage: 0 }, result: [], totalCost: 0 });
  const [meta, setMeta] = useState({ page: 0, total: 0, totalPage: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders();
        if (response) {
          setOrders(response.data || []);
          setMeta(response.meta || {});
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div>Loading orders...</div>;

  return (
    <div>
      <DemoBanner title="Orders manage here..." description="All Orders show here" />
      <div className="p-5">
        <AllOrdersTable orders={orders} meta={meta} />
      </div>
    </div>
  );
};

export default ManageProductsPage;
