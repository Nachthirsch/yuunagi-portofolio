/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";

const SearchFilters = ({ filters, setFilters, filterOptions }) => {
  const handleClearFilters = () => {
    setFilters({
      searchQuery: "",
      selectedTags: [],
      selectedCategory: "",
      selectedLanguage: "",
    });
  };

  const hasActiveFilters = filters.searchQuery || filters.selectedTags.length || filters.selectedCategory || filters.selectedLanguage;

  return (
    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-4">
      {/* Minimalist Search Input */}
      <div className="relative">
        <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-neutral-500" size={14} />
        <input type="text" placeholder="Search..." value={filters.searchQuery} onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })} className="w-full pl-6 pr-6 py-1 bg-transparent border-b border-neutral-700/30 text-neutral-300 placeholder-neutral-500 focus:outline-none text-xs" />
        {filters.searchQuery && (
          <button onClick={() => setFilters({ ...filters, searchQuery: "" })} className="absolute right-0 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-400">
            <X size={12} />
          </button>
        )}
      </div>

      {/* Filter Controls - Simple Row */}
      <div className="flex justify-between">
        <div className="flex gap-4 text-[10px] text-neutral-500">
          {/* Category Select - Minimalist */}
          <div>
            <select value={filters.selectedCategory} onChange={(e) => setFilters({ ...filters, selectedCategory: e.target.value })} className="bg-transparent appearance-none pr-4 focus:outline-none hover:text-neutral-400 transition-colors">
              <option value="" className="bg-neutral-800">
                All Categories
              </option>
              {filterOptions.categories.map((category) => (
                <option key={category} value={category} className="bg-neutral-800">
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Language Select - Minimalist */}
          <div>
            <select value={filters.selectedLanguage} onChange={(e) => setFilters({ ...filters, selectedLanguage: e.target.value })} className="bg-transparent appearance-none pr-4 focus:outline-none hover:text-neutral-400 transition-colors">
              <option value="" className="bg-neutral-800">
                All Languages
              </option>
              {filterOptions.languages.map((language) => (
                <option key={language} value={language} className="bg-neutral-800">
                  {language}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Clear Button - Text Only */}
        {hasActiveFilters && (
          <button onClick={handleClearFilters} className="text-[10px] text-neutral-500 hover:text-neutral-300 transition-colors">
            clear all
          </button>
        )}
      </div>

      {/* Tags - Simple Horizontal Line */}
      {filterOptions.tags.length > 0 && (
        <div className="pt-2 border-t border-neutral-800/40">
          <div className="flex flex-wrap gap-2">
            {filterOptions.tags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  const selectedTags = filters.selectedTags.includes(tag) ? filters.selectedTags.filter((t) => t !== tag) : [...filters.selectedTags, tag];
                  setFilters({ ...filters, selectedTags });
                }}
                className={`text-[10px] transition-colors ${filters.selectedTags.includes(tag) ? "text-neutral-300 underline" : "text-neutral-500 hover:text-neutral-400"}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default SearchFilters;
