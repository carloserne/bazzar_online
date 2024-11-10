import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={
            i <= Math.round(product.rating)
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

  return (
    <div
      className="border border-gray-300 rounded-lg shadow-md overflow-hidden flex flex-col items-center p-4 cursor-pointer"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-cover rounded-md"
      />
      <h2 className="mt-4 font-semibold text-lg text-center">
        {product.title}
      </h2>
      <p className="text-gray-600 text-sm text-center mt-2">
        {product.description}
      </p>
      <div className="flex items-center mt-2">
        <span className="text-gray-600 text-sm mr-2">$ {product.price}</span>
        {renderStars()}
      </div>
    </div>
  );
};

export default ProductCard;

ProductCard.propTypes = {
  product: propTypes.object.isRequired,
};
