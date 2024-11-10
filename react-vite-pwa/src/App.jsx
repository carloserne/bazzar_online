import "./App.css";
import ProductState from "./context/Product/ProductState";
import ProductSearch from "./modules/ProductSearch";
import ProductList from "./modules/ProductList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductDetails from "./modules/ProductDetails";
import SalesList from "./modules/SalesList ";

function App() {
  return (
    <ProductState>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<ProductSearch />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/sales" element={<SalesList />} />
          </Routes>
        </div>
      </Router>
    </ProductState>
  );
}

export default App;
