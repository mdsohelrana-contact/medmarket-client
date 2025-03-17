import About from "@/components/Modules/pages/About/About";
import DemoBanner from "@/components/Modules/Shared/DemoBanner/DemoBanner";
import TitleContainer from "@/components/Modules/Shared/TitleContainer/TitleContainer";

const AboutPage = () => {
  // const pathName = usePathname();

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "About Us", href: `/about` },
  ];

  return (
    <div className="my-14">
      <DemoBanner
        title=" About Us"
        description="  We provide quality medicines with fast delivery and secure online payment options."
        breadcrumbs={breadcrumbs}
      />
      <About />
    </div>
  );
};

export default AboutPage;
