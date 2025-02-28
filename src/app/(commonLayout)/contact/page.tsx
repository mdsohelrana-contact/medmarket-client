import DemoBanner from "@/components/Modules/Shared/DemoBanner/DemoBanner";
import TitleContainer from "@/components/Modules/Shared/TitleContainer/TitleContainer";

const ContactPage = () => {
  return (
    <div>
      <DemoBanner
        title="Welcome to Our Platform"
        description="We are here to assist you with all your needs. Get in touch with us today!"
        imagePath="/images/contact-bg.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact Us", href: "/contact" },
        ]}
      />
      <TitleContainer
        title="Contact Us"
        description="We are here to assist you with all your needs. Get in touch with us today!"
      />
    </div>
  );
};

export default ContactPage;
