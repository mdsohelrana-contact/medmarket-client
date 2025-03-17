import Contact from "@/components/Modules/pages/Contact/Contact";
import DemoBanner from "@/components/Modules/Shared/DemoBanner/DemoBanner";
import TitleContainer from "@/components/Modules/Shared/TitleContainer/TitleContainer";

const ContactPage = () => {
  return (
    <div className="my-14">
      <DemoBanner
        title="Contact Us"
        description="We’re here to help. Reach out to us for any inquiries or support."
        imagePath="/images/contact-bg.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact Us", href: "/contact" },
        ]}
      />
     <Contact/>
    </div>
  );
};

export default ContactPage;
