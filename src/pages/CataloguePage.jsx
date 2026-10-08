import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ALL_BOOKS, CATEGORIES } from "../data/booksData";
import BookCard from "../components/BookCard";

export default function CataloguePage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [selectedFormat, setSelectedFormat] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [sortBy, setSortBy] = useState("Relevance");

  // Filtering books
  const filteredBooks = useMemo(() => {
    return ALL_BOOKS.filter((book) => {
      // Category filter
      if (selectedCategory !== "All" && book.category !== selectedCategory) {
        // Also check if any tags match
        const matchesTag = book.tags?.some(
          (t) => t.toLowerCase() === selectedCategory.toLowerCase()
        );
        if (!matchesTag) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = book.title.toLowerCase().includes(query);
        const matchesAuthor = book.author.toLowerCase().includes(query);
        const matchesDesc = book.description?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesAuthor && !matchesDesc) return false;
      }

      // Language filter
      if (selectedLanguage !== "All" && book.language !== selectedLanguage) {
        return false;
      }

      // Format filter
      if (
        selectedFormat !== "All" &&
        !book.format.toLowerCase().includes(selectedFormat.toLowerCase())
      ) {
        return false;
      }

      // Price filter
      if (selectedPriceRange !== "All") {
        if (selectedPriceRange === "under200" && book.price >= 200) return false;
        if (
          selectedPriceRange === "200to400" &&
          (book.price < 200 || book.price > 400)
        )
          return false;
        if (selectedPriceRange === "above400" && book.price <= 400) return false;
      }

      return true;
    });
  }, [
    selectedCategory,
    searchQuery,
    selectedLanguage,
    selectedFormat,
    selectedPriceRange,
  ]);

  // Group by sections for default display
  const recommendedBooks = filteredBooks.filter(
    (b) => b.section === "recommended"
  );
  const bestsellersBooks = filteredBooks.filter(
    (b) => b.section === "bestsellers"
  );
  const newLaunchesBooks = filteredBooks.filter(
    (b) => b.section === "new_launches"
  );

  const isFilteringActive =
    selectedCategory !== "All" ||
    searchQuery.trim() !== "" ||
    selectedLanguage !== "All" ||
    selectedFormat !== "All" ||
    selectedPriceRange !== "All";

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Categories */}
        <aside className="w-56 flex-shrink-0 bg-dark-900 border-r border-dark-700/60 hidden md:block overflow-y-auto py-4">
          <nav className="flex flex-col space-y-0.5">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-left px-5 py-2 text-sm transition-colors font-normal ${
                    isSelected
                      ? "bg-dark-800 text-white font-medium border-l-2 border-blue-500"
                      : "text-gray-400 hover:text-gray-200 hover:bg-dark-800/40"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Catalogue Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {/* Top Filter Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
            {/* Search Input */}
            <div className="relative">
              <label className="block text-[11px] text-gray-400 mb-1">
                Search you want to read here
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-dark-800 border border-dark-700 rounded-md py-2 pl-3 pr-8 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
                <svg
                  className="w-3.5 h-3.5 absolute right-2.5 top-3 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Language Filter */}
            <div>
              <label className="block text-[11px] text-gray-400 mb-1">
                Language
              </label>
              <div className="relative">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full bg-dark-800 border border-dark-700 rounded-md py-2 px-3 text-xs text-gray-300 appearance-none focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="All">All</option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Spanish">Spanish</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Format Filter */}
            <div>
              <label className="block text-[11px] text-gray-400 mb-1">
                Format (Paperback, ebook etc)
              </label>
              <div className="relative">
                <select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="w-full bg-dark-800 border border-dark-700 rounded-md py-2 px-3 text-xs text-gray-300 appearance-none focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="All">All</option>
                  <option value="Paperback">Paperback</option>
                  <option value="Hard Cover">Hard Cover</option>
                  <option value="eBook">eBook</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-[11px] text-gray-400 mb-1">
                Price Range
              </label>
              <div className="relative">
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="w-full bg-dark-800 border border-dark-700 rounded-md py-2 px-3 text-xs text-gray-300 appearance-none focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="All">All</option>
                  <option value="under200">Under ₹200</option>
                  <option value="200to400">₹200 - ₹400</option>
                  <option value="above400">Above ₹400</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Sort Filter */}
            <div>
              <label className="block text-[11px] text-gray-400 mb-1">
                Sort by
              </label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-dark-800 border border-dark-700 rounded-md py-2 px-3 text-xs text-gray-300 appearance-none focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="Relevance">Relevance</option>
                  <option value="PriceLowHigh">Price: Low to High</option>
                  <option value="PriceHighLow">Price: High to Low</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Book Sections */}
          {!isFilteringActive ? (
            <div className="space-y-10">
              {/* Section 1: Recommended for You */}
              <section>
                <h2 className="text-base font-semibold text-gray-100 mb-4">
                  Recommended for You
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendedBooks.map((book) => (
                    <BookCard
                      key={book.id}
                      book={book}
                      variant="grid"
                      onClick={() => navigate(`/book/${book.id}`)}
                    />
                  ))}
                </div>
              </section>

              {/* Section 2: Bestsellers this Month */}
              <section>
                <h2 className="text-base font-semibold text-gray-100 mb-4">
                  Bestsellers this Month
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bestsellersBooks.map((book) => (
                    <BookCard
                      key={book.id}
                      book={book}
                      variant="grid"
                      onClick={() => navigate(`/book/${book.id}`)}
                    />
                  ))}
                </div>
              </section>

              {/* Section 3: New Launches */}
              <section>
                <h2 className="text-base font-semibold text-gray-100 mb-4">
                  New Launches
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {newLaunchesBooks.map((book) => (
                    <BookCard
                      key={book.id}
                      book={book}
                      variant="grid"
                      onClick={() => navigate(`/book/${book.id}`)}
                    />
                  ))}
                </div>
              </section>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-gray-100">
                  Search Results ({filteredBooks.length} books found)
                </h2>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                    setSelectedLanguage("All");
                    setSelectedFormat("All");
                    setSelectedPriceRange("All");
                  }}
                  className="text-xs text-blue-400 hover:underline"
                >
                  Clear Filters
                </button>
              </div>

              {filteredBooks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBooks.map((book) => (
                    <BookCard
                      key={book.id}
                      book={book}
                      variant="grid"
                      onClick={() => navigate(`/book/${book.id}`)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  No books found matching your criteria.
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
