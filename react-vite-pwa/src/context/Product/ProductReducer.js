// Reducer de productos y ventas

import { SEARCH_PRODUCT, GET_PRODUCT, SAVE_SALE, GET_SALES } from "../types";

export default (state = {}, action) => {
  const { payload, type } = action;
  switch (type) {
    case SEARCH_PRODUCT:
      return {
        ...state,
        products: payload,
        queryName: payload.queryName,
      };
    case GET_PRODUCT:
      return {
        ...state,
        selectedProduct: payload,
      };
    case SAVE_SALE:
      return {
        ...state,
        saleStatus: payload,
      };
    case GET_SALES:
      return {
        ...state,
        sales: payload,
      };
    default:
      return state;
  }
};
