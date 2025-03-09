"use client";
import * as React from "react";
import {
  Bot,
  Edit2,
  Group,
  HomeIcon,
  ListOrdered,
  PlusIcon,
  SquareTerminal,
  User2,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "./NavUser";
import { NavMain } from "./NavMain";

// This is sample data.

const user = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
};

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
        icon:PlusIcon
      },
      {
        title: "Update Product",
        url: "/dashboard/manage-products/update-product",
        icon:Edit2
      },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
