"use client";
import React from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import logo2 from "../assets/logo.svg";
import { useClerk, UserButton } from "@clerk/nextjs";
import ProductList from "@/app/seller/product-list/page";

const Navbar = () => {
  const { isSeller, router, user } = useAppContext();
  const { getCartCount } = useAppContext();
  const cartCount = getCartCount();

  const { openSignIn } = useClerk();
  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push("/")}
        src={logo2}
        alt="logo"
      />

      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link
          href="/"
          className="border-b-2 border-transparent hover:border-red-700 transition-all duration-300"
        >
          Home
        </Link>
        <Link
          href="/all-products"
          className="border-b-2 border-transparent hover:border-red-700 transition-all duration-300"
        >
          Shop
        </Link>

        <Link
          href="/"
          className="border-b-2 border-transparent hover:border-red-700 transition-all duration-300"
        >
          About Us
        </Link>
        <Link
          href="/"
          className="border-b-2 border-transparent hover:border-red-700 transition-all duration-300"
        >
          Contact
        </Link>

        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        )}
      </div>

      <ul className="hidden md:flex items-center gap-4">
        {/* Search Icon */}
        <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />

        {/* Cart Icon with Badge */}
        <div
          className="relative cursor-pointer mr-2"
          onClick={() => router.push("/cart")}
        >
          <CartIcon />
          {cartCount > 0 && (
            <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </div>

        {/* Account/Login Button or User Menu */}
        {user ? (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="Cart"
                labelIcon={<CartIcon />}
                onClick={() => router.push("/cart")}
              />
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Orders"
                labelIcon={<BagIcon />}
                onClick={() => router.push("/my-orders")}
              />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-2 hover:text-gray-900 transition"
          >
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
      </ul>

      <div className="flex items-center md:hidden gap-3">
        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        )}
        {user ? (
          <>
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Home"
                  labelIcon={<HomeIcon />}
                  onClick={() => {
                    router.push("/");
                  }}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Products"
                  labelIcon={<BoxIcon />}
                  onClick={() => {
                    router.push("/all-products");
                  }}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Cart"
                  labelIcon={<CartIcon />}
                  onClick={() => {
                    router.push("/cart");
                  }}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Orders"
                  labelIcon={<BagIcon />}
                  onClick={() => {
                    router.push("/my-orders");
                  }}
                />
              </UserButton.MenuItems>
            </UserButton>
          </>
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-2 hover:text-gray-900 transition"
          >
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
