import AppNavbar from "@/components/Modules/Shared/CommonNavbar/AppNavbar";
import Footer from "@/components/Modules/Shared/Footer";

const CommonLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {


  return (
    <div>
      <AppNavbar />
      <div className="container min-h-screen  mx-auto p-5 md:p-10">
       {children}
      </div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
