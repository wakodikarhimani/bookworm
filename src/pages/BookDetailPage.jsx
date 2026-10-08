import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import BookCard from "../components/BookCard";
import BookCover from "../components/BookCover";
import StarRating from "../components/StarRating";
import { ALL_BOOKS } from "../data/booksData";
import { useCart } from "../context/CartContext";

/* ── Icon helpers ───────────────────────────────────── */
const CartIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const HeartIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
  </svg>
);

const StarOutlineIcon = () => (
  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
);

const ShoppingBagIcon = () => (
  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

export default function BookDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, wishlist, toggleWishlist } = useCart();

  // Find the selected book, or default to "Joy of Minimalism" (id: 7)
  const currentId = id ? parseInt(id, 10) : 7;
  const book = ALL_BOOKS.find((b) => b.id === currentId) || ALL_BOOKS[6];

  // Related reads: 3 other recommended books
  const relatedBooks = ALL_BOOKS.filter((b) => b.id !== book.id).slice(0, 3);

  const [reviewText, setReviewText] = useState("");
  const [userRating, setUserRating] = useState(0);
  const maxChars = 100;

  const isWishlisted = wishlist.includes(book.id);

  const handleAddToCart = () => {
    addToCart(book, 1);
    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Breadcrumb */}
      <div className="max-w-screen-xl mx-auto">
        <Breadcrumb
          crumbs={[
            { label: "Home", to: "/" },
            { label: "Non-Fiction", to: "/" },
            { label: book.tags?.[1] || "Self Help" },
          ]}
        />
      </div>

      {/* Main content */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ── Left Column: Main book content ── */}
          <div className="flex-1 min-w-0">
            {/* Book detail card */}
            <div className="surface p-5">
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Book Cover + Back Cover layout (like screenshot) */}
                <div className="flex-shrink-0 flex gap-2">
                  <BookCover book={book} size="lg" />

                  {/* Back cover description view matching screenshot */}
                  <div className="hidden sm:flex w-44 h-60 rounded-sm bg-[#fef08a] text-gray-900 p-3 flex-col justify-between text-[9px] shadow-md border border-yellow-300/40">
                    <div>
                      <p className="italic text-gray-700 leading-tight">
                        "A refreshingly practical roadmap to personal peace."
                      </p>
                      <p className="font-bold text-gray-900 mt-2">Discover how less can truly be more.</p>
                      <p className="text-gray-700 mt-1 line-clamp-4 leading-snug">
                        {book.description} Whether you're overwhelmed, over-committed, or just want clarity—this book offers a calm, mindful approach.
                      </p>
                    </div>
                    <div className="border-t border-yellow-400/50 pt-2 flex items-center justify-between">
                      <span className="font-bold text-[8px] text-gray-800">ABC Publishers</span>
                      {/* Barcode visual */}
                      <div className="w-14 h-4 bg-gray-900 flex items-center justify-around px-0.5">
                        <div className="w-0.5 h-3 bg-white" />
                        <div className="w-1 h-3 bg-white" />
                        <div className="w-0.5 h-3 bg-white" />
                        <div className="w-1.5 h-3 bg-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Book Info */}
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl font-bold text-gray-100">{book.title}</h1>
                  <p className="text-sm text-gray-400 mt-1">
                    by{" "}
                    <span className="text-blue-400 hover:underline cursor-pointer">
                      {book.author}
                    </span>
                  </p>
                  <p className="text-sm text-gray-300 mt-3">{book.description}</p>

                  <p className="text-sm text-gray-400 mt-3">
                    Published by:{" "}
                    <span className="text-blue-400 hover:underline cursor-pointer">
                      {book.publisher || "ABC Publishers"}
                    </span>
                  </p>
                  <p className="text-sm text-gray-400 mt-1">{book.format}</p>

                  {book.tags?.length > 0 && (
                    <p className="text-sm mt-1">
                      {book.tags.map((t, i) => (
                        <span key={t}>
                          <span className="text-blue-400 hover:text-blue-300 cursor-pointer">{t}</span>
                          {i < book.tags.length - 1 && (
                            <span className="text-gray-600">, </span>
                          )}
                        </span>
                      ))}
                    </p>
                  )}

                  <p className="text-2xl font-bold text-gray-100 mt-4">₹{book.price}</p>
                  <p className="text-sm text-gray-400 mt-0.5">
                    Delivery by{" "}
                    <span className="font-medium text-gray-300">{book.delivery}</span>
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap gap-3 mt-5">
                    <button onClick={handleAddToCart} className="btn-primary">
                      <CartIcon />
                      Add to Cart
                    </button>
                    <button
                      className={`btn-outline ${isWishlisted ? "border-pink-500 text-pink-400" : ""}`}
                      onClick={() => toggleWishlist(book.id)}
                    >
                      <HeartIcon />
                      {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                    </button>
                  </div>

                  {/* Meta row */}
                  <div className="flex flex-wrap gap-5 mt-5 pt-5 border-t border-dark-700">
                    <div className="flex items-center gap-1.5">
                      <GlobeIcon />
                      <span className="text-xs text-gray-400">Language</span>
                      <span className="text-xs text-blue-400 ml-1">{book.language || "English"}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <StarOutlineIcon />
                      <span className="text-xs text-gray-400">Rating</span>
                      <div className="ml-1">
                        <StarRating value={book.rating || 4} size="sm" />
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ShoppingBagIcon />
                      <span className="text-xs text-gray-400">Sells</span>
                      <span className="text-xs text-gray-300 ml-1 font-medium">
                        {book.sells || 145} copies sold
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About the Writer */}
            <div className="surface p-5 mt-4">
              <h2 className="text-base font-semibold text-gray-100 mb-4">About the writer</h2>
              <div className="flex gap-4">
                <div className="w-14 h-14 flex-shrink-0 rounded-full bg-slate-700 flex items-center justify-center text-lg font-bold text-gray-300 border border-dark-600">
                  {book.author.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-100">{book.author}</h3>
                  <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                    {book.authorBio ||
                      `${book.author} is an accomplished author recognized for insightful explorations into personal development, thoughtful living, and contemporary philosophy.`}
                  </p>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="surface p-5 mt-4">
              <h2 className="text-base font-semibold text-gray-100 mb-4">Reviews</h2>

              {/* Review input */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm text-gray-400">Leave Your Review</label>
                  <span className="text-xs text-gray-500">
                    {reviewText.length}/{maxChars}
                  </span>
                </div>
                <textarea
                  className="w-full bg-dark-700 border border-dark-600 rounded-lg text-sm text-gray-200 placeholder-gray-600 p-3 resize-none focus:outline-none focus:border-blue-500 transition-colors"
                  rows={4}
                  placeholder="Placeholder text"
                  maxLength={maxChars}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
                <div className="flex items-center justify-between mt-3">
                  <StarRating
                    value={userRating}
                    onChange={setUserRating}
                    size="lg"
                  />
                  <button className="btn-primary" onClick={() => { setReviewText(""); setUserRating(0); }}>
                    Submit
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Sample review */}
              <div className="border-t border-dark-700 pt-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 flex-shrink-0 rounded-full bg-gray-600 flex items-center justify-center text-sm font-semibold text-gray-200">
                    JS
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-200">John Smith</p>
                    <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                      The accordion component delivers large amounts of content in a small space through
                      progressive disclosure. The user gets key details about the underlying content and
                      can choose to expand that content within the constraints of the accordion.
                    </p>
                    <div className="mt-2">
                      <StarRating value={5} size="sm" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Column: Related Reads ── */}
          <div className="lg:w-72 xl:w-80 flex-shrink-0">
            <div className="surface p-4 sticky top-20">
              <h2 className="text-base font-semibold text-gray-100 mb-4">Related Reads</h2>
              <div className="flex flex-col gap-5 divide-y divide-dark-700">
                {relatedBooks.map((b, idx) => (
                  <div key={b.id} className={idx > 0 ? "pt-5" : ""}>
                    <BookCard
                      book={b}
                      variant="sidebar"
                      onClick={() => navigate(`/book/${b.id}`)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
