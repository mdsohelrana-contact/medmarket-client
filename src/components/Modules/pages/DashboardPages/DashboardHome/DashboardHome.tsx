"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface IMonthly {
  totalSales: number;
  _id: number;
}

const DashboardHome = ({ monthly }: { monthly: IMonthly[] }) => {
  // Format the data for the chart
  const formattedData = monthly?.map((item) => ({
    month: item._id,
    totalSales: item.totalSales || 0,
  }));

  console.log(monthly)

  return (
    <div className="p-4 border border-gray-200 rounded-xl">
      <h2 className="text-lg font-semibold mb-4">Monthly Sales</h2>
      {formattedData?.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={formattedData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="totalSales" fill="#3b82f6" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500">No sales data available.</p>
      )}
    </div>
  );
};

export default DashboardHome;
