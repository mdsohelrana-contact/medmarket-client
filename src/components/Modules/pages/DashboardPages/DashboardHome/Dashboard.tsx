import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IDashboardAnalytics } from "@/types/dashboardTypes";
import { ArrowUpRight } from "lucide-react";

interface DashboardProps {
  data: IDashboardAnalytics;
}

const Dashboard = ({ data }: DashboardProps) => {
  // Define the metrics to display in the dashboard cards
  const metrics = [
    { title: "Total Orders", value: data?.totalOrders || 0 },
    { title: "Pending Orders", value: data?.totalPendingOrders || 0 },
    { title: "Total Revenue", value: `$${data?.totalRevenue?.toFixed(2) || "0.00"}` },
    { title: "Total Users", value: data?.totalUsers || 0 },
  ];

  return (
    <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {/* Render metrics cards */}
      {metrics.map((item, index) => (
        <Card
          key={index}
          className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-lg font-semibold text-gray-700">
              {item.title}
            </CardTitle>
            <ArrowUpRight className="w-5 h-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900">
              {item.value}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Dashboard;