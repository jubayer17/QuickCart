"use client";

import React, { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";

const FilterSidebar = ({ categories, onFilterChange }) => {
  const { products } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000);

  const priceRanges = [
    { label: "0-500", min: 0, max: 500 },
    { label: "501-1000", min: 501, max: 1000 },
    { label: "1001-3000", min: 1001, max: 3000 },
    { label: "3001-5000", min: 3001, max: 5000 },
    { label: "5000-10000", min: 5000, max: 10000 },
    { label: "10001-20000", min: 10001, max: 20000 },
    { label: "20001-50000", min: 20001, max: 50000 },
    { label: "50000 above", min: 50000, max: Infinity },
  ];

  const applyFilter = (category, min, max) => {
    setSelectedCategory(category);
    setMinPrice(min);
    setMaxPrice(max);
    onFilterChange({ category, minPrice: min, maxPrice: max });
  };

  const handleCategoryChange = (e) => {
    applyFilter(e.target.value, minPrice, maxPrice);
  };

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value, 10) || 0;
    applyFilter(selectedCategory, 0, value);
  };

  const handleRangeButton = ({ min, max }) => {
    applyFilter(selectedCategory, min, max);
  };

  const handleManualFilter = () => {
    const min = parseInt(minPrice, 10) || 0;
    const max = parseInt(maxPrice, 10) || 0;
    applyFilter(selectedCategory, min, max);
  };

  useEffect(() => {
    // initial sync
    onFilterChange({ category: selectedCategory, minPrice, maxPrice });
  }, []);

  return (
    <div className="w-64 p-4 bg-white shadow rounded-xl space-y-6 sticky top-6 h-fit mr-2">
      <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
        Filters
      </h3>

      {/* Category Filter */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full border rounded px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="All">All</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Slider Filter (max only) */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Max Price: ৳{maxPrice}
        </label>
        <input
          type="range"
          min="0"
          max="50000"
          step="1000"
          value={maxPrice > 50000 ? 50000 : maxPrice}
          onChange={handleSliderChange}
          className="w-full cursor-pointer"
        />
      </div>

      {/* Manual Min-Max Filter */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Custom Price Range
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(parseInt(e.target.value, 10) || 0)}
            className="w-1/2 border rounded px-2 py-1 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(parseInt(e.target.value, 10) || 0)}
            className="w-1/2 border rounded px-2 py-1 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button
          onClick={handleManualFilter}
          className="w-full px-4 py-2 rounded bg-orange-600 text-white font-medium text-sm transition hover:bg-orange-700"
        >
          Filter
        </button>
      </div>

      {/* Quick Price Ranges */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Quick Price Ranges
        </label>
        <div className="flex flex-wrap gap-2 text-sm">
          {priceRanges.map((range) => {
            const isActive =
              minPrice === range.min &&
              (range.max === Infinity
                ? maxPrice > 50000
                : maxPrice === range.max);

            return (
              <button
                key={range.label}
                onClick={() => handleRangeButton(range)}
                className={`px-4 py-2 rounded border transition duration-200 ${
                  isActive
                    ? "bg-orange-600 text-white border-orange-600 shadow-sm"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-orange-50 hover:border-orange-400"
                }`}
              >
                {range.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
