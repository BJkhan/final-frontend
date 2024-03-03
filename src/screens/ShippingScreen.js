import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { saveShippingAddress } from "../Redux/Actions/cartActions";

const ShippingScreen = ({ history }) => {
  window.scrollTo(0, 0);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log(userInfo)

  const [addressFirst, setAddressFirst] = useState(userInfo.addressFirst);
  const [addressSecond, setAddressSecond] = useState(userInfo.addressSecond);
  const [province, setProvince] = useState(userInfo.province);
  const [city, setCity] = useState(userInfo.city);
  const [zipCode, setZipCode] = useState(userInfo.zipCode);
  const [country, setCountry] = useState(userInfo.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ addressFirst, addressSecond, province, city, zipCode, country }));
    history.push("/payment");
  };
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>DELIVERY ADDRESS</h6>
          <div className=" input-group-sm mb-3">
          <input
              className="form-control"
              placeholder="Address Line 1"
              type="text"
              required
              value={addressFirst}
              onChange={(e) => setAddressFirst(e.target.value)}
            />
          <input
              className="form-control"
              placeholder="Address Line 2"
              type="text"
              value={addressSecond}
              required
              onChange={(e) => setAddressSecond(e.target.value)}
            />
          <input
              className="form-control"
              placeholder="22010"
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          <input
            className="form-control"
            type="text"
            placeholder="Enter country"
            value={province}
            required
            onChange={(e) => setProvince(e.target.value)}
          />
          <input
            className="form-control"
            type="text"
            placeholder="Enter country"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            className="form-control"
            type="text"
            placeholder="Enter country"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          />
          </div>
                   
          <button type="submit">Continue</button>
        </form>
      </div>
    </>
  );
};

export default ShippingScreen;
