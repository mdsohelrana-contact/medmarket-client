import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpRight } from "lucide-react";

const Dashboard = ({ data }) => {
  return (
    <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {/* Summary Cards */}
      {[
        { title: "Total Orders", value: data.totalOrders },
        { title: "Pending Orders", value: data.totalPendingOrders },
        { title: "Total Revenue", value: `$${data.totalRevenue.toFixed(2)}` },
        { title: "Total Users", value: data.totalUsers },
      ].map((item, index) => (
        <Card key={index} className="shadow-lg border border-gray-200 bg-white hover:shadow-xl transition">
          <CardHeader className="flex items-center justify-between pb-3">
            <CardTitle className="text-lg font-semibold">{item.title}</CardTitle>
            <ArrowUpRight className="w-5 h-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-800">{item.value}</p>
          </CardContent>
        </Card>
      ))}

      {/* Top Products Table */}
      <div className="col-span-1 md:col-span-2 lg:col-span-4">
        <Card className="shadow-lg border border-gray-200 bg-white hover:shadow-xl transition">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <Table className="min-w-full divide-y divide-gray-200">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="text-left font-semibold p-3">Product Name</TableHead>
                  <TableHead className="text-left font-semibold p-3">Price</TableHead>
                  <TableHead className="text-left font-semibold p-3">Total Orders</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.topProduct.map((product) => (
                  <TableRow key={product._id} className="hover:bg-gray-50">
                    <TableCell className="p-3 text-gray-800 font-medium">{product.productName}</TableCell>
                    <TableCell className="p-3 text-gray-600">${product.productPrice.toFixed(2)}</TableCell>
                    <TableCell className="p-3 text-gray-600">{product.totalOrders}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
