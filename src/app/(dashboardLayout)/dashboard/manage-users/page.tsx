"use client";

import { useEffect, useState } from "react";
import AllUsersTable from "@/components/Modules/pages/DashboardPages/User/AllUsersTable";
import { getAllUsers } from "@/utils/actions/user/userActions";
import DemoBanner from "@/components/Modules/Shared/DemoBanner/DemoBanner";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "next/navigation";

const ManageUsersPage = () => {

  
  const searchParams = useSearchParams(); // Get search params
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState({ page: 0, total: 0, totalPage: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {

      const query =  searchParams?.size;

      console.log(query,"from user")

      try {
        const response = await getAllUsers(query);
        if (response) {
          setUsers(response.data || []);
          setMeta(response.meta || {});
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="w-full text-center px-5">
        <DemoBanner title="Manage users here..." description="All users" />
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
    <div className="w-full text-center">
      <div className="px-3">
        <DemoBanner title="Manage users here..." description="All users" />
      </div>
      <div className="p-5">
        <AllUsersTable users={users} meta={meta} />
      </div>
    </div>
  );
};

export default ManageUsersPage;
