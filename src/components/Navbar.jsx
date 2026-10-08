import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const GridIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 8a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zm6-8a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2zm0 8a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z" />
  </svg>
);

const CartIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

export default function Navbar() {
  const navigate = useNavigate();
  const { cartCount } = useCart();

  return (
    <nav className="bg-dark-900 border-b border-dark-700 sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Left: Grid + Brand */}
          <div className="flex items-center gap-3">
            <button
              className="text-gray-400 hover:text-gray-200 transition-colors p-1 rounded"
              aria-label="Catalogue Menu"
              onClick={() => navigate("/")}
            >
              <GridIcon />
            </button>
            <Link
              to="/"
              className="text-white font-bold text-sm sm:text-base tracking-wide hover:text-blue-400 transition-colors"
            >
              Book Worm
            </Link>
          </div>

          {/* Center: Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/orders"
              className="text-xs text-gray-300 hover:text-white transition-colors font-medium"
            >
              My Orders
            </Link>
            <Link
              to="/wishlist"
              className="text-xs text-gray-300 hover:text-white transition-colors font-medium"
            >
              My Wishlist
            </Link>
            <Link
              to="/writers"
              className="text-xs text-gray-300 hover:text-white transition-colors font-medium"
            >
              My Writers
            </Link>
          </div>

          {/* Right: Cart + User Profile */}
          <div className="flex items-center gap-4">
            <button
              className="relative text-gray-300 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-dark-700"
              aria-label="Cart"
              onClick={() => navigate("/cart")}
            >
              <CartIcon />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className="text-gray-300 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-dark-700"
              aria-label="Profile"
              onClick={() => navigate("/orders")}
            >
              <UserIcon />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
