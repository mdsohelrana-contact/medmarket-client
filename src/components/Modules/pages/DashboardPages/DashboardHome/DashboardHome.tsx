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
  const formattedData = monthly.map((item, index) => ({
    month: `March ${index + 1}`, 
    totalSales: item.totalSales,
  }));

  
  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">Monthly Sales</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={formattedData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="totalSales" fill="#3b82f6" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardHome;
