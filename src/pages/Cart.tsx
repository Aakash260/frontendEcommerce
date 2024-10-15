import axios from "axios";
import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItems from "../components/CartItems";
import { addToCart, calculatePrice, discountApplied, removeCartItem } from "../redux/reducer/cartReducer";
import { server } from "../redux/store";
import { CartReducerInitail } from "../types/reducer-types";
import { CartItem } from "../types/types";
 
 
const Cart = () => {

const {cartItems,subtotal,tax,total,shippingCharges,discount}
=useSelector((state:{cartReducer:CartReducerInitail})=>state.cartReducer)

  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);
const dispatch=useDispatch()
  useEffect(() => {

   const {token:cancelToken,cancel}=axios.CancelToken.source()

    const timeOutId = setTimeout(() => {

      axios.get(`${server}/api/v1/payment/discount?coupon=${couponCode}`,{cancelToken})
      .then((res)=>{
        dispatch(discountApplied(res.data.discount))
        setIsValidCouponCode(true);
        dispatch(calculatePrice()); 
      })

      .catch(()=>{
        dispatch(discountApplied(0))
        setIsValidCouponCode(false);
        dispatch(calculatePrice());
      })

 
      return () => {
        clearTimeout(timeOutId);
        cancel();
        setIsValidCouponCode(false);
      };
    }, 1000);
  }, [couponCode]);

  const incrementHandler=(cartItem:CartItem)=>{
   if(cartItem.quantity>=cartItem.stock) return;

    dispatch(addToCart({...cartItem,quantity:cartItem.quantity+1}))
    }


    const decrementHandler=(cartItem:CartItem)=>{
   if(cartItem.quantity<=1) return;
   
      dispatch(addToCart({...cartItem,quantity:cartItem.quantity-1}))
      }

const removeHandler=(productId:string)=>{
   
  dispatch(removeCartItem(productId));
  }

useEffect(() => {
  
dispatch(calculatePrice())
}, [cartItems]);

  return (
    <div className="cart">
      <main>
{ cartItems.length>0? (cartItems.map((i,ind)=>{
 return <CartItems incrementHandler={incrementHandler} decrementHandler={decrementHandler} removeHandler={removeHandler} key={ind} cartItem={i}/>
}))
: <h1> No Items Added</h1>
}

      </main>

      <aside>
        <p>Subtotal: ₹{subtotal}</p>
        <p>Shipping Charges: ₹{shippingCharges}</p>
        <p>Tax: ₹{tax}</p>
        <p>
          Discount : <em> - ₹{discount}</em>
        </p>
        <p>
          <b>Total: ₹{total}</b>
        </p>
        <input
          type="text"
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        {couponCode &&
          (isValidCouponCode ? (
            <span className="green">
              ₹{discount} off using the <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">
              Invalid Coupon Code <VscError />
            </span>
          ))}


{
  cartItems.length>0 && <Link to="/shipping">Checkout</Link>
}

      </aside>
    </div>
  );
};

export default Cart;
