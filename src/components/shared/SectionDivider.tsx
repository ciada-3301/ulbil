import React from 'react';

interface SectionDividerProps {
  className?: string;
}

export default function SectionDivider({ className = '' }: SectionDividerProps) {
  return (
    <div className={`flex items-center justify-center py-8 ${className}`} aria-hidden="true">
      <div className="flex items-center gap-4 w-full max-w-xs">
        {/* Left rule */}
        <div className="flex-1 divider-line" />
        
        {/* Ornamental flourish */}
        <svg
          width="28"
          height="14"
          viewBox="0 0 28 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 text-[#B8860B] opacity-60"
        >
          <path
            d="M14 2C10 2 8 7 4 7C2 7 1 6 0 5M14 2C18 2 20 7 24 7C26 7 27 6 28 5M14 12C10 12 8 7 4 7M14 12C18 12 20 7 24 7"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <circle cx="14" cy="7" r="1.5" fill="currentColor" />
        </svg>

        {/* Right rule */}
        <div className="flex-1 divider-line" />
      </div>
    </div>
  );
}
