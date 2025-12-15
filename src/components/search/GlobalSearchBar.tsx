import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Clock, TrendingUp as Trending } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useGlobalSearch } from '@/hooks/useGlobalSearch';
import { cn } from '@/lib/utils';
import { sanitizeHtml } from '@/lib/sanitizeHtml';

interface GlobalSearchBarProps {
  placeholder?: string;
  className?: string;
  compact?: boolean;
}

export function GlobalSearchBar({ 
  placeholder = "Search anything...", 
  className,
  compact = false 
}: GlobalSearchBarProps) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  
  const { 
    query, 
    setQuery, 
    results, 
    loading, 
    suggestions,
    clearSearch,
    trackClick,
    useAlgolia,
    setUseAlgolia,
    totalHits,
    processingTime
  } = useGlobalSearch();

  const hasResults = results.length > 0 || suggestions.length > 0;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
    setSelectedIndex(-1);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    const totalItems = results.length + suggestions.length;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < totalItems - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : totalItems - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          if (selectedIndex < results.length) {
            const result = results[selectedIndex];
            navigate(result.url);
            setIsOpen(false);
            inputRef.current?.blur();
          } else {
            const suggestionIndex = selectedIndex - results.length;
            const suggestion = suggestions[suggestionIndex];
            handleSuggestionClick(suggestion);
          }
        } else if (query.trim()) {
          handleSearchSubmit();
        }
        break;
      case 'Escape':
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleResultClick = (url: string, resultId?: string, position?: number) => {
    if (resultId && position !== undefined) {
      trackClick(resultId, position);
    }
    navigate(url);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleSearchSubmit = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleClear = () => {
    clearSearch();
    inputRef.current?.focus();
  };

  const getTypeColor = (type: string) => {
    const colors = {
      page: 'bg-primary/10 text-primary',
      blog: 'bg-green-500/10 text-green-700 dark:text-green-400',
      job: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
      course: 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
      tool: 'bg-orange-500/10 text-orange-700 dark:text-orange-400'
    };
    return colors[type as keyof typeof colors] || 'bg-muted text-muted-foreground';
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      page: 'Page',
      blog: 'Blog',
      job: 'Job',
      course: 'Course',
      tool: 'Tool'
    };
    return labels[type as keyof typeof labels] || type;
  };

  return (
    <div className={cn("relative", className)} ref={resultsRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            "pl-10 pr-10",
            compact ? "h-8 text-sm" : "h-10",
            "transition-all duration-200",
            isOpen && hasResults && "rounded-b-none border-b-0"
          )}
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 p-0"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && hasResults && (
        <div className="absolute top-full left-0 right-0 z-50 bg-background border border-t-0 rounded-b-md shadow-lg max-h-96 overflow-hidden">
          {/* Search Stats */}
          {useAlgolia && totalHits > 0 && processingTime !== undefined && (
            <div className="px-3 py-2 text-xs text-muted-foreground border-b border-border bg-muted/30">
              <div className="flex items-center justify-between">
                <span>{totalHits} results found</span>
                <span>{processingTime}ms via Algolia</span>
              </div>
            </div>
          )}
          <ScrollArea className="max-h-96">
            <div className="p-2">
              {/* Search Results */}
              {results.length > 0 && (
                <div className="mb-2">
                  <div className="px-2 py-1 text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    Results
                  </div>
                  {results.map((result, index) => (
                    <div
                      key={result.id}
                      onClick={() => handleResultClick(result.url, result.id, index)}
                      className={cn(
                        "flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors",
                        "hover:bg-muted/50",
                        selectedIndex === index && "bg-muted"
                      )}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="font-medium text-sm truncate"
                            dangerouslySetInnerHTML={{
                              // Sanitize HTML returned from the search API
                              __html: sanitizeHtml(
                                (result as any)._highlightResult?.title?.value || result.title
                              )
                            }}
                          />
                          <Badge 
                            variant="secondary" 
                            className={cn("text-xs px-2 py-0", getTypeColor(result.type))}
                          >
                            {getTypeLabel(result.type)}
                          </Badge>
                          {useAlgolia && (
                            <Badge variant="outline" className="text-xs">
                              AI
                            </Badge>
                          )}
                        </div>
                        <p
                          className="text-xs text-muted-foreground line-clamp-2"
                          dangerouslySetInnerHTML={{
                            // Sanitize HTML returned from the search API
                            __html: sanitizeHtml(result.snippet || result.description)
                          }}
                        />
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    </div>
                  ))}
                </div>
              )}

              {/* Suggestions */}
              {suggestions.length > 0 && (
                <div>
                  <div className="px-2 py-1 text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    {useAlgolia ? 'AI Suggestions' : 'Suggestions'}
                  </div>
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={suggestion}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={cn(
                        "flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors",
                        "hover:bg-muted/50",
                        selectedIndex === results.length + index && "bg-muted"
                      )}
                    >
                      <Trending className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{suggestion}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* View All Results */}
              {query.trim() && (
                <div className="border-t pt-2 mt-2">
                  <div
                    onClick={handleSearchSubmit}
                    className="flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors hover:bg-muted/50"
                  >
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Search for "{query}" in all content
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground ml-auto" />
                  </div>
                  {/* Search Engine Toggle */}
                  <div
                    onClick={() => setUseAlgolia(!useAlgolia)}
                    className="flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors hover:bg-muted/50"
                  >
                    <span className="text-xs text-muted-foreground">
                      Using: {useAlgolia ? 'Algolia (AI Enhanced)' : 'Basic Search'}
                    </span>
                    <span className="text-xs text-primary">Switch</span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}