
import Home from "@/components/Modules/Home/Home";
import { getAllProducts } from "@/utils/actions/products";

const HomePage = async () => {
  const { data: medicines } = await getAllProducts();

  return(
    <div className="mt-14">
       <Home medicines={medicines} />
    </div>
  );
};

export default HomePage;
