import Dashboard from "@/components/Modules/pages/DashboardPages/DashboardHome/Dashboard";
import DashboardHome from "@/components/Modules/pages/DashboardPages/DashboardHome/DashboardHome";
import { getDashboardReport, getMonthlyAnalytic } from "@/utils/actions/dashborad";


const DashboardHomePage = async () => {
  const { meta:analytics  } = await getMonthlyAnalytic();
  const { meta } = await getDashboardReport();


  console.log(meta)
  return (
    <div className="w-full text-center">
      <Dashboard data={meta}/> 
      <DashboardHome monthly={analytics} />
    </div>
  );
};

export default DashboardHomePage;
