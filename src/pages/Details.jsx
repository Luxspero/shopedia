import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";

const Details = () => {
  const { id } = useParams(); // Mengambil ID dari parameter URL
  const dispatch = useDispatch();
  const { dataDetails, isLoading, errorMessage } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [id]);

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
    <div className="container mx-auto p-4">
      {dataDetails && (
        <div className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-lg p-6">
          <img
            src={dataDetails.image}
            alt={dataDetails.title}
            className="w-full md:w-1/3 object-cover rounded-lg mb-4 md:mb-0"
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
            <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300">
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
