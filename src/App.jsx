import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import CataloguePage from "./pages/CataloguePage";
import BookDetailPage from "./pages/BookDetailPage";
import CartCheckoutPage from "./pages/CartCheckoutPage";
import PaymentPage from "./pages/PaymentPage";
import PaymentConfirmationPage from "./pages/OrderSuccessPage";

/**
 * Layout wrapper — renders Navbar above standard page content.
 */
function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-dark-900 flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* 1. Catalogue Page — Home page loaded initially */}
          <Route
            path="/"
            element={
              <MainLayout>
                <CataloguePage />
              </MainLayout>
            }
          />

          {/* Book Detail Page */}
          <Route
            path="/book/:id"
            element={
              <MainLayout>
                <BookDetailPage />
              </MainLayout>
            }
          />

          {/* 2. Shopping Cart & Purpose / Checkout Page */}
          <Route
            path="/cart"
            element={
              <MainLayout>
                <CartCheckoutPage />
              </MainLayout>
            }
          />
          <Route
            path="/checkout"
            element={
              <MainLayout>
                <CartCheckoutPage />
              </MainLayout>
            }
          />

          {/* 3. Payment Page */}
          <Route path="/payment" element={<PaymentPage />} />

          {/* 4. Payment Confirmation / Order Success Page */}
          <Route path="/success" element={<PaymentConfirmationPage />} />

          {/* Navigation stub routes */}
          <Route
            path="/orders"
            element={
              <MainLayout>
                <PlaceholderPage title="My Orders" />
              </MainLayout>
            }
          />
          <Route
            path="/wishlist"
            element={
              <MainLayout>
                <PlaceholderPage title="My Wishlist" />
              </MainLayout>
            }
          />
          <Route
            path="/writers"
            element={
              <MainLayout>
                <PlaceholderPage title="My Writers" />
              </MainLayout>
            }
          />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

function PlaceholderPage({ title }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-200 mb-2">{title}</h1>
        <p className="text-gray-500 text-sm">This page is coming soon.</p>
      </div>
    </div>
  );
}
