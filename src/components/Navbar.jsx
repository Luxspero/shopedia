import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  return (
    <nav className="p-4 flex justify-between items-center bg-gray-800 text-white fixed top-0 left-0 w-full z-50">
      {/* Nama Aplikasi di sisi kiri */}
      <div className="text-xl font-bold">
        <Link to="/" className="hover:text-gray-400">
          SHOPEDIA
        </Link>
      </div>

      {/* Links navigasi di sisi kanan */}
      <div className="space-x-8  flex items-center">
        <Link to="/" className="hover:text-gray-400">
          Home
        </Link>
        {token ? (
          <>
            <Link
              to="/cart"
              className="hover:text-gray-400 flex items-center space-x-1"
            >
              {/* Ikon Cart */}
              <AiOutlineShoppingCart size={24} />
              <span>Cart</span>
            </Link>
            <Link to="/logout" className="hover:text-gray-400">
              Logout
            </Link>
          </>
        ) : (
          <Link to="/login" className="hover:text-gray-400">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
