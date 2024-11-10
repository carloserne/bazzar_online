/***
 * Representa la definicion del estado, aqui estara el estado que se va a consumir
 */
import ProductContext from "./ProductContext";
import { useReducer } from "react";
import productReducer from "./ProductReducer";
import propTypes from "prop-types";

const ProductState = (props) => {
  // Estado inicial
  const initialState = {
    products: [],
    selectedProduct: null,
    saleStatus: null,
    sales: [],
    queryName: null,
  };

  const [state, dispatch] = useReducer(productReducer, initialState);

  const getProducts = async (query) => {
    const response = await fetch(
      `https://bazzar-production.up.railway.app/api/items?q=${query}`
    );
    const data = await response.json();
    data.queryName = query;
    dispatch({ type: "SEARCH_PRODUCT", payload: data });
  };

  const getProduct = async (id) => {
    const response = await fetch(
      `https://bazzar-production.up.railway.app/api/items/${id}`
    );
    const data = await response.json();
    dispatch({ type: "GET_PRODUCT", payload: data });
  };

  const createSale = async (sale) => {
    const response = await fetch(
      "https://bazzar-production.up.railway.app/api/addSale",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sale),
      }
    );
    const result = await response.json();
    dispatch({ type: "CREATE_SALE", payload: result.success });
  };

  const getSales = async () => {
    const response = await fetch(
      "https://bazzar-production.up.railway.app/api/sales"
    );
    const data = await response.json();
    dispatch({ type: "GET_SALES", payload: data });
  };

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        selectedProduct: state.selectedProduct,
        saleStatus: state.saleStatus,
        sales: state.sales,
        queryName: state.queryName,
        getProducts,
        getProduct,
        createSale,
        getSales,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;

ProductState.propTypes = {
  children: propTypes.node.isRequired,
};
