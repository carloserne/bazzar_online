import { useContext } from "react";
import ProductCard from "../Components/ProductCard";
import ProductContext from "../context/Product/ProductContext";
import Header from "../Components/header";

const ProductList = () => {
  const { products, queryName } = useContext(ProductContext);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-6xl mx-auto p-4">
        <div className="text-center my-4">
          <p className="text-lg font-semibold">
            Productos encontrados para la búsqueda de {queryName} (
            {products.length})
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products && products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-gray-500 mt-8 col-span-full text-center">
              No se encontraron productos.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
