/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Search, Filter, X } from "lucide-react";

const SearchFilters = ({ filters, setFilters, filterOptions }) => {
  const handleClearFilters = () => {
    setFilters({
      searchQuery: "",
      selectedTags: [],
      selectedCategory: "",
      selectedLanguage: "",
    });
  };

  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
        <input type="text" placeholder="Search posts..." value={filters.searchQuery} onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })} className="w-full pl-10 pr-4 py-2 bg-neutral-800 rounded-lg text-neutral-200 placeholder-neutral-400 focus:ring-2 focus:ring-neutral-400 outline-none" />
      </div>

      {/* Filters Section */}
      <div className="flex flex-wrap gap-4">
        {/* Categories Dropdown */}
        <select value={filters.selectedCategory} onChange={(e) => setFilters({ ...filters, selectedCategory: e.target.value })} className="bg-neutral-800 text-neutral-200 rounded-lg px-3 py-2">
          <option value="">All Categories</option>
          {filterOptions.categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Languages Dropdown */}
        <select value={filters.selectedLanguage} onChange={(e) => setFilters({ ...filters, selectedLanguage: e.target.value })} className="bg-neutral-800 text-neutral-200 rounded-lg px-3 py-2">
          <option value="">All Languages</option>
          {filterOptions.languages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>

        {/* Tags Multi-select */}
        <div className="flex flex-wrap gap-2">
          {filterOptions.tags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                const selectedTags = filters.selectedTags.includes(tag) ? filters.selectedTags.filter((t) => t !== tag) : [...filters.selectedTags, tag];
                setFilters({ ...filters, selectedTags });
              }}
              className={`px-3 py-1 rounded-full text-sm ${filters.selectedTags.includes(tag) ? "bg-neutral-400 text-neutral-900" : "bg-neutral-800 text-neutral-400"}`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Clear Filters Button */}
        {(filters.searchQuery || filters.selectedTags.length || filters.selectedCategory || filters.selectedLanguage) && (
          <button onClick={handleClearFilters} className="flex items-center gap-2 px-3 py-2 bg-neutral-700 text-neutral-200 rounded-lg hover:bg-neutral-600">
            <X size={16} />
            Clear Filters
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default SearchFilters;
