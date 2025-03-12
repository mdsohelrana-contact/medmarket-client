import Home from "@/components/Modules/Home/Home";
import { getAllProducts } from "@/utils/actions/products";

const HomePage = async () => {
  const { data: medicines } = await getAllProducts();

  return <Home medicines={medicines} />;
};

export default HomePage;
