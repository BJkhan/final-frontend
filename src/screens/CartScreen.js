import React, { useEffect } from "react";
import Header from "./../components/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removefromcart } from "./../Redux/Actions/cartActions";

const CartScreen = ({ match, location, history }) => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const productId = match.params.id;
  // const qty = location.search ? Number(location.search.split("=")[1]) || 1 : 1;
  // console.log("quantity" + qty)
  const params = new URLSearchParams(location.search);
  const qty = params.get('qty') ? Number(params.get('qty')) : 1;
  const color = params.get('color') || 'DefaultColor';
  const size = params.get('size') || 'DefaultSize';
 

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty, color, size));
    }
  }, [dispatch, productId, qty, color, size]);

  const checkOutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  const removeFromCartHandle = (id) => {
    dispatch(removefromcart(id));
  };
  return (
    <>
      <Header />
      {/* Cart */}
      <div className="container">
        {cartItems.length === 0 ? (
          <div className=" alert alert-info text-center mt-3">
            Your cart is empty
            <Link
              className="btn btn-success mx-5 px-5 py-3"
              to="/"
              style={{
                fontSize: "12px",
              }}
            >
              SHOPPING NOW
            </Link>
          </div>
        ) : (
          <>
            <div className=" alert alert-info text-center mt-3">
              Total Cart Products
              <Link className="text-success mx-2" to="/cart">
                ({cartItems.length})
              </Link>
            </div>
            {/* cartiterm */}
            <div className="row">
              <div className="col-md-9 col-lg-9">
                {cartItems.map((item) => (
                  <>
                    <div className="cart-iterm row">
                      <div
                        onClick={() => removeFromCartHandle(item.product)}
                        className="remove-button d-flex justify-content-center align-items-center"
                      >
                        <i className="fas fa-times"></i>
                      </div>
                      <div className="cart-image col-md-2 col-lg-2">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="cart-text text-capitalize text-wrap col-md-5 col-lg-5">
                        <div className="row">
                          <div className="col-md-12">
                            <Link to={`/products/${item.product}`}>
                              <h6>{item.name}</h6>
                            </Link>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <p className="fw-lighter">{`Size:${item.size}, Color Family:${item.color}`}</p>
                          </div>
                        </div>
                      </div>
                      <div className=" mt-3 mt-md-0 col-md-3 col-lg-3 align-items-sm-end align-items-start col-sm-7">
                        <p className="fs-5 text-danger">ZAR. {item.price}</p>
                        <p className="fw-lighter fs-6"> {`Excluding `} </p>
                        <p className="fw-lighter fs-6"> {`Shipping & `} </p>
                        <p className="fw-lighter fs-6"> {`Other Taxes `} </p>
                      </div>
                      <div className="cart-qty col-md-2 col-lg-2 col-sm-5 mt-md-0">
                        <h6>QUANTITY</h6>
                        <select
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(
                                item.product,
                                Number(e.target.value),
                                item.color,
                                item.size
                              )
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </>
                ))}
              </div>
              <div className="cart-itemSide col-md-3 col-lg-3">
                <div className="cart-side">
                  <h6 className="cart-side mt-2 mb-4">ORDER SUMMARY</h6>
                  <div className="row">
                    <div className="col">
                      <p className="text-muted text-start">Total Price:</p>
                    </div>
                    <div className="col">
                      <p className="total-price text-success text-start">{`ZAR${total}`}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <p className="text-muted text-start">Total Items:</p>
                    </div>
                    <div className="col">
                      <span className="total-price text-success text-start">
                        ({cartItems.length})
                      </span>
                    </div>
                  </div>
                  <div className="mt-5 row">
                  <div>
                      {total > 0 && (
                        <div className="col mt-5 mb-3 mt-md-0">
                          <button className="btn btn-success px-5" onClick={checkOutHandler}>Checkout</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End of cart iterms */}
            <hr />
            <div className="cart-buttons d-flex align-items-center row">
              <Link to="/" className="col-md-3">
                <button>Continue To Shopping</button>
              </Link>
              
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartScreen;
