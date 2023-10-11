import { Delete } from "@mui/icons-material";
import "./cart.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../redux/slices/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import request from "../../utils/reques";
import { createCart, createOrder } from "../../redux/apiCalls/orderApiCall";

// Stripe Key
const KEY =
  "pk_test_51NsNwEEs0uVtB6dJskwh8Ular5C05btxYfOGDFBWgo6FAl0dDivgI9ceQQDeAXsubUQtVHLC3Wzjp46byxTOE2OA00zh7KaUYP";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const { carts } = useSelector((state) => state.order);
  const { order } = useSelector((state) => state.order);

  useEffect(() => {
    if (order) {
      navigate("/success");
    }
  }, [order, navigate]);

  // Make cart array
  const cartProductInfo = [];
  cart?.cartProducts?.map((product) =>
    cartProductInfo.push({
      productId: product._id,
      quantity: product.quantity,
      size: product.size,
      color: product.color,
    })
  );
  // create cart
  const cartClick = () => {
    dispatch(createCart(cartProductInfo));
  };
  // Stripe checkout
  const [stripeToken, setStripToken] = useState(null);
  const onToken = (token) => {
    setStripToken(token);
  };
  // create order
  useEffect(() => {
    const makeCheckoutRequest = async () => {
      try {
        await request.post(`api/checkout/payment`, {
          tokenId: stripeToken.id,
          amount: cart.totalPrice * 100,
        });
        if (carts) {
          dispatch(
            createOrder({
              orderItems: carts._id,
              country: stripeToken.card.address_city,
              address: stripeToken.card.address_country,
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (stripeToken && cart.totalPrice >= 1) {
      makeCheckoutRequest();
    }
  }, [stripeToken, cart.totalPrice, carts, dispatch]);

  if (cart.length <= 0 || cart.cartProducts.length <= 0) {
    return (
      <section className="cart-Page">
        <div className="empty-cart-page">
          <h1 className="empty-cart-page-title">Your bag is empty</h1>
          <Link to={"/productsList"} className="empty-cart-page-link">
            Shopping Now
          </Link>
        </div>
      </section>
    );
  } else {
    return (
      <section className="cart-Page">
        <div className="cart-page-title">Your bag</div>
        <div
          className="clear-cart"
          onClick={() => dispatch(cartActions.clearCart())}
        >
          <button className="clear-cart-btn">Clear cart</button>
        </div>
        <div className="cart-container">
          <div className="cart-products">
            {cart?.cartProducts?.map((item) => (
              <div className="check-cart-product" key={item?._id}>
                <div className="check-cart-product-image">
                  <img src={item?.images[0]?.url} alt="" />
                </div>
                <div className="check-cart-product-info">
                  <div className="cart-product-private-info">
                    <div className="cart-product-title">
                      ProductTitle : <span>{item?.title}</span>
                    </div>
                    <div className="cart-product-id">
                      ID: <span>{item?._id}</span>
                    </div>
                    <div className="cart-product-color">
                      Color :{" "}
                      <span style={{ backgroundColor: item?.color }}></span>
                    </div>
                    <div className="cart-product-size">
                      size : <span>{item?.size}</span>
                    </div>
                  </div>
                  <div className="cart-product-public-info">
                    <div className="cart-product-price">
                      $ {item?.price * item?.quantity}
                    </div>
                    <div className="quantity-product">
                      Quantity: <span>{item.quantity}</span>
                    </div>
                  </div>
                </div>
                <div className="check-cart-product-actions">
                  <Delete
                    className="cart-actions-icon"
                    onClick={() =>
                      dispatch(cartActions.removeItemFromCart(item))
                    }
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="cart-checkout">
            <div className="cart-checkout-contianer">
              <div className="cart-checkout-title">Order Summary</div>
              <div className="cart-checkout-totals">
                <div className="checkout-total">
                  <div className="subTotal">Subtotal</div>
                  <div className="subTotal-price">$ {cart?.totalPrice}</div>
                </div>
                <div className="checkout-total">
                  <div className="subTotal">Estimated Shipping</div>
                  <div className="subTotal-price">$ 0</div>
                </div>
                <div className="checkout-total">
                  <div className="subTotal">Shipping Discount</div>
                  <div className="subTotal-price">$0</div>
                </div>
                <div className="checkout-total checkout-all-total">
                  <div className="subTotal cart-total">Total</div>
                  <div className="subTotal-price cart-total">
                    $ {cart?.totalPrice}
                  </div>
                </div>
              </div>
              <StripeCheckout
                name="ze"
                billingAddress
                shippingAddress
                description={`your total is $ ${cart.totalPrice}`}
                amount={cart.totalPrice * 100}
                token={onToken}
                stripeKey={KEY}
              >
                <div className="cartCheckoutBtn" onClick={cartClick}>
                  <button className="checkout-cart-btn">Checkout</button>
                </div>
              </StripeCheckout>
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default Cart;
