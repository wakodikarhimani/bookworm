import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function PaymentPage() {
  const navigate = useNavigate();
  const { totalAmount, completeOrder } = useCart();
  const [selectedMethod, setSelectedMethod] = useState("Credit Card");

  // Payment form states
  const [cardData, setCardData] = useState({
    cardNumber: "",
    nameOnCard: "",
    cvv: "",
    expiry: "",
  });

  const [upiId, setUpiId] = useState("");
  const [walletOption, setWalletOption] = useState("Paytm");

  const payableAmount = totalAmount || 580;

  const handlePayNow = (e) => {
    e.preventDefault();
    // Complete the order in CartContext and navigate to /success
    completeOrder();
    navigate("/success");
  };

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

      {/* Payment Modal Container matching screenshot */}
      <div className="relative z-10 bg-dark-800/95 backdrop-blur-md rounded-xl shadow-2xl border border-dark-600/80 w-full max-w-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-dark-700">
          <h2 className="text-base font-semibold text-gray-100">
            Complete Payment
          </h2>
          <div className="text-sm font-semibold text-gray-100">
            Payable Amount: <span className="font-bold">₹{payableAmount}</span>
          </div>
        </div>

        {/* Modal Body: Left Method Tabs + Right Method Form */}
        <div className="flex flex-col sm:flex-row min-h-[260px]">
          {/* Method Tabs */}
          <div className="w-full sm:w-40 bg-dark-900/60 border-b sm:border-b-0 sm:border-r border-dark-700 flex sm:flex-col">
            {["Credit Card", "Debit card", "UPI", "Wallet"].map((method) => {
              const isSelected = selectedMethod === method;
              return (
                <button
                  key={method}
                  type="button"
                  onClick={() => setSelectedMethod(method)}
                  className={`flex-1 sm:flex-initial text-left px-5 py-3.5 text-xs font-medium transition-colors border-l-2 ${
                    isSelected
                      ? "border-blue-500 text-blue-400 bg-dark-800"
                      : "border-transparent text-gray-400 hover:text-gray-200 hover:bg-dark-800/50"
                  }`}
                >
                  {method}
                </button>
              );
            })}
          </div>

          {/* Form Content */}
          <div className="flex-1 p-6 flex flex-col justify-between">
            <form onSubmit={handlePayNow} className="space-y-4">
              {(selectedMethod === "Credit Card" ||
                selectedMethod === "Debit card") && (
                <>
                  {/* Row 1: Card Number, Name on Card */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="XXXX-XXXX-XXXX-XXXX"
                        value={cardData.cardNumber}
                        onChange={(e) =>
                          setCardData({
                            ...cardData,
                            cardNumber: e.target.value,
                          })
                        }
                        className="w-full bg-dark-700/60 border border-dark-600 rounded-md py-2 px-3 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        placeholder="Name"
                        value={cardData.nameOnCard}
                        onChange={(e) =>
                          setCardData({
                            ...cardData,
                            nameOnCard: e.target.value,
                          })
                        }
                        className="w-full bg-dark-700/60 border border-dark-600 rounded-md py-2 px-3 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Row 2: CVV, Date of Expiry */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="XXX"
                        value={cardData.cvv}
                        onChange={(e) =>
                          setCardData({ ...cardData, cvv: e.target.value })
                        }
                        className="w-full bg-dark-700/60 border border-dark-600 rounded-md py-2 px-3 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">
                        Date of Expiry
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YYYY"
                        value={cardData.expiry}
                        onChange={(e) =>
                          setCardData({ ...cardData, expiry: e.target.value })
                        }
                        className="w-full bg-dark-700/60 border border-dark-600 rounded-md py-2 px-3 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </>
              )}

              {selectedMethod === "UPI" && (
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">
                    UPI ID / VPA
                  </label>
                  <input
                    type="text"
                    placeholder="username@okhdfcbank"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full bg-dark-700/60 border border-dark-600 rounded-md py-2 px-3 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                  <p className="text-[10px] text-gray-400 mt-1">
                    A collect request will be sent to your UPI app.
                  </p>
                </div>
              )}

              {selectedMethod === "Wallet" && (
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">
                    Select Wallet
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Paytm", "PhonePe", "Amazon Pay", "Mobikwik"].map((w) => (
                      <button
                        key={w}
                        type="button"
                        onClick={() => setWalletOption(w)}
                        className={`p-2 rounded border text-xs text-left ${
                          walletOption === w
                            ? "border-blue-500 bg-blue-900/30 text-white"
                            : "border-dark-600 bg-dark-700/40 text-gray-400"
                        }`}
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Pay Now Button */}
              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-5 rounded-md text-xs flex items-center gap-2 transition-colors shadow-md"
                >
                  Pay Now
                  <svg
                    className="w-3.5 h-3.5"
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
