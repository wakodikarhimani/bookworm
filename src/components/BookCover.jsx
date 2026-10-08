import React from "react";

export default function BookCover({ book, size = "md", className = "" }) {
  const {
    title = "",
    author = "",
    coverBg = "#1e293b",
    coverType = "default",
  } = book || {};

  // Size dimensions
  // sm: cart preview (w-20 h-28), md: grid card (w-32 h-44), lg: detail page (w-44 h-60), xl: big
  const sizeClasses = {
    sm: "w-20 h-28 text-[9px]",
    md: "w-28 sm:w-32 h-40 sm:h-44 text-[10px]",
    lg: "w-44 h-60 text-xs",
  }[size] || "w-32 h-44 text-[10px]";

  // Render authentic styled book covers matching screenshots
  if (coverType === "art-of-focus") {
    return (
      <div
        className={`${sizeClasses} rounded-sm flex flex-col items-center justify-between p-2.5 select-none bg-white text-gray-900 border border-gray-200 shadow-md ${className}`}
      >
        <div className="text-center font-extrabold tracking-wider uppercase leading-tight pt-1">
          <span className="text-[11px] block">THE ART OF</span>
          <span className="text-sm font-black text-gray-950 block">FOCUS</span>
        </div>
        {/* Target graphic */}
        <div className="my-auto flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-4 border-red-600 flex items-center justify-center relative">
            <div className="w-6 h-6 rounded-full border-4 border-red-600 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-red-600" />
            </div>
            {/* Arrow */}
            <div className="absolute -top-1 -right-1 w-4 h-4 text-red-600">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3 6-6 3 3-9z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="text-center pb-1">
          <p className="text-[7px] text-gray-500 leading-tight">How to Prioritize Your Life for Maximum Productivity</p>
          <p className="text-[8px] font-bold text-gray-800 uppercase mt-0.5">ARJUN PATEL</p>
        </div>
      </div>
    );
  }

  if (coverType === "art-of-learning") {
    return (
      <div
        className={`${sizeClasses} rounded-sm flex flex-col items-center justify-between p-2.5 select-none bg-[#e11d48] text-white shadow-md ${className}`}
      >
        <div className="text-center font-extrabold tracking-wider uppercase leading-tight pt-1">
          <span className="text-[11px] block text-red-100">THE ART</span>
          <span className="text-[10px] block text-red-100">OF</span>
          <span className="text-xs font-black text-white block">LEARNING</span>
        </div>
        {/* Lightbulb over open book */}
        <div className="my-auto flex flex-col items-center justify-center">
          <svg className="w-6 h-6 text-yellow-300 mb-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2a7 7 0 00-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 001 1h6a1 1 0 001-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 00-7-7zM9 21a1 1 0 001 1h4a1 1 0 001-1v-1H9v1z" />
          </svg>
          <svg className="w-8 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <div className="text-center pb-1">
          <p className="text-[8px] font-bold text-red-100 uppercase tracking-wide">RAJ PATEL</p>
        </div>
      </div>
    );
  }

  if (coverType === "path-to-success") {
    return (
      <div
        className={`${sizeClasses} rounded-sm flex flex-col items-center justify-between p-2.5 select-none bg-[#0e7490] text-white shadow-md relative overflow-hidden ${className}`}
      >
        <div className="text-center font-extrabold tracking-wider uppercase leading-tight pt-1 z-10">
          <span className="text-[10px] block text-cyan-200">THE PATH TO</span>
          <span className="text-xs font-black text-white block">SUCCESS</span>
        </div>
        {/* Curved golden road going up to trophy with person walking */}
        <div className="my-auto w-full flex flex-col items-center justify-center relative h-16">
          <svg viewBox="0 0 100 80" className="w-full h-full">
            {/* Trophy at top right */}
            <path d="M70 12 h12 v6 c0 4-2 6-6 6 h-6 z" fill="#facc15" opacity="0.9" />
            <path d="M64 12 h12 v6 c0 4-2 6-6 6 h-12 z" fill="#eab308" />
            <path d="M67 24 v6 h6 v-6 z" fill="#ca8a04" />
            <path d="M64 30 h12 v3 h-12 z" fill="#a16207" />
            {/* Golden path */}
            <path d="M10 80 Q 40 60 70 32 L 76 32 Q 50 65 30 80 Z" fill="#facc15" />
            {/* Silhouette person */}
            <circle cx="36" cy="46" r="3" fill="#0f172a" />
            <path d="M33 50 h6 v10 h-2 v6 h-2 v-6 h-2 z" fill="#0f172a" />
          </svg>
        </div>
        <div className="text-center pb-1 z-10">
          <p className="text-[8px] font-bold text-cyan-100 uppercase tracking-wide">JAMES WRIGHT</p>
        </div>
      </div>
    );
  }

  if (coverType === "midnight-hour") {
    return (
      <div
        className={`${sizeClasses} rounded-sm flex flex-col items-center justify-between p-2.5 select-none bg-[#091b2c] text-white shadow-md relative overflow-hidden ${className}`}
      >
        <div className="text-center pt-1 z-10">
          <p className="text-[8px] text-cyan-300 italic">A Novel</p>
          <p className="text-xs font-serif font-black tracking-widest text-cyan-100 mt-0.5 uppercase leading-tight">
            THE<br />MIDNIGHT<br />HOUR
          </p>
        </div>
        {/* Silhouette street under lamp */}
        <div className="my-auto w-full flex items-center justify-center opacity-80">
          <svg viewBox="0 0 100 60" className="w-full h-12">
            <circle cx="20" cy="15" r="4" fill="#fef08a" />
            <rect x="18" y="15" width="4" height="40" fill="#334155" />
            <path d="M30 35 h8 v20 h-8 z M50 25 h12 v30 h-12 z M70 30 h10 v25 h-10 z" fill="#1e293b" />
            <circle cx="45" cy="40" r="3" fill="#000" />
            <path d="M43 43 h4 v14 h-4 z" fill="#000" />
          </svg>
        </div>
        <div className="text-center pb-1 z-10">
          <p className="text-[8px] font-bold text-cyan-200 tracking-wider uppercase">JAMES ADAMS</p>
        </div>
      </div>
    );
  }

  if (coverType === "beneath-stars") {
    return (
      <div
        className={`${sizeClasses} rounded-sm flex flex-col items-center justify-between p-2.5 select-none bg-[#312e81] text-white shadow-md relative overflow-hidden ${className}`}
        style={{ background: "linear-gradient(180deg, #1e1b4b 0%, #4338ca 50%, #db2777 100%)" }}
      >
        <div className="text-center pt-1 z-10">
          <p className="text-xs font-serif font-bold text-pink-200 leading-tight">
            Beneath<br /><span className="text-[9px] font-light italic">the</span><br />STARS
          </p>
        </div>
        {/* Two silhouettes looking at stars */}
        <div className="my-auto w-full flex items-center justify-center">
          <svg viewBox="0 0 100 50" className="w-full h-10">
            {/* Stars */}
            <circle cx="20" cy="8" r="1" fill="#fff" />
            <circle cx="50" cy="5" r="1" fill="#fff" />
            <circle cx="80" cy="10" r="1" fill="#fff" />
            {/* Couple */}
            <circle cx="45" cy="25" r="3" fill="#0f172a" />
            <path d="M42 28 h6 v18 h-6 z" fill="#0f172a" />
            <circle cx="53" cy="27" r="2.8" fill="#0f172a" />
            <path d="M51 30 h5 v16 h-5 z" fill="#0f172a" />
          </svg>
        </div>
        <div className="text-center pb-1 z-10">
          <p className="text-[7px] text-pink-300 italic mb-0.5">A ROMANCE</p>
          <p className="text-[8px] font-bold text-pink-100 uppercase tracking-wide">JESSICA MARTIN</p>
        </div>
      </div>
    );
  }

  if (coverType === "final-frontier") {
    return (
      <div
        className={`${sizeClasses} rounded-sm flex flex-col items-center justify-between p-2.5 select-none bg-[#0369a1] text-white shadow-md relative overflow-hidden ${className}`}
      >
        <div className="text-center font-extrabold tracking-wider uppercase leading-tight pt-1 z-10">
          <span className="text-[10px] block text-sky-200">THE</span>
          <span className="text-xs font-black text-white block">FINAL</span>
          <span className="text-xs font-black text-white block">FRONTIER</span>
        </div>
        {/* Rocket heading to space */}
        <div className="my-auto w-full flex items-center justify-center">
          <svg viewBox="0 0 100 60" className="w-full h-12">
            {/* Planet Earth curve */}
            <path d="M0 60 Q 50 20 100 60 Z" fill="#0284c7" />
            {/* Rocket */}
            <g transform="translate(45, 10) rotate(-35)">
              <path d="M0 0 L6 -10 L12 0 L8 12 L4 12 Z" fill="#f87171" />
              <circle cx="6" cy="2" r="2" fill="#fff" />
              {/* Smoke flame */}
              <path d="M4 12 L6 18 L8 12 Z" fill="#facc15" />
            </g>
          </svg>
        </div>
        <div className="text-center pb-1 z-10">
          <p className="text-[8px] font-bold text-sky-100 uppercase tracking-wide">LAURA MITCHELL</p>
        </div>
      </div>
    );
  }

  if (coverType === "joy-minimalism") {
    return (
      <div
        className={`${sizeClasses} rounded-sm flex flex-col items-center justify-between p-2.5 select-none bg-[#facc15] text-gray-900 shadow-md ${className}`}
      >
        <div className="text-center font-extrabold tracking-wider uppercase leading-tight pt-1">
          <span className="text-[10px] block font-bold text-gray-800">THE JOY OF</span>
          <span className="text-xs font-black text-black block">MINIMALISM</span>
        </div>
        {/* Minimalist sun and arch */}
        <div className="my-auto flex flex-col items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-white mb-1 shadow-sm" />
          <div className="w-10 h-7 border-t-4 border-l-4 border-r-4 border-black rounded-t-full flex items-center justify-center">
            <div className="w-5 h-4 border-t-4 border-l-4 border-r-4 border-black rounded-t-full mt-1.5" />
          </div>
        </div>
        <div className="text-center pb-1">
          <p className="text-[8px] font-bold text-black uppercase tracking-wide">DANIEL REED</p>
          <p className="text-[7px] text-gray-700 leading-tight">Simplify your life for greater clarity</p>
        </div>
      </div>
    );
  }

  if (coverType === "vanishing-house") {
    return (
      <div
        className={`${sizeClasses} rounded-sm flex flex-col items-center justify-between p-2.5 select-none bg-[#0f3b39] text-white shadow-md relative overflow-hidden ${className}`}
      >
        <div className="text-center font-serif uppercase tracking-wider leading-tight pt-1 z-10">
          <span className="text-[9px] block text-teal-200">THE</span>
          <span className="text-xs font-bold text-teal-100 block">VANISHING</span>
          <span className="text-xs font-bold text-white block">HOUSE</span>
        </div>
        {/* Moon and creepy house */}
        <div className="my-auto w-full flex items-center justify-center">
          <svg viewBox="0 0 100 50" className="w-full h-10">
            <circle cx="30" cy="12" r="5" fill="#fef08a" />
            <path d="M50 18 L65 30 L65 45 L35 45 L35 30 Z" fill="#042f2e" />
            <path d="M65 24 L75 32 L75 45 L65 45 Z" fill="#022c22" />
          </svg>
        </div>
        <div className="text-center pb-1 z-10">
          <p className="text-[8px] font-bold text-teal-200 uppercase tracking-wide">CLARA NELSON</p>
        </div>
      </div>
    );
  }

  if (coverType === "lost-kitten") {
    return (
      <div
        className={`${sizeClasses} rounded-sm flex flex-col items-center justify-between p-2.5 select-none bg-[#f97316] text-white shadow-md ${className}`}
      >
        <div className="text-center font-bold tracking-wider leading-tight pt-1">
          <span className="text-xs font-extrabold text-amber-100 block">The Lost</span>
          <span className="text-sm font-black text-white block">Kitten</span>
        </div>
        {/* Cute kitten face */}
        <div className="my-auto flex items-center justify-center">
          <svg viewBox="0 0 40 40" className="w-10 h-10 text-white fill-current">
            <path d="M8 12 L12 4 L20 10 L28 4 L32 12 C36 18 36 26 30 32 C25 36 15 36 10 32 C4 26 4 18 8 12 Z" />
            <circle cx="15" cy="18" r="2" fill="#ea580c" />
            <circle cx="25" cy="18" r="2" fill="#ea580c" />
            <polygon points="20,22 17,25 23,25" fill="#ea580c" />
          </svg>
        </div>
        <div className="text-center pb-1">
          <p className="text-[8px] font-bold text-orange-100 uppercase tracking-wide">EMILY PARKER</p>
        </div>
      </div>
    );
  }

  // Fallback cover
  return (
    <div
      className={`${sizeClasses} rounded-sm flex flex-col items-center justify-center p-2 select-none shadow-md ${className}`}
      style={{ background: coverBg }}
    >
      <span className="text-center font-bold uppercase text-white leading-tight">
        {title}
      </span>
      <span className="text-center text-[8px] text-gray-200 mt-2">
        {author}
      </span>
    </div>
  );
}
