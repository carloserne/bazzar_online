import { useContext, useEffect } from "react";
import ProductContext from "../context/Product/ProductContext";
import Header from "../Components/header";

const SalesList = () => {
  const { sales, getSales } = useContext(ProductContext);

  useEffect(() => {
    getSales();
  }, [getSales]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Compras Registradas
        </h1>

        {sales && sales.length > 0 ? (
          <div className="space-y-4">
            {sales.map((sale) => (
              <div
                key={sale.id}
                className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4"
              >
                <img
                  src={sale.product_thumbnail}
                  alt={sale.product_name}
                  className="w-24 h-24 object-cover rounded-md"
                />

                <div className="flex-1">
                  <p className="text-lg font-semibold">{sale.product_name}</p>
                  <p className="text-gray-600 text-sm mt-1">
                    {sale.product_description}
                  </p>
                  <p className="text-gray-500 mt-2">
                    Fecha: {new Date(sale.fecha_venta).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-xl font-bold text-blue-500 mt-2 sm:mt-0">
                  ${sale.precio.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">
            No se han registrado compras aún.
          </p>
        )}
      </div>
    </div>
  );
};

export default SalesList;
