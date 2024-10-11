import { useDispatch, useSelector } from "react-redux";
import {
  removeItemFromCart,
  updateItemQuantity,
  setCartFromLocalStorage,
} from "../features/products/cartSlice";
import { TbTrashX } from "react-icons/tb";
import { useEffect } from "react";

const Cart = () => {
  const { cartItems, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  );

  const dispatch = useDispatch();

  // Load cart from localStorage on first render
  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      const savedCart = JSON.parse(cartData);
      if (savedCart.cartItems.length > 0) {
        dispatch(setCartFromLocalStorage(savedCart));
      }
    }
  }, [dispatch]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    const cartData = { cartItems, totalQuantity, totalPrice };
    localStorage.setItem("cart", JSON.stringify(cartData));
  }, [cartItems, totalQuantity, totalPrice]);

  const handleRemoveItem = (itemId) => {
    dispatch(removeItemFromCart(itemId));
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateItemQuantity({ id: itemId, quantity: newQuantity }));
    }
  };

  return (
    <div className="container mx-auto mt-10 p-20">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {/* Cart Items List */}
      {cartItems.length > 0 ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="py-4 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="font-semibold text-lg">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity - 1)
                      }
                      className="bg-gray-300 text-black py-1 px-2 rounded hover:bg-gray-400 transition-colors duration-300"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity + 1)
                      }
                      className="bg-gray-300 text-black py-1 px-2 rounded hover:bg-gray-400 transition-colors duration-300"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition-colors duration-300"
                  >
                    <TbTrashX size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">Your cart is empty.</p>
      )}

      {/* Total Quantity and Price */}
      <div className="bg-white flex justify-end p-4">
        <div className="mb-2">
          <p className="text-lg">
            <span className="font-semibold">Total Items:</span> {totalQuantity}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Total Price:</span> $
            {totalPrice.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="mt-6 flex justify-end">
        {cartItems.length > 0 && (
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300">
            Proceed to Checkout
          </button>
        )}
      </div>
    </div>
  );
};

export default Cart;
