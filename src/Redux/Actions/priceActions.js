
import axios from 'axios';
import { PRICE_LIST_FAIL, PRICE_LIST_REQUEST, PRICE_LIST_SUCCESS } from './../Constants/PriceConstants';
import apiUrl from '../../apiConf';
export const listPrice = () => async (dispatch) => {
  try {
    dispatch({ type: PRICE_LIST_REQUEST });

    const { data } = await axios.get(`${apiUrl}/api/price/settings`);
    dispatch({ type: PRICE_LIST_SUCCESS, payload: data });
    localStorage.setItem("price", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: PRICE_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
