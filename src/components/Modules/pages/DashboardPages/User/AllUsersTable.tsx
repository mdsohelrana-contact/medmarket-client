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
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { deleteUser } from "@/utils/actions/user/userActions";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { IMeta } from "@/types/orderTypes";
import { PaginationDemo } from "../Product/All-Products/DemoPagination";

interface AllUsersTableProps {
  users: IUser[];
  meta: IMeta;
}

const AllUsersTable = ({ users, meta }: AllUsersTableProps) => {
  const router = useRouter();

  // Handle user deletion
  const handleDeleteUser = async (id: string) => {
    try {
      const res = await deleteUser(id);

      if (res.success) {
        toast.success(res.message);
        router.refresh();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Failed to delete user. Please try again.");
    }
  };

  // Handle pagination navigation
  const handlePageChange = (page: number) => {
    router.push(`/users?page=${page}`); // Update the URL with the new page number
  };

  return (
    <div className="rounded-md border shadow-sm">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="font-semibold text-gray-700">Name</TableHead>
            <TableHead className="font-semibold text-gray-700">Phone</TableHead>
            <TableHead className="font-semibold text-gray-700">Email</TableHead>
            <TableHead className="font-semibold text-gray-700 text-right">
              Role
            </TableHead>
            <TableHead className="font-semibold text-gray-700 text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-500 py-6">
                No users available.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user._id} className="hover:bg-gray-50">
                <TableCell className="text-gray-800">{user.name}</TableCell>
                <TableCell className="text-gray-600">{user.phone}</TableCell>
                <TableCell className="text-gray-600">{user.email}</TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline" className="text-sm">
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {/* Confirmation Dialog */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-red-50"
                      >
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to delete this user?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the user and remove their data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteUser(user._id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>

        <TableFooter className="bg-gray-50">
          <TableRow>
            <TableCell colSpan={4} className="font-semibold text-gray-700">
              Total Users
            </TableCell>
            <TableCell className="text-right font-semibold text-gray-700">
              {meta.total}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <div className="text-center flex justify-center mx-auto w-full my-5">
        <PaginationDemo metadata={meta} />
      </div>
    </div>
  );
};

export default AllUsersTable;
