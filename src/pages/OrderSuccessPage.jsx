import React from "react";
import { useNavigate } from "react-router-dom";
import BookCard from "../components/BookCard";
import { useCart } from "../context/CartContext";
import { ALL_BOOKS } from "../data/booksData";

export default function PaymentConfirmationPage() {
  const navigate = useNavigate();
  const { lastPurchasedItems } = useCart();

  // If no last purchased items, fallback to the default items matching the screenshot
  const displayItems =
    lastPurchasedItems && lastPurchasedItems.length > 0
      ? lastPurchasedItems.map((item) => item.book)
      : [
          ALL_BOOKS.find((b) => b.id === 7) || ALL_BOOKS[6], // Joy of Minimalism
          ALL_BOOKS.find((b) => b.id === 3) || ALL_BOOKS[2], // The Path to Success
        ];

  return (
    <div
      className="min-h-screen relative overflow-hidden flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(135deg, #132535 0%, #1e3a50 50%, #152433 100%)",
      }}
    >
      {/* Background Illustrated Book Shapes matching Screenshot */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-30">
        {/* Top left book */}
        <div className="absolute top-[8%] left-[10%] w-56 h-64 bg-amber-600/80 rounded-lg transform -rotate-12 shadow-2xl flex flex-col p-4">
          <div className="w-full h-8 bg-amber-700/60 rounded mb-2" />
          <div className="w-3/4 h-4 bg-amber-700/40 rounded" />
        </div>

        {/* Top right blue book */}
        <div className="absolute top-[4%] right-[15%] w-48 h-60 bg-sky-700/80 rounded-lg transform rotate-6 shadow-2xl" />

        {/* Bottom open book */}
        <div className="absolute -bottom-10 left-[20%] w-96 h-64 bg-amber-100/90 rounded-t-xl transform -rotate-3 shadow-2xl border-4 border-amber-200 flex items-center justify-center">
          <div className="w-1 h-full bg-amber-300" />
        </div>

        {/* Floating geometric confetti */}
        <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-amber-400 rotate-45" />
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-red-400 rounded-full" />
        <div className="absolute top-1/2 right-12 w-5 h-5 bg-amber-500 rounded-full" />
        <div className="absolute bottom-20 right-1/3 w-4 h-4 bg-sky-400 rotate-12" />
      </div>

      {/* Confirmation Modal matching screenshot */}
      <div className="relative z-10 bg-dark-800/95 backdrop-blur-md rounded-2xl shadow-2xl border border-dark-600/80 p-8 mx-4 w-full max-w-2xl text-center">
        {/* Green Success Check Icon */}
        <div className="flex justify-center mb-5">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-900/50">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-sm sm:text-base font-normal text-gray-200 mb-6 leading-relaxed">
          Your purchase of the
          <br />
          following reads is successful
        </h2>

        {/* Purchased Books Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-left">
          {displayItems.map((book) => (
            <BookCard key={book.id} book={book} variant="success" />
          ))}
        </div>

        {/* Continue your Shopping CTA button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium px-6 py-2.5 rounded-md flex items-center gap-2 transition-colors shadow-md"
          >
            Continue your Shopping
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
