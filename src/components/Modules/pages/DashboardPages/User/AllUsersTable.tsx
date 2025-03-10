"use client";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IMeta, IOrderHistoryResponse, Order } from "@/types/orderTypes";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Trash2 } from "lucide-react";
import { deleteUser } from "@/utils/actions/user/userActions";

const AllUsersTable = ({ users, meta }: { users: IUser[]; meta: IMeta }) => {
  const router = useRouter();

  // handle update
  const handleDeleteUser =async (id: string) => {
    try {
      const res = await deleteUser(id);

      console.log(res)
      if (res.success) {
        toast.success(res.message);
        router.refresh();
      }
      else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Role</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.length === 0
            ? "User is not available"
            : users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user?.name}</TableCell>
                  <TableCell>{user?.phone}</TableCell>
                  <TableCell>{user?.email}</TableCell>
                  <TableCell>{user?.role}</TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteUser(user?._id)}
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </Button>
                </TableRow>
              ))}
        </TableBody>

        <TableFooter>
          <TableRow className="text-lg">
            <TableCell colSpan={3}>Total Users</TableCell>
            <TableCell className="text-right">{meta?.total}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="my-2">
        {/* <PaginationDemo metadata={orders?.meta} />{" "} */}
      </div>
    </>
  );
};

export default AllUsersTable;
