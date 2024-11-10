import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductContext from "../context/Product/ProductContext";
import Header from "../Components/header";

const ProductDetails = () => {
  const { id } = useParams();
  const { getProduct, selectedProduct, createSale } =
    useContext(ProductContext);

  useEffect(() => {
    getProduct(id);
  }, [id, getProduct]);

  if (!selectedProduct) {
    return (
      <p className="text-center mt-10">Cargando detalles del producto...</p>
    );
  }

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={
            i <= Math.round(selectedProduct.rating)
              ? "text-yellow-500"
              : "text-gray-300"
          }
        >
          ★
        </span>
      );
    }
    return stars;
  };

  const handleBuy = () => {
    createSale({
      product_id: selectedProduct.id,
      price: selectedProduct.price,
    });
    alert("Producto comprado con éxito");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex flex-wrap justify-center items-center overflow-x-auto space-x-4 my-4">
          {selectedProduct.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Imagen ${index + 1}`}
              className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-cover rounded-md shadow-md"
            />
          ))}
        </div>

        <div className="text-center p-4">
          <h1 className="text-2xl sm:text-3xl font-semibold mt-4">
            {selectedProduct.title}
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            {selectedProduct.category}
          </p>
          <p className="text-gray-700 mt-4 text-sm sm:text-base">
            {selectedProduct.description}
          </p>

          <div className="flex items-center justify-center space-x-2 mt-4">
            <span className="text-xl sm:text-2xl font-bold">
              ${selectedProduct.price}
            </span>
            <div className="flex">{renderStars()}</div>
          </div>

          <button
            onClick={handleBuy}
            className="mt-6 px-6 py-2 sm:px-8 sm:py-3 bg-blue-500 text-white rounded-md text-base sm:text-lg font-semibold hover:bg-blue-600 focus:outline-none"
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
