import AllUsersTable from "@/components/Modules/pages/DashboardPages/User/AllUsersTable";
import DemoBanner from "@/components/Modules/Shared/DemoBanner/DemoBanner";
import { getAllUsers } from "@/utils/actions/user/userActions";
import React from "react";

const ManageUsersPage = async ({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) => {
  const { data: users, meta } = await getAllUsers();

  return (
    <div>
      <DemoBanner title="Mange users here..." description="All user " />

      <div className="p-5">
        <AllUsersTable users={users} meta={meta} />
      </div>
    </div>
  );
};

export default ManageUsersPage;
