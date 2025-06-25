import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";

const ProductCard = ({ product }) => {
  const { currency, router, addToCart } = useAppContext();

  return (
    <div>
      <div className="cursor-pointer group relative bg-gray-500/10 rounded-lg w-full h-52 flex items-center justify-center">
        <Image
          src={product.image[0]}
          alt={product.name}
          className="group-hover:scale-105 transition object-cover w-4/5 h-4/5 md:w-full md:h-full"
          width={800}
          height={800}
        />
        <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md">
          <Image className="h-3 w-3" src={assets.heart_icon} alt="heart_icon" />
        </button>
      </div>

      <p className="md:text-base font-semibold pt-2 w-full truncate text-gray-800">
        {product.name}
      </p>

      <p className="w-full text-xs text-gray-500/70 max-sm:hidden truncate">
        {product.description}
      </p>
      <div className="flex items-center gap-2">
        <p className="text-xs">{4.5}</p>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Image
              key={index}
              className="h-3 w-3"
              src={
                index < Math.floor(4) ? assets.star_icon : assets.star_dull_icon
              }
              alt="star_icon"
            />
          ))}
        </div>
      </div>

      {/* Price Row */}
      <div className="w-full mt-1">
        <div className="flex items-center gap-2">
          <p className="text-base font-medium text-gray-900">
            {currency}
            {product.offerPrice}
          </p>

          <p className="text-sm text-gray-500 line-through">
            {currency}
            {product.price}
          </p>
        </div>
      </div>

      {/* Buttons on new line */}
      <div className="flex gap-2 mt-1 max-sm:hidden">
        <button
          onClick={() => addToCart(product._id)}
          className="px-4 py-1.5 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-50 transition"
        >
          Add to Cart
        </button>
        <button
          onClick={() => {
            addToCart(product._id);
            router.push("/cart");
          }}
          className="px-4 py-1.5 text-white bg-orange-500 border border-orange-500 rounded-full text-xs hover:bg-orange-600 transition"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
