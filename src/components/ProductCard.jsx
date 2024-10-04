import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
      <div>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover mb-4"
        />
        <h2 className="text-lg font-semibold">{product.title}</h2>
        <p className="text-gray-500 text-sm mt-2 mb-4">{product.category}</p>
        <p className="font-bold text-xl text-blue-600">${product.price}</p>
      </div>

      <Link
        to={`/details/${product.id}`}
        className="bg-blue-500 text-white mt-4 py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300 text-center"
      >
        Detail
      </Link>
    </div>
  );
}
