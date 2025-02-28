
import { AppSidebar } from "@/components/Modules/Shared/DashboardNavbar/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const DashboardLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="container h-screen">
        <SidebarTrigger  />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
