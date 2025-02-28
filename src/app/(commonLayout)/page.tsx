import Banner from "@/components/Modules/Home/Banner/Banner";
import TitleContainer from "@/components/Modules/Shared/TitleContainer/TitleContainer";

const HomePage = () => {
  return (
    <div className="my-10">
      <Banner />
      <div>
        <TitleContainer
          title="Welcome to the Home Page"
          description="This is the home page of the application. You can add more content here."
        />
      </div>
    </div>
  );
};

export default HomePage;
