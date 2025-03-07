import ShoppingCart from "@/components/Modules/pages/Cart/ShoppingCart";
import { getCartItems } from "@/utils/actions/cart";

const CartPage = async () => {
  const { data: cart } = await getCartItems();


  return (
    <div className="my-10">
      <ShoppingCart cart={cart || null}/>
    </div>
  );
};

export default CartPage;
