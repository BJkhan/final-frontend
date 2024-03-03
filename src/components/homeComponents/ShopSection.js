
import React, { useEffect, useState } from "react";
// import { Modal, Button } from 'react-bootstrap';
import { Link, useHistory  } from "react-router-dom";
import Rating from "./Rating";
import Pagination from "./pagination";
import {useDispatch, useSelector} from "react-redux";
import { listProduct } from "../../Redux/Actions/ProductActions";
import Loading from './../LoadingError/Loading';
import Message from './../LoadingError/Error';
// import { useLanguage } from "../LanguageContext";
import Sliders from "../homeComponents/Slider";
import ProductFilter from './ProductFilter';
import { LOCAL_PRODUCT_FILTER } from "../../Redux/Constants/ProductConstants";

const ShopSection = (props) => {
  // const { language } = useLanguage();
  // const welcomeMessage = language === "en" ? "Welcome to ClothesShop!" : "مرحبًا بك في موقعنا!";
  const { keyword, pageNumber } = props;
   const dispatch = useDispatch();
   const history = useHistory(); 
   
const productList = useSelector((state) => state.productList);
const {
  loading,
  error,
  uniqueCategories,
  uniqueColors,
  filteredProducts,
  uniqueSizes,
  uniqueSleeveLengths,
  uniqueDressTypes,
  uniqueDressStyles, 
  uniquePatternTypes,
  uniqueDressLengths,
  uniqueMaterials,
  // minPrice,
  // maxPrice,
  page,
  pages,
} = productList;

// // discount popup timer
// function calculateRemainingTime() {
//   const expiryDateString = '2023-12-31T23:59:59'; // Replace 'YourExpiryDateHere' with the actual expiry date
//   const expiryDate = new Date(expiryDateString);

//   if (isNaN(expiryDate.getTime())) {
//     console.error('Invalid expiry date format. Please provide a valid date string.');
//     return { hours: 0, minutes: 0, seconds: 0 };
//   }

//   const now = new Date();
//   const timeDifference = expiryDate.getTime() - now.getTime();

//   if (timeDifference <= 0) {
//     // If the expiry date has passed, return all zeros
//     return { hours: 0, minutes: 0, seconds: 0 };
//   }

//   const hours = Math.floor(timeDifference / (1000 * 60 * 60));
//   const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
//   const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

//   return { hours, minutes, seconds };
// }
// Filters state hook
const [filters, setFilters] = useState({
  category: [],
  onSale: false,
  color: [],
  dressSize: [],
  sleeveLength: [],
  dressType: [],
  dressStyle: [],
  patternType: [],
  dressLength: [],
  material: [],
  // priceRange: [],
});
// const [showDiscountPopup, setShowDiscountPopup] = useState(false);
// const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());
// // Discount popup close
// const handleCloseDiscountPopup = () => {
//   setShowDiscountPopup(false);
//   localStorage.setItem('discountPopupDisplayed', 'true');
// };
// Discount popup useEffect
useEffect(() => {
  dispatch(listProduct(keyword, pageNumber, filters));
  // const hasPopupBeenDisplayed = localStorage.getItem('discountPopupDisplayed');
  // if (!hasPopupBeenDisplayed && pageNumber === 1) {
  //   setShowDiscountPopup(true);
  // }
  // const timerInterval = setInterval(() => {
  //   setRemainingTime(calculateRemainingTime());
  // }, 1000);
  // return () => {
  //   clearInterval(timerInterval);
  //   localStorage.setItem('discountPopupDisplayed', 'true');
  // };
}, [dispatch, keyword, pageNumber, filters]);
// filters Function
const handleFilterChange = (filterType, value) => {
  setFilters({
    ...filters,
    [filterType]: value,
  });
  history.push(`/page/1`);
};
// Filters useEffect
useEffect(() => {
  const filtered = productList.products.filter((product) => {
    const condition1 = !filters.sleeveLength.length ||filters.sleeveLength.includes(product.sleeveLength);
    const condition2 = !filters.category.length || filters.category.includes(product.category);
    const condition3 = !filters.color.length || filters.color.includes(product.mainColor);
    const condition4 = !filters.dressSize.length ||filters.dressSize.includes(product.mainDressSize);
    const condition5 = !filters.onSale || product.onSale;
    const condition7 = !filters.dressType.length ||filters.dressType.includes(product.dressType);
    const condition8 = !filters.dressStyle.length || filters.dressStyle.includes(product.dressStyle)
    const condition9 = !filters.patternType.length || filters.patternType.includes(product.patternType);
    const condition10 = !filters.dressLength.length || filters.dressLength.includes(product.dressLength);
    const condition11 = !filters.material.length || filters.material.includes(product.material);
    // const condition6 = !filters.priceRange.length || (product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]);
    
    const finalCondition =
      condition1 &&
      condition2 &&
      condition3 &&
      condition4 &&
      condition5 &&
      // condition6 &&
      condition7 &&
      condition8 &&
      condition9 &&
      condition10 &&
      condition11;
    return finalCondition;
    
  });
  if(filtered.length){
    dispatch({
      type: LOCAL_PRODUCT_FILTER,
      payload: {
        filteredProducts: filtered,
      },
    });
  }
}, [dispatch, filters, productList.products]);

  return (
    <>
      <div className="container mt-0 pt-0">
        {/* {welcomeMessage} */}
        <div className="section mt-0 pt-0">
          <div className="row mt-0">
            {/* FILTERS / Display them in loading */}
            <div className="frontendBg d-none d-sm-none d-md-block col-lg-2 col-md-2 col-sm-2 pt-4 border rounded">
              <div className="container ">
                {/* Displaying filters */}
                <ProductFilter
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  categories={uniqueCategories}
                  uniqueColors={uniqueColors}
                  uniqueSizes={uniqueSizes}
                  uniqueSleeveLengths={uniqueSleeveLengths}
                  uniqueDressTypes={uniqueDressTypes}
                  uniqueDressStyles={uniqueDressStyles}
                  uniquePatternTypes={uniquePatternTypes}
                  uniqueDressLengths={uniqueDressLengths}
                  uniqueMaterials={uniqueMaterials}
                  // minPrice = {minPrice}
                  // maxPrice = {maxPrice}
                />
              </div>
            </div>
            {/* DISPLAYING PRODUCTS */}
            <div className="col-lg-10 col-md-10 col-sm-10 mt-0 article">
              <Sliders />
              <div className="shopcontainer row">
                {loading ? (
                  <div className="mb-5">
                    {" "}
                    <Loading />
                  </div>
                ) : error ? (
                  <Message variant="alert-danger">{error}</Message>
                ) : (
                  <>
                    {filteredProducts.map((product) => (
                      <div
                        className="shop col-lg-3 col-md-3 col-sm-3 "
                        key={product._id}
                      >
                        <div className="border-product position-relative">
                          <Link to={`/products/${product._id}`}>
                            <div className="shopBack">
                              <img src={product.image} alt={product.name} />
                            </div>
                            {product.onSale && (
                              <span className="badge bg-danger text-white position-absolute top-0 start-0 z-index-1">
                                On Sale
                              </span>
                            )}
                          </Link>
                          <div className="shoptext">
                            <p className="text-primary">
                              <Link to={`/products/${product._id}`}>
                                {product.name}
                              </Link>
                            </p>
                          </div>
                          <div className="row">
                            <div className="col-6 align-self-end">
                              <div className="shoptext">
                                <p className="text-danger d-flex align-items-center">
                                  ZAR{product.price}
                                  <span
                                    id="productPrice"
                                    className="text-decoration-line-through ms-2"
                                  >
                                    ZAR{product.priceOff}
                                  </span>
                                  {product.price && product.priceOff && (
                                    <span className="ms-2 text-secondary text-end negPerentage bg-dark text-white p-1 rounded">
                                      {Math.round(
                                        ((product.priceOff - product.price) /
                                          product.priceOff) *
                                          100
                                      )}
                                      %
                                    </span>
                                  )}
                                </p>

                                <Rating
                                  value={product.rating}
                                  text={`(${product.numReviews})`}
                                />
                              </div>
                            </div>
                            <div className="col-6 align-self-end mb-1 text-end">
                              <span id="productPrice" className="pe-2">
                                {product.sold}-Sold
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
                {/* Pagination */}
                <Pagination
                  pages={pages}
                  page={page}
                  keyword={keyword ? keyword : ""}
                />
              </div>
              {/* Display Discount Popup
              <Modal show={showDiscountPopup} onHide={handleCloseDiscountPopup}>
                <Modal.Header closeButton>
                  <Modal.Title className="animated-heading">
                    Special Discounts!
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
                  <div style={{ textAlign: "center", marginBottom: "20px" }}>
                    <p>Sign in to receive the voucher(s) below:</p>
                  </div>
                  <ul style={{ listStyleType: "none", padding: "0" }}>
                    <li
                      style={{
                        marginBottom: "20px",
                        padding: "15px",
                        backgroundColor: "#f5f5f5",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                        color: "#333",
                      }}
                    >
                      <strong style={{ color: "#007bff" }}>25% OFF</strong> for
                      orders over GBP£19.00
                      <br />
                      <span style={{ color: "#28a745" }}>
                        Expires in {remainingTime.hours}h{" "}
                        {remainingTime.minutes}m {remainingTime.seconds}s
                      </span>
                      <br />
                      Applies to Select Products
                    </li>
                    <li
                      style={{
                        marginBottom: "20px",
                        padding: "15px",
                        backgroundColor: "#f5f5f5",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                        color: "#333",
                      }}
                    >
                      <strong style={{ color: "#007bff" }}>15% OFF</strong> for
                      orders over GBP£29.00
                      <br />
                      <span style={{ color: "#28a745" }}>
                        Expires in {remainingTime.hours}h{" "}
                        {remainingTime.minutes}m {remainingTime.seconds}s
                      </span>
                      <br />
                      Applies to all products except select Marketplace products
                      and specific products.
                    </li>
                    <li
                      style={{
                        marginBottom: "20px",
                        padding: "15px",
                        backgroundColor: "#f5f5f5",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                        color: "#333",
                      }}
                    >
                      <strong style={{ color: "#007bff" }}>18% OFF</strong> for
                      orders over GBP£60.00
                      <br />
                      <span style={{ color: "#28a745" }}>
                        Expires in {remainingTime.hours}h{" "}
                        {remainingTime.minutes}m {remainingTime.seconds}s
                      </span>
                      <br />
                      Applies to all products except select Marketplace products
                      and specific products.
                    </li>
                    {/* Add more voucher items as needed */}
                  {/* </ul>
                </Modal.Body> */}
                {/* <Modal.Footer style={{ justifyContent: "center" }}>
                  <Button
                    variant="primary"
                    onClick={handleCloseDiscountPopup}
                    className="animated-button"
                  >
                    Avail Discounts
                  </Button>
                </Modal.Footer>
              </Modal> */} 
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default ShopSection;
