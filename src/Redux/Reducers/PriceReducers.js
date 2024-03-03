// USER DETAILS
import {
  PRICE_LIST_FAIL,
  PRICE_LIST_REQUEST,
  PRICE_LIST_SUCCESS,
} from "./../Constants/PriceConstants";
export const priceReducers = (state = { price: {} }, action) => {
  switch (action.type) {
    case PRICE_LIST_REQUEST:
      return { ...state, loading: true };
    case PRICE_LIST_SUCCESS:
      return { loading: false, price: action.payload };
    case PRICE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
