import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import { register } from "../Redux/Actions/userActions";
import Header from "./../components/Header";
import { countries } from "../data/registerUserAddress";

const Register = ({ location, history }) => {
  window.scrollTo(0, 0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [addressFirst, setAddressFirst] = useState("");
  const [addressSecond, setAddressSecond] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState();
  const [country, setCountry] = useState("");
  const [currency, setCurrency] = useState("");

  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const handleCountryChange = (e) => {
    const selectedCountry = countries.find(
      (country) => country.name === e.target.value
    );
    if (selectedCountry) {
      setCountry(selectedCountry.name);
      setCurrency(selectedCountry.currency); // Set the currency
      console.log(currency)
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      register(
        name,
        email,
        password,
        addressFirst,
        addressSecond,
        province,
        city,
        zipCode,
        country,
        currency,
      )
    );
  };

  return (
    <>
      <Header />
      <div className="container col-8 justify-content-center align-items-center login-center">
        {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading />}

        <form className="Login" onSubmit={submitHandler}>
          <div className="row">
            <div className="col-4 me-3">
              <input
                className="input-group input-group-sm"
                type="text"
                placeholder="Username *"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="col-4 me-2">
              <input
                className="input-group input-group-sm"
                type="email"
                placeholder="Email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="col-3">
              <input
                className="input-group input-group-sm"
                type="password"
                placeholder="Password *"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <p className="text-start">Shipping Adrress</p>

          <div className="row">
            <div className="col-4 me-3">
              <input
                className="input-group input-group-sm"
                type="text"
                id="lal"
                placeholder="House/Office No *"
                value={addressFirst}
                onChange={(e) => setAddressFirst(e.target.value)}
              />
            </div>
            <div className="col-4 me-2">
              <input
                className="input-group input-group-sm"
                type="text"
                placeholder="Street No *"
                value={addressSecond}
                onChange={(e) => setAddressSecond(e.target.value)}
              />
            </div>
            <div className="col-3">
              <input
                className="input-group input-group-sm"
                type="number"
                placeholder="22010 *"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-4 me-3">
              <input
                className="input-group input-group-sm"
                type="text"
                placeholder="Province/State *"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              />
            </div>
            <div className="col-4 me-2">
              <input
                className="input-group input-group-sm"
                type="text"
                placeholder="City*"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="col-3">
              <select
                class="form-select form-select-lg mt-4 mb-2"
                aria-label="Default select example"
                value={country}
                onChange={handleCountryChange}
              >
                {countries.map((country) => (
                  <option value={country.name}>{country.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-3">
              <button type="submit">Register</button>
            </div>
          </div>

          <p>
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              I Have Account <strong>Login</strong>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
