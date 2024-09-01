import React, { useEffect, useState } from "react";
import Header from "./../components/Header";
import Rating from "../components/homeComponents/Rating";
import { Link } from "react-router-dom";
import Message from "./../components/LoadingError/Error";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductReview,
  listProductDetails,
} from "../Redux/Actions/ProductActions";
import Loading from "../components/LoadingError/Loading";
import { PRODUCT_CREATE_REVIEW_RESET } from "../Redux/Constants/ProductConstants";
import moment from "moment";
import { listPrice } from './../Redux/Actions/priceActions';

const SingleProduct = ({ history, match }) => {
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedColors, setSelectedColors] = useState(["No Color Selected"]);
  const [selectedSize, setSelectedSize] = useState(["No Size Selected"]);

  const productId = match.params.id;
  const dispatch = useDispatch();

  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingCreateReview,
    error: errorCreateReview,
    success: successCreateReview,
  } = productReviewCreate;

  const handleImageClick = (newImage) => {
    setSelectedImage(newImage);
  };

  useEffect(() => {
    setSelectedImage(product.image);
    if (successCreateReview) {
      alert("Review Submitted");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(productId));
    dispatch(listPrice());
  }, [dispatch, productId, product.image, successCreateReview]);

  const AddToCartHandle = (e) => {
    e.preventDefault();
    if(selectedColors.length && selectedSize.length)
    history.push(`/cart/${productId}?qty=${qty}&color=${selectedColors}&size=${selectedSize}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(productId, {
        rating,
        comment,
      })
    );
  };
  return (
    <>
      <Header />
      <div className="container single-product">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div className="row">

	    <div className="col-md-5 col-sm-10">
                <div className="single-image">
                  <img
                    src={selectedImage}
                    alt={product.name}
                    className="img-fluid zoom-on-hover"
                  />
                </div>
                <div className="product-thumbnails pt-3 d-flex justify-content-center">
                  {/* Display four images horizontally */}
                  {product.additionalImages &&
                    product.additionalImages.length > 0 &&
                    product.additionalImages.slice(0, 4).map((image, index) => (
                      <div
                        key={index}
                        className="thumbnail mx-1"
                        onClick={() => handleImageClick(image)}
                      >
                        <img
                          src={image}
                          alt={product.name}
                          className="img-thumbnail"
                        />
                      </div>
                    ))}
                </div>
              </div>
              <div className="col-md-6">
                <div className="product-dtl">
                  <div className="product-info">
                    <div className="product-name">{product.name}</div>
                  </div>
                  <p className="text-justify">{product.description}</p>

                  <div className="product-count col-lg-12 ">
                    <div className="row">
                      <div className="col flex-box d-flex justify-content-start align-items-center">
                        <h6>Price</h6>
                      </div>
                      <div className=" col flex-box d-flex justify-content-end align-items-center">
                        <span className="text-danger"> ZAR{product.price}</span>
                        <span className="text-decoration-line-through text-black-50 ps-2 fw-normal fs-6">
                          ZAR{product.priceOff}
                        </span>
                        {product.price && product.priceOff && (
                          <span className="ms-2 text-secondary text-end negPerentage bg-dark text-white p-1 rounded">
                            {Math.round(
                              ((product.priceOff - product.price) /
                                product.priceOff) *
                                100
                            )}
                            % Off
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>SKU</h6>
                      <span className="text-muted sku">
                        {product.SKU}
                      </span>
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Status</h6>
                      {product.countInStock > 0 ? (
                        <span className="text-muted fs-6 fw-normal">
                          In Stock
                        </span>
                      ) : (
                        <span className="text-muted fs-6 fw-normal">
                          unavailable
                        </span>
                      )}
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Reviews</h6>
                      <Rating
                        value={product.rating}
                        text={`(${product.numReviews})`}
                      />
                    </div>
                    {/* Display product colors as small color boxes */}
                    <div className="row">
                      <div className="col flex-box d-flex align-items-center">
                        <h6>Colors:</h6>
                      </div>
                      <div className="col product-colors flex-box d-flex justify-content-end align-items-center">
                        {product.color && product.color.length > 0 && (
                          <div>
                            {product.color.map((color, index) => (
                              <div
                                key={index}
                                className={`color-radio ${
                                  selectedColors === color ? "checked" : ""
                                }`}
                                style={{ backgroundColor: color }}
                                onClick={() => setSelectedColors(color)}
                              >
                                <div className="color-indicator"></div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col flex-box d-flex align-items-center">
                        <h6>Sizes:</h6>
                      </div>
                      <div className="col product-sizes d-flex justify-content-end align-items-center">
                        {product.dressSize && product.dressSize.length > 0 && (
                          <div className="btn-group">
                            {product.dressSize.map((size, index) => (
                              <button
                                key={index}
                                type="button"
                                className={`btn btn-outline-secondary btn-sm size-btn ${
                                  selectedSize === size ? "active" : ""
                                }`}
                                onClick={() => setSelectedSize(size)}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    {product.countInStock > 0 ? (
                      <>
                        <div className="flex-box d-flex justify-content-between align-items-center">
                          <h6>Quantity</h6>
                          <select
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                        <button
                          onClick={AddToCartHandle}
                          className="round-black-btn"
                        >
                          Add To Cart
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            {/* RATING */}
            <div className="row my-5">
              <div className="col-md-6">
                <h6 className="mb-3">REVIEWS</h6>
                {product.reviews.length === 0 && (
                  <Message variant={"alert-info mt-3"}>No Reviews</Message>
                )}
                {product.reviews.map((review) => (
                  <div
                    key={review._id}
                    className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded"
                  >
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <span>{moment(review.createdAt).calendar()}</span>
                    <div className="alert alert-info mt-3">
                      {review.comment}
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-md-6">
                <h6>WRITE A CUSTOMER REVIEW</h6>
                <div className="my-4">
                  {loadingCreateReview && <Loading />}
                  {errorCreateReview && (
                    <Message variant="alert-danger">
                      {errorCreateReview}
                    </Message>
                  )}
                </div>
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <div className="my-4">
                      <strong>Rating</strong>
                      <select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="col-12 bg-light p-3 mt-2 border-0 rounded"
                      >
                        <option value="">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </select>
                    </div>
                    <div className="my-4">
                      <strong>Comment</strong>
                      <textarea
                        row="3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="col-12 bg-light p-3 mt-2 border-0 rounded"
                      ></textarea>
                    </div>
                    <div className="my-3">
                      <button
                        disabled={loadingCreateReview}
                        className="col-12 bg-black border-0 p-3 rounded text-white"
                      >
                        SUBMIT
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="my-3">
                    <Message variant={"alert-warning"}>
                      Please{" "}
                      <Link to="/login">
                        " <strong>Login</strong> "
                      </Link>{" "}
                      to write a review{" "}
                    </Message>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SingleProduct;
