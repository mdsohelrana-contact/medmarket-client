"use client"; // Forces client-side rendering

import { useEffect, useState } from "react";
import AllUsersTable from "@/components/Modules/pages/DashboardPages/User/AllUsersTable";
import { getAllUsers } from "@/utils/actions/user/userActions";

const ManageUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState({ page: 0, total: 0, totalPage: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
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

  if (loading) return <div>Loading users...</div>;

  return (
    <div className="w-full text-center">
      {/* <DemoBanner title="Manage users here..." description="All users" /> */}
      <div className="p-5">
        <AllUsersTable users={users} meta={meta} />
      </div>
    </div>
  );
};

export default ManageUsersPage;
