"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, MapPin, Calendar, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { formatPrice, getCategoryColor } from '@/lib/utils';

interface PackageSuggestion {
  id: string;
  title: string;
  destination: string;
  price: number;
  duration: string;
  category: string;
  slug: string;
  image: string | null;
}

interface SearchSuggestionsProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSelect: (suggestion: PackageSuggestion) => void;
  isOpen: boolean;
  onClose: () => void;
  variant?: 'default' | 'hero';
}

const SearchSuggestions = ({ 
  query, 
  onQueryChange, 
  onSelect, 
  isOpen, 
  onClose,
  variant = 'default'
}: SearchSuggestionsProps) => {
  const [suggestions, setSuggestions] = useState<PackageSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [error, setError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounced API call
  const fetchSuggestions = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/packages/suggest?q=${encodeURIComponent(searchQuery)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch suggestions');
      }

      const data = await response.json();
      setSuggestions(data.suggestions || []);
    } catch (err) {
      console.error('Error fetching suggestions:', err);
      setError('Failed to load suggestions');
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounce search
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (query.trim()) {
      timeoutRef.current = setTimeout(() => {
        fetchSuggestions(query);
      }, 300);
    } else {
      setSuggestions([]);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query, fetchSuggestions]);

  // Reset selected index when suggestions change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [suggestions]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isFocused || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          onSelect(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsFocused(false);
        onClose();
        break;
    }
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
        // Don't call onClose here to preserve the query
      }
    };

    if (isFocused) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFocused]);

  const handleSuggestionClick = (suggestion: PackageSuggestion) => {
    onSelect(suggestion);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    // Add a small delay to allow for suggestion clicks
    setTimeout(() => {
      if (!containerRef.current?.contains(document.activeElement)) {
        setIsFocused(false);
      }
    }, 150);
  };



  const getInputClasses = () => {
    if (variant === 'hero') {
      return "w-full h-10 pl-10 pr-3 bg-white/95 backdrop-blur-sm border-0 rounded-2xl text-gray-800 placeholder-gray-500 text-sm font-medium focus:outline-none focus:ring-0 focus:border-0 transition-all duration-200 shadow-inner";
    }
    return "w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300";
  };

  const getPlaceholder = () => {
    if (variant === 'hero') {
      return "Where do you want to go?";
    }
    return "Search destinations, packages...";
  };

  return (
    <div ref={containerRef} className="relative w-full z-[9998]">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          placeholder={getPlaceholder()}
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className={getInputClasses()}
        />
      </div>

      <AnimatePresence>
        {isFocused && (query.trim() || isLoading) && (
          <>
                         {/* Backdrop overlay */}
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.2 }}
               className="fixed inset-0 bg-black/20 z-[99998]"
               onClick={() => {
                 setIsFocused(false);
                 // Don't call onClose to preserve the query
               }}
             />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 z-[99999] max-h-96 overflow-hidden ${
                variant === 'hero' ? 'backdrop-blur-md bg-white/95' : ''
              }`}
            >
            {isLoading && (
              <div className="p-4 text-center text-gray-500">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-sm">Searching...</p>
              </div>
            )}

            {error && (
              <div className="p-4 text-center text-red-500">
                <p className="text-sm">{error}</p>
              </div>
            )}

            {!isLoading && !error && suggestions.length > 0 && (
              <div className="max-h-96 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <motion.div
                    key={suggestion.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 border-b border-gray-100 last:border-b-0 cursor-pointer transition-all duration-200 hover:bg-blue-50 ${
                      selectedIndex === index ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => handleSuggestionClick(suggestion)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <div className="flex items-start space-x-3">
                      {/* Image */}
                      <div className="flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden bg-gray-100">
                        <OptimizedImage
                          src={suggestion.image}
                          alt={suggestion.title}
                          width={64}
                          height={48}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback to placeholder on error
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center hidden">
                          <MapPin className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="text-sm font-semibold text-gray-900 truncate">
                            {suggestion.title}
                          </h4>
                          <span className={`px-2 py-1 text-xs text-white rounded-full ${getCategoryColor(suggestion.category)}`}>
                            {suggestion.category}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{suggestion.destination}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{suggestion.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="w-3 h-3" />
                            <span className="font-semibold text-green-600">
                              {formatPrice(suggestion.price)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {!isLoading && !error && suggestions.length === 0 && query.trim() && (
              <div className="p-4 text-center text-gray-500">
                <p className="text-sm">No packages found for "{query}"</p>
                <p className="text-xs mt-1">Try different keywords</p>
              </div>
            )}
          </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  };

export default SearchSuggestions; 