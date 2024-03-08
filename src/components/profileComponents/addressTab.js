import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../LoadingError/Error";
import Toast from "./../LoadingError/Toast";
import Loading from "./../LoadingError/Loading";
import { toast } from "react-toastify";
import { updateUserProfile } from "../../Redux/Actions/userActions";
import { countries } from "../../data/registerUserAddress";

const AddressTab = () => {
    const [addressFirst, setAddressFirst] = useState("");
    const [addressSecond, setAddressSecond] = useState("");
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState(22010);
    const [country, setCountry] = useState("Libya");
  const toastId = React.useRef(null);

  const Toastobjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { loading: updateLoading } = userUpdateProfile;

  useEffect(() => {
    if (user) {
        setAddressFirst(user.addressFirst);
        setAddressSecond(user.addressSecond);
        setProvince(user.province);
        setCity(user.city);
        setZipCode(user.zipCode);
        setCountry(user.country);


    }
  }, [dispatch, user]);

  const submitHandler = (e) => {
    e.preventDefault();
      dispatch(updateUserProfile({ id: user._id, addressFirst, addressSecond, province, city, zipCode, country }));
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success("Profile Updated", Toastobjects);
      }
  };
  return (
    <>
      <Toast />
      {error && <Message variant="alert-danger">{error}</Message>}
      {loading && <Loading />}
      {updateLoading && <Loading />}
      <form className="row  form-container" onSubmit={submitHandler}>
        <div className="col-md-6">
          <div className="form">
            <input
              className="form-control"
              placeholder="Address Line 1"
              type="text"
              required
              value={addressFirst}
              onChange={(e) => setAddressFirst(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <input
              className="form-control"
              placeholder="Address Line 2"
              type="text"
              value={addressSecond}
              required
              onChange={(e) => setAddressSecond(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <input
              className="form-control"
              placeholder="22010"
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
          <input
                className="input-group"
                type="text"
                placeholder="Province/State *"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
          <input
                className="input-group input-group-sm"
                type="text"
                placeholder="City*"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
          <select class="form-select form-select-lg" aria-label="Default select example" value={country}
                            onChange={(e) => setCountry(e.target.value)}>
            {countries.map((country) => (
              <option value={country.name}>{country.name}</option>
            ))}
          </select>
          </div>
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </>
  );
};

export default AddressTab;
