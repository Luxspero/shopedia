import { Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; // Import ikon bintang

export default function ProductCard({ product }) {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };

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

        {/* Rating bintang */}
        <div className="flex items-center mt-2">
          {renderStars(product.rating.rate)} {/* Gunakan product.rating.rate */}
          <span className="ml-2 text-gray-500">
            {product.rating.rate}/5 ({product.rating.count} reviews)
          </span>
        </div>
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
