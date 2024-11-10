import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductContext from "../context/Product/ProductContext";
import logo from "../assets/logo.svg";

const ProductSearch = () => {
  const { getProducts } = useContext(ProductContext);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const handleSearchClick = () => {
    getProducts(query);
    navigate("/products");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <img src={logo} alt="Logo" className="w-24 h-24 mb-4" />
      <h1 className="text-3xl font-bold mb-4">Bazzar Online</h1>
      <input
        type="text"
        placeholder="Buscar productos..."
        value={query}
        onChange={handleSearch}
        className="px-4 py-2 border border-gray-300 rounded-md w-3/4 md:w-1/2 focus:outline-none focus:border-blue-500"
      />

      <button
        onClick={handleSearchClick}
        className="px-4 py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
      >
        Buscar
      </button>
    </div>
  );
};

export default ProductSearch;
