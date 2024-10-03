import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import ProductCard from "../components/ProductCard";

function Home() {
  const { data, isLoading, errorMessage } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Home;
