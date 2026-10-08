import React from "react";
import BookCover from "./BookCover";

/**
 * Reusable BookCard component matching the Catalogue, Detail, Cart, and Confirmation pages.
 *
 * Props:
 *  - book: Book object from data
 *  - variant: "grid" | "sidebar" | "cart" | "success"
 *  - onClick: handler when card is clicked
 *  - onAddToCart: handler for adding to cart
 *  - quantity: number (for cart view)
 *  - onQuantityChange: (qty) => void (for cart view)
 */
export default function BookCard({
  book,
  variant = "grid",
  onClick,
  onAddToCart,
  quantity = 1,
  onQuantityChange,
}) {
  const {
    id,
    title = "Untitled",
    author = "Unknown",
    description = "",
    price = 0,
    delivery = "Mon, 21 Jul",
    format = "Paperback",
    tags = [],
  } = book || {};

  /* ── 1. Grid variant (Catalogue Home Page) ── */
  if (variant === "grid") {
    return (
      <div
        className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-2 sm:p-2.5 rounded-lg hover:bg-dark-800 transition-colors group cursor-pointer"
        onClick={onClick}
      >
        {/* Cover */}
        <div className="flex-shrink-0 flex justify-center">
          <BookCover book={book} size="md" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-100 group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
              {title}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              by{" "}
              <span className="text-blue-400 hover:underline cursor-pointer">
                {author}
              </span>
            </p>
            <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
              {description}
            </p>
            <p className="text-xs text-gray-400 mt-1.5">{format}</p>
            {tags.length > 0 && (
              <p className="text-xs mt-0.5">
                {tags.map((t, i) => (
                  <span key={t}>
                    <span className="text-blue-400 hover:text-blue-300 cursor-pointer">
                      {t}
                    </span>
                    {i < tags.length - 1 && (
                      <span className="text-gray-600">, </span>
                    )}
                  </span>
                ))}
              </p>
            )}
          </div>

          <div className="mt-2">
            <p className="text-base font-bold text-gray-100">₹{price}</p>
            <p className="text-[11px] text-gray-400">Delivery by <span className="font-medium text-gray-300">{delivery}</span></p>
          </div>
        </div>
      </div>
    );
  }

  /* ── 2. Sidebar variant (Related Reads in BookDetail) ── */
  if (variant === "sidebar") {
    return (
      <div
        className="flex gap-3 cursor-pointer group"
        onClick={onClick}
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={(e) => e.key === "Enter" && onClick?.()}
      >
        <div className="flex-shrink-0">
          <BookCover book={book} size="sm" />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gray-100 group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
            {title}
          </h4>
          <p className="text-xs text-gray-400 mt-0.5">
            by{" "}
            <span className="text-blue-400 hover:underline cursor-pointer">
              {author}
            </span>
          </p>
          <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-tight">
            {description}
          </p>
          <p className="text-xs text-gray-400 mt-1">{format}</p>
          {tags.length > 0 && (
            <p className="text-xs mt-0.5">
              {tags.map((t, i) => (
                <span key={t}>
                  <span className="text-blue-400">{t}</span>
                  {i < tags.length - 1 && <span className="text-gray-600">, </span>}
                </span>
              ))}
            </p>
          )}
          <p className="text-sm font-bold text-gray-100 mt-1">₹{price}</p>
          <p className="text-xs text-gray-400">Delivery by {delivery}</p>
        </div>
      </div>
    );
  }

  /* ── 3. Cart variant (Shopping Cart & Payment / Purchase) ── */
  if (variant === "cart") {
    return (
      <div className="flex gap-4 p-3 bg-dark-900 bg-opacity-40 rounded-xl border border-dark-700/60 min-w-0">
        <div className="flex-shrink-0">
          <BookCover book={book} size="sm" />
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-semibold text-gray-100 leading-snug">
              {title}
            </h4>
            <p className="text-xs text-gray-400 mt-0.5">
              by{" "}
              <span className="text-blue-400 cursor-pointer hover:underline">
                {author}
              </span>
            </p>
            <p className="text-xs text-gray-300 mt-1 line-clamp-2 leading-relaxed">
              {description}
            </p>
            <p className="text-xs text-gray-400 mt-1">{format}</p>
            {tags.length > 0 && (
              <p className="text-xs mt-0.5">
                {tags.map((t, i) => (
                  <span key={t}>
                    <span className="text-blue-400 text-xs">{t}</span>
                    {i < tags.length - 1 && (
                      <span className="text-gray-600">, </span>
                    )}
                  </span>
                ))}
              </p>
            )}
            <p className="text-base font-bold text-gray-100 mt-1.5">₹{price}</p>
            <p className="text-[11px] text-gray-400">Delivery by {delivery}</p>
          </div>

          {/* Quantity Controls */}
          {onQuantityChange && (
            <div className="flex items-center gap-2 mt-3">
              <span className="text-xs text-gray-400">{quantity}</span>
              <button
                type="button"
                onClick={() => onQuantityChange(quantity - 1)}
                className="w-6 h-6 rounded bg-dark-700 hover:bg-dark-600 text-gray-200 flex items-center justify-center text-xs font-bold transition-colors"
              >
                -
              </button>
              <button
                type="button"
                onClick={() => onQuantityChange(quantity + 1)}
                className="w-6 h-6 rounded bg-dark-700 hover:bg-dark-600 text-gray-200 flex items-center justify-center text-xs font-bold transition-colors"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ── 4. Success / Confirmation variant ── */
  if (variant === "success") {
    return (
      <div className="flex gap-3 bg-dark-700/80 rounded-xl p-3 min-w-0 border border-dark-600">
        <div className="flex-shrink-0">
          <BookCover book={book} size="sm" />
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-semibold text-gray-100 leading-snug">
              {title}
            </h4>
            <p className="text-xs text-gray-400 mt-0.5">
              by{" "}
              <span className="text-blue-400 cursor-pointer hover:underline">
                {author}
              </span>
            </p>
            <p className="text-xs text-gray-300 mt-1 line-clamp-2 leading-tight">
              {description}
            </p>
            <p className="text-xs text-gray-400 mt-1">{format}</p>
            {tags.length > 0 && (
              <p className="text-xs mt-0.5">
                {tags.map((t, i) => (
                  <span key={t}>
                    <span className="text-blue-400 text-xs">{t}</span>
                    {i < tags.length - 1 && (
                      <span className="text-gray-600">, </span>
                    )}
                  </span>
                ))}
              </p>
            )}
          </div>
          <div>
            <p className="text-base font-bold text-gray-100 mt-1">₹{price}</p>
            <p className="text-[11px] text-gray-400">Delivery by {delivery}</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
