import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import BookCard from "../components/BookCard";
import { useCart } from "../context/CartContext";

export default function CartCheckoutPage() {
  const navigate = useNavigate();
  const {
    cartItems,
    itemsSubtotal,
    tax,
    deliveryCharges,
    discount,
    totalAmount,
    coupon,
    setCoupon,
    setDiscountAmount,
    updateQuantity,
  } = useCart();

  const [useSavedAddress, setUseSavedAddress] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    city: "",
    pin: "",
    phonePrefix: "+91",
    phoneNumber: "",
    state: "",
    country: "India",
  });
  const [addressError, setAddressError] = useState("");

  const [couponInput, setCouponInput] = useState(coupon || "DISCOUNT100");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (addressError) {
      setAddressError("");
    }
  };

  const handleSavedAddressToggle = (checked) => {
    setUseSavedAddress(checked);
    if (checked) {
      setAddressError("");
      setFormData((prev) => ({
        ...prev,
        firstName: prev.firstName || "John",
        lastName: prev.lastName || "Smith",
        address: prev.address || "123 MG Road, Suite 400",
        email: prev.email || "john.smith@example.com",
        city: prev.city || "Bangalore",
        pin: prev.pin || "560001",
        phoneNumber: prev.phoneNumber || "9876543210",
        state: prev.state || "Karnataka",
        country: prev.country || "India",
      }));
    }
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      setCoupon(couponInput);
      setDiscountAmount(100);
    }
  };

  const handlePayNow = () => {
    if (!useSavedAddress && !formData.address.trim()) {
      setAddressError("Please enter your delivery address to proceed.");
      return;
    }
    navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100">
      {/* Breadcrumb matching screenshot: Home / Non-Fiction / Self Help / Joy of Minimalism / Checkout / */}
      <div className="max-w-screen-xl mx-auto">
        <Breadcrumb
          crumbs={[
            { label: "Home", to: "/" },
            { label: "Non-Fiction", to: "/" },
            { label: "Self Help", to: "/" },
            { label: "Joy of Minimalism", to: "/book/7" },
            { label: "Checkout" },
          ]}
        />
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Shopping Cart Section Header */}
        <h1 className="text-xl font-semibold text-gray-100 mb-4">
          Shopping Cart
        </h1>

        {/* Cart Items Cards */}
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {cartItems.map((item) => (
              <BookCard
                key={item.book.id}
                book={item.book}
                variant="cart"
                quantity={item.quantity}
                onQuantityChange={(qty) => updateQuantity(item.book.id, qty)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-dark-800 rounded-xl p-8 text-center mb-8 border border-dark-700">
            <p className="text-gray-400 mb-4">Your shopping cart is empty.</p>
            <button
              onClick={() => navigate("/")}
              className="btn-primary mx-auto"
            >
              Explore Catalogue
            </button>
          </div>
        )}

        {/* Address and Grand Total Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Address Form */}
          <div className="lg:col-span-7 bg-dark-800/80 rounded-xl p-6 border border-dark-700">
            <h2 className="text-base font-semibold text-gray-100 mb-4">
              Address
            </h2>

            {/* Use Saved Address Checkbox */}
            <div className="flex items-center gap-2 mb-6">
              <input
                type="checkbox"
                id="savedAddress"
                checked={useSavedAddress}
                onChange={(e) => handleSavedAddressToggle(e.target.checked)}
                className="w-4 h-4 rounded bg-dark-700 border-dark-600 text-blue-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
              />
              <label
                htmlFor="savedAddress"
                className="text-xs text-gray-300 cursor-pointer select-none"
              >
                Use Saved Address
              </label>
            </div>

            {/* Validation error message if address is missing */}
            {addressError && (
              <div className="mb-4 p-2.5 rounded bg-red-950/70 border border-red-500/50 text-red-300 text-xs flex items-center gap-2">
                <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{addressError}</span>
              </div>
            )}

            {/* Form Fields matching the screenshot */}
            <div className="space-y-4">
              {/* Row 1: First Name, Last Name, Address */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-dark-700/60 border border-dark-600 rounded-md py-2 px-3 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-dark-700/60 border border-dark-600 rounded-md py-2 px-3 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">
                    Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address Line 2"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full bg-dark-700/60 border ${addressError ? "border-red-500 focus:border-red-500" : "border-dark-600 focus:border-blue-500"} rounded-md py-2 px-3 text-xs text-gray-200 placeholder-gray-500 focus:outline-none`}
                  />
                </div>
              </div>

              {/* Row 2: e-mail, City, Pin */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">
                    e-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="e-mail"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-dark-700/60 border border-dark-600 rounded-md py-2 px-3 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-dark-700/60 border border-dark-600 rounded-md py-2 px-3 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">
                    Pin
                  </label>
                  <input
                    type="text"
                    name="pin"
                    placeholder="000000"
                    value={formData.pin}
                    onChange={handleInputChange}
                    className="w-full bg-dark-700/60 border border-dark-600 rounded-md py-2 px-3 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Row 3: Phone Number, State, Country */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">
                    Phone Number
                  </label>
                  <div className="flex gap-1.5">
                    <select
                      name="phonePrefix"
                      value={formData.phonePrefix}
                      onChange={handleInputChange}
                      className="bg-dark-700/60 border border-dark-600 rounded-md py-2 px-2 text-xs text-gray-200 focus:outline-none focus:border-blue-500"
                    >
                      <option value="+91">+91</option>
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                    </select>
                    <input
                      type="tel"
                      name="phoneNumber"
                      placeholder="12345567890"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="flex-1 min-w-0 bg-dark-700/60 border border-dark-600 rounded-md py-2 px-3 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full bg-dark-700/60 border border-dark-600 rounded-md py-2 px-3 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">
                    Country
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full bg-dark-700/60 border border-dark-600 rounded-md py-2 px-3 text-xs text-gray-200 focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Illustration + Grand Total Summary */}
          <div className="lg:col-span-5 bg-dark-800/80 rounded-xl p-6 border border-dark-700 flex flex-col sm:flex-row lg:flex-row gap-6">
            {/* Left inside summary: Decorative Books Illustration matching screenshot */}
            <div className="w-full sm:w-40 lg:w-44 h-48 sm:h-auto rounded-lg bg-gradient-to-br from-blue-900/60 via-slate-800/80 to-blue-950 flex flex-col items-center justify-center p-3 relative overflow-hidden border border-blue-900/40">
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    d="M10 20 Q 30 50 10 80 M90 20 Q 70 50 90 80"
                    stroke="#60a5fa"
                    fill="none"
                    strokeWidth="1.5"
                  />
                  <circle cx="20" cy="15" r="2" fill="#fbbf24" />
                  <circle cx="80" cy="85" r="3" fill="#f87171" />
                </svg>
              </div>

              {/* Stacked books graphic */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-4 bg-amber-600 rounded-sm mb-1 transform -rotate-6 shadow-sm" />
                <div className="w-20 h-5 bg-sky-600 rounded-sm mb-1 transform rotate-3 shadow-sm" />
                {/* Open book graphic */}
                <div className="w-24 h-12 bg-amber-100/90 rounded-sm flex items-center justify-center shadow-md relative border border-amber-200">
                  <div className="w-0.5 h-full bg-amber-400" />
                  <div className="absolute left-2 text-[6px] text-amber-900">...</div>
                  <div className="absolute right-2 text-[6px] text-amber-900">...</div>
                </div>
              </div>
            </div>

            {/* Right inside summary: Grand Total & Breakdown */}
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-100 mb-3">
                  Grand Total
                </h3>

                <div className="space-y-2 text-xs text-gray-300">
                  <div className="flex justify-between">
                    <span className="text-gray-400">
                      Price ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} items)
                    </span>
                    <span>₹{itemsSubtotal || 508.0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tax</span>
                    <span>₹{tax || 62.0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Delivery Charges</span>
                    <span className="text-green-400">Free</span>
                  </div>

                  {/* Apply Coupon Form */}
                  <form onSubmit={handleApplyCoupon} className="pt-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Apply Coupon"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="flex-1 min-w-0 bg-dark-700/60 border border-dark-600 rounded-md py-1.5 px-2.5 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      />
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium px-4 py-1.5 rounded-md transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  </form>

                  <div className="flex justify-between pt-1">
                    <span className="text-gray-400">Discount</span>
                    <span>₹{discount}</span>
                  </div>

                  <div className="flex justify-between text-sm font-bold text-gray-100 pt-2 border-t border-dark-700">
                    <span>Total Amount</span>
                    <span>₹{totalAmount || 470}</span>
                  </div>
                </div>
              </div>

              {/* Pay Now Button */}
              <div className="mt-5">
                <button
                  type="button"
                  onClick={handlePayNow}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm shadow-md"
                >
                  Pay Now
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
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
