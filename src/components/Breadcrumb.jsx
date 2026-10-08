import React from "react";
import { Link } from "react-router-dom";

const ChevronIcon = () => (
  <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export default function Breadcrumb({ crumbs = [] }) {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-gray-400 py-3 px-4 sm:px-6 lg:px-8">
      {crumbs.map((crumb, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 && <ChevronIcon />}
          {crumb.to ? (
            <Link to={crumb.to} className="hover:text-gray-200 transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-gray-200">{crumb.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
