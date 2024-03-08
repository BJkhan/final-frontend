import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../Redux/Actions/cartActions";
import Header from "./../components/Header";
import apiUrl from "../apiConf";

const PaymentScreen = ({ history }) => {
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentOptions, setPaymentOptions] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    const fetchPaymentOptions = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/paymentOptions`);
        const data = await response.json();

        const activeOptions = data.payOptions.filter(option => option.isActive);
        setPaymentOptions(activeOptions);
      } catch (error) {
        console.error('Error fetching payment options:', error);
      }
    };

    fetchPaymentOptions();
  }, []);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login2 col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>SELECT PAYMENT METHOD</h6>
          {paymentOptions.length > 0 && (
        <>
          {paymentOptions.map((option) => (
            <div key={option._id} className="mt-4 mb-3 form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                id={`paymentOption-${option._id}`}
                value={option.name}
                required
                checked={paymentMethod === option.name}
                onChange={() => setPaymentMethod(option.name)}
              />
              <label className="form-check-label" htmlFor={`paymentOption-${option._id}`}>
                {option.name}
              </label>
            </div>
          ))}
          <button type="submit">Continue</button>
        </>
      )}
        </form>
      </div>
    </>
  );
};

export default PaymentScreen;
