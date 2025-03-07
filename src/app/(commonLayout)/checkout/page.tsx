import CheckoutForm from "@/components/Modules/pages/Payment/CheckoutForm";
import { getCartItems } from "@/utils/actions/cart";

const CheckOutPage = async () => {
  const { data: cart } = await getCartItems();

  return (
    <div>
      <CheckoutForm cart={cart || null} />
    </div>
  );
};

export default CheckOutPage;
