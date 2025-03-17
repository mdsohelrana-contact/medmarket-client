"use client";
import * as React from "react";
import { HomeIcon, ListOrdered, PlusIcon, Users } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./NavMain";
import { UserProfile } from "../UserProfile/UserProfile";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { currentUser, logOut } from "@/redux/features/user/authSlice";
import { getUserById } from "@/utils/actions/user/userActions";
import { useRouter } from "next/navigation";
import ThemeToggle from "../ThemeToggle";

// This is sample data.

const navMain = [
  {
    title: "Home",
    url: "#",
    icon: HomeIcon,
    items: [
      {
        title: "Client Home",
        url: "/",
      },
      {
        title: "Dashboard Home",
        url: "/dashboard",
      },
    ],
  },
  {
    title: "Mange-Users",
    url: "/dashboard/manage-users",
    icon: Users,
    isActive: true,
  },
  {
    title: "Mange-Orders",
    url: "/dashboard/manage-orders",
    icon: ListOrdered,
  },
  {
    title: "Mange-Products",
    url: "/dashboard/manage-products",
    icon: ListOrdered,
    items: [
      {
        title: "Add Product",
        url: "/dashboard/manage-products/add-product",
        icon: PlusIcon,
      },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const user = useAppSelector(currentUser);
  const [userData, setUserData] = React.useState<IUser | null>(null);

  // fetch current user information
  React.useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserById(user?.userId as string);
      setUserData(data?.data);
    };

    fetchUserData();
  }, [user?.userId]);

  // Handle logout
  const handleLogout = () => {
    dispatch(logOut());
    localStorage.removeItem("accessToken");
    document.cookie =
      "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    router.push("/");
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={navMain} />
        <div className="text-center">
          <ThemeToggle />
        </div>
      </SidebarContent>
      <SidebarFooter>
        {userData && <UserProfile user={userData} logoutFn={handleLogout} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
