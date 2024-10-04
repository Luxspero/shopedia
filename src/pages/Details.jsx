import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  fetchProduct,
  fetchProductsByCategory,
} from "../features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../features/products/cartSlice";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dataDetails, isLoading, errorMessage, dataByCategory } = useSelector(
    (state) => state.products
  );

  const [quantity, setQuantity] = useState(1); // State untuk menyimpan jumlah item yang ingin ditambahkan

  const addToCart = () => {
    if (!localStorage.getItem("token")) {
      return navigate("/login");
    }
    const product = {
      ...dataDetails,
      quantity: quantity, // Mengirim jumlah item yang ingin ditambahkan
    };

    dispatch(addItemToCart(product));

    // Reset input quantity
    setQuantity(1);
    alert("Item added to cart!");
  };

  useEffect(() => {
    // Fetch the product by its id
    dispatch(fetchProduct(id));
  }, [id, dispatch]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-center text-lg text-blue-500">
          Loading product details...
        </p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-center text-lg text-red-500">{errorMessage}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 p-4">
      {dataDetails && (
        <>
          {/* Product Details */}
          <div className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-lg p-6">
            <img
              src={dataDetails.image}
              alt={dataDetails.title}
              className="w-full md:w-1/6 object-cover rounded-lg mb-4 md:mb-0"
            />
            <div className="md:ml-6">
              <h1 className="text-3xl font-bold mb-4">{dataDetails.title}</h1>
              <p className="text-gray-600 text-lg mb-4">
                {dataDetails.description}
              </p>
              <p className="font-bold text-2xl text-blue-600 mb-4">
                ${dataDetails.price}
              </p>
              <p className="text-sm text-gray-500">
                Category: {dataDetails.category}
              </p>

              {/* Input untuk jumlah yang diinginkan */}
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border border-gray-300 rounded p-2 mt-4 w-20 mr-4"
              />

              <button
                onClick={addToCart}
                className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>

          {/* Similar Products */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Similar Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
              {dataByCategory?.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover mb-4 rounded"
                  />
                  <h2 className="text-lg font-semibold">{product.title}</h2>
                  <p className="text-gray-500 text-sm mt-2 mb-4">
                    {product.category}
                  </p>
                  <p className="font-bold text-xl text-blue-600">
                    ${product.price}
                  </p>
                  <Link
                    to={`/details/${product.id}`}
                    className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Details;
