"use client";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { useState, useEffect } from "react";
import FilterSidebar from "@/components/FilterSidebar";

const AllProducts = () => {
  const { products } = useAppContext();

  // ✅ ADD THIS STATE
  const [filteredProducts, setFilteredProducts] = useState([]);

  // ✅ ADD THIS FUNCTION
  const handleFilterChange = ({ category, maxPrice }) => {
    const filtered = products.filter(
      (p) =>
        (category === "All" || p.category === category) && p.price <= maxPrice
    );
    setFilteredProducts(filtered);
  };
  useEffect(() => {
    setFilteredProducts(products); // ✅ sync after load
  }, [products]);
  return (
    <>
      <Navbar />

      <div className="flex gap-4 w-auto px-6 md:px-16 lg:px-32">
        {/* ✅ Sidebar with width */}
        <div className="hidden lg:block pr-2">
          <FilterSidebar
            categories={["Speaker", "Earbuds", "Laptop", "Smartwatch"]}
            onFilterChange={handleFilterChange}
          />
        </div>

        <div className="flex flex-col items-start w-full">
          <div className="flex flex-col items-end pt-12">
            <p className="text-2xl font-medium">All products</p>
            <div className="w-14 h-0.5 bg-orange-600 rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-col items-center gap-4 mt-12 pb-14 w-full">
            {filteredProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AllProducts;
