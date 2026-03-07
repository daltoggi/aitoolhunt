'use client';

import { useState, useCallback } from 'react';
import { cn } from '../lib/utils';

interface SearchBarProps {
  defaultValue?: string;
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function SearchBar({
  defaultValue = '',
  onSearch,
  placeholder = 'Search AI tools...',
  className,
  size = 'md',
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSearch(query.trim());
    },
    [query, onSearch],
  );

  const sizeClasses = {
    sm: 'h-10 text-sm px-3',
    md: 'h-12 text-base px-4',
    lg: 'h-14 text-lg px-5',
  };

  return (
    <form onSubmit={handleSubmit} className={cn('relative w-full', className)}>
      <div className="relative">
        <svg
          className={cn(
            'absolute left-3 top-1/2 -translate-y-1/2 text-gray-400',
            size === 'lg' && 'left-4 h-5 w-5',
          )}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={cn(
            'w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 shadow-sm outline-none transition-all placeholder:text-gray-400 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100',
            sizeClasses[size],
            size === 'lg' && 'pl-12',
          )}
        />
      </div>
    </form>
  );
}
