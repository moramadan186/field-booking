import { useAuth } from "../Auth/Auth";
const Cart = () => {
  const user = useAuth().user;
  const cartItems = user !== null ? user.cartItems : null;
  return <div>{cartItems !== null ? cartItems[0].id : ""}</div>;
};

export default Cart;
