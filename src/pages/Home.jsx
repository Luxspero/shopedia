import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import ProductCard from "../components/ProductCard";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useNavigate } from "react-router-dom";

function Home() {
  const { data, isLoading, errorMessage } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  //handle detail dari swiper
  const handleDetail = (id) => {
    navigate(`/details/${id}`);
  };

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Product List</h1>
        <p className="text-center text-lg text-blue-500">Loading products...</p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Product List</h1>
        <p className="text-center text-lg text-red-500">
          Error: {errorMessage}
        </p>
      </div>
    );
  }

  // Select a few featured products for the slideshow
  const featuredProducts = data.slice(0, 10); // Ambil 10 produk teratas

  return (
    <div className="container mx-auto p-4 mt-14">
      <h1 className="text-2xl font-bold mb-4">Latest Trailers</h1>

      {/* Swiper Section */}
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1} // Menampilkan satu slide pada satu waktu
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        autoplay={{
          delay: 3000, // waktu dalam milidetik untuk setiap slide
          disableOnInteraction: false, // tidak menghentikan autoplay saat interaksi
        }}
      >
        {featuredProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <div
              className="relative flex items-center justify-center h-64 bg-white rounded-lg overflow-hidden"
              onClick={() => handleDetail(product.id)}
            >
              <img
                src={product.image}
                alt={product.title}
                className="absolute inset h-full object-cover opacity-30"
              />
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h2 className="text-xl text-blue-500 font-semibold">
                  {product.title}
                </h2>
                <p className="mt-2 text-gray-800 text-sm">
                  {product.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Home;
