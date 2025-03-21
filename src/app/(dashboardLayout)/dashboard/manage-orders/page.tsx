"use client"; // Forces client-side rendering

import { useEffect, useState } from "react";
import AllOrdersTable from "@/components/Modules/pages/DashboardPages/Order/AllOrdersTable";
import DemoBanner from "@/components/Modules/Shared/DemoBanner/DemoBanner";
import { getAllOrders } from "@/utils/actions/orders";
import { IOrderHistoryResponse } from "@/types/orderTypes";
import { Skeleton } from "@/components/ui/skeleton";

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

  if (loading) {
    return (
      <div className="w-full text-center px-5">
        <DemoBanner title="Manage orders here..." description="All users" />
        <section className="mx-5">
          <div className="flex flex-col gap-4">
            {/* Table Header Skeleton */}
            <Skeleton className="h-10 w-full rounded-lg" />
            {/* Table Rows Skeleton */}
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="h-16 w-full rounded-lg" />
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="">
     <div className="px-3">
     <DemoBanner title="Manage orders here..." description="All Orders show here" imagePath="/images/orders.jpg" />
     </div>
      <div className="p-5">
        <AllOrdersTable orders={orders} meta={meta} />
      </div>
    </div>
  );
};

export default ManageProductsPage;
