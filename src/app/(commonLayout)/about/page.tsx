
import DemoBanner from "@/components/Modules/Shared/DemoBanner/DemoBanner";
import TitleContainer from "@/components/Modules/Shared/TitleContainer/TitleContainer";

const AboutPage = () => {
  // const pathName = usePathname();

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "About Us", href: `/about` },
  ];

  return (
    <div>
      <DemoBanner
        title="Designed for Business Teams Like Yours"
        description=" Here at Flowbite, we focus on markets where technology, innovation,
          and capital can unlock long-term value and drive economic growth."
        breadcrumbs={breadcrumbs}
      />
      <TitleContainer
        title="About Us"
        description="Here at Flowbite, we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth."
      />
    </div>
  );
};

export default AboutPage;
