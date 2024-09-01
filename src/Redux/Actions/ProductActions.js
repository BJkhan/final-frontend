import { 
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL, 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    LOCAL_PRODUCT_FILTER, 
} from "../Constants/ProductConstants"
import axios from 'axios';
import { logout } from "./userActions";
import apiUrl from "../../apiConf";

export const listProduct = (keyword = "", pageNumber = "", filters = {}) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get(`${apiUrl}/api/products`, {
      params: {
        keyword,
        pageNumber,
        // category: filters.category || "",
        // onSale: filters.onSale || "",
        // color: filters.color || "",
        // dressSize: filters.dressSize || "",
        // sleeveLength: filters.sleeveLength || "",
      },
    });
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
export const localProductFilter = (filteredProducts) => ({  
  type: LOCAL_PRODUCT_FILTER,
  payload: { filteredProducts },
});

// PRODUCTS LIST
// export const listProduct = (keyword = " ", pageNumber = " ") => async(dispatch) =>{
//     try {
//         dispatch({type:PRODUCT_LIST_REQUEST})
//         const {data} = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);
//         dispatch({type:PRODUCT_LIST_SUCCESS, payload: data})
//     } catch (error) {
//         dispatch({
//             type: PRODUCT_LIST_FAIL,
//             payload:
//             error.response && error.response.data.message 
//             ? error.response.data.message
//             : error.message,
//         })
//     }
// };

// SINGLE PRODUCT
export const listProductDetails = (id) => async(dispatch) =>{
    try {
        dispatch({type:PRODUCT_DETAILS_REQUEST})
        const {data} = await axios.get(`${apiUrl}/api/products/${id}`);
        dispatch({type:PRODUCT_DETAILS_SUCCESS, payload: data})
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
            error.response && error.response.data.message 
            ? error.response.data.message
            : error.message,
        })
    }
};

// PRODUCT REVIEW CREATE
export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(`${apiUrl}/api/products/${productId}/review`, review, config);
      dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload: message,
      });
    }
  };
