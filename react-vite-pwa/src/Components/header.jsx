import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductContext from "../context/Product/ProductContext";
import logo from "../assets/logo.svg";

const Header = () => {
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
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white shadow-md">
      <div
        className="flex items-center mb-2 sm:mb-0"
        onClick={() => navigate("/sales")}
        style={{ cursor: "pointer" }}
      >
        <img src={logo} alt="Logo" className="w-10 h-10 sm:w-12 sm:h-12" />
        <span className="text-xl font-bold ml-2 sm:hidden">Bazzar Online</span>
      </div>

      <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto space-y-2 sm:space-y-0 sm:space-x-2">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={query}
          onChange={handleSearch}
          className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSearchClick}
          className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Buscar
        </button>
      </div>
    </div>
  );
};

export default Header;
