"use client";

import { useState, useEffect, useContext } from "react";
import { Menu, X } from "lucide-react";
// import { IoSearchSharp } from "react-icons/io5";
import { AiOutlineShoppingCart } from "react-icons/ai";
// import { RxCross1 } from "react-icons/rx";
import Image from "next/image";
import Link from "next/link";
import { CartContext } from "../context/CartContext";

interface Props {
  opaque: boolean;
  home: boolean;
}

const Navigation = ({ opaque, home }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearch, ] = useState(false);
  // const [searchText, setSearchText] = useState("");
  const [scrolled, setScrolled] = useState(home ? opaque : true);
  const [isHydrated, setIsHydrated] = useState(false);

  const cart = useContext(CartContext);

  if (!cart) {
    throw new Error("CartContext must be used within a CartProvider");
  }

  const { cartItems } = cart;

  useEffect(() => {
    setIsHydrated(true); // Mark as hydrated after the component mounts
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && home) {
      const handleScroll = () => {
        setScrolled(window.scrollY > 50); // Only set scrolled on client-side
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [home]);

  const navClasses = scrolled
    ? "bg-white text-black"
    : "bg-transparent text-white";

  if (!isHydrated) return null;

  return (
    <nav
      className={`fixed top-0 left-0 w-full px-5 py-4 z-50 transition-all duration-300 ${navClasses} ${
        home && scrolled && "shadow-md"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="w-6/14 text-3xl font-bold">
          <Link href="/">
            <Image
              src={scrolled ? "/logo-transparent-png.png" : "/white-logo.png"}
              alt="Foamhead"
              width={0}
              height={0}
              sizes="(max-width: 768px) 320px, 640px"
              className="w-60 md:w-72 lg:w-80 h-auto"
              priority
            />
          </Link>
        </div>

        <div className="hidden lg:flex w-3/7 pl-10 justify-center gap-12">
          <Link href="/surfboards" className="hover:font-bold uppercase">
            Surfboards
          </Link>
          <Link href="/skimboards" className="hover:font-bold uppercase">
            Skimboards
          </Link>
        </div>

        <div className="hidden lg:flex w-2/7 justify-end gap-6 items-center">
          {isSearch ? (
            <div className="flex items-center">
              {/* <input
                autoFocus
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
                type="search"
                className="grow border border-gray-300 rounded-lg px-2 text-black bg-white"
                placeholder="Search"
              />
              <RxCross1
                className="text-xl ml-2 cursor-pointer"
                onClick={() => setIsSearch(false)}
              /> */}
              <AiOutlineShoppingCart className="text-3xl ml-5" />
            </div>
          ) : (
            <div className="flex justify-around w-1/2">
              <div>
                {/* <IoSearchSharp
                  onClick={() => setIsSearch(true)}
                  className="text-3xl cursor-pointer"
                /> */}
              </div>
              <div className="flex items-center">
                <Link href="/cart" className="flex items-center">
                  <AiOutlineShoppingCart className="text-3xl pr-1" />
                  {cartItems.length > 0 && (
                    <p className="px-3 py-1 rounded-full bg-[#d95f44] text-white flex justify-center items-center">
                      {cartItems.length}
                    </p>
                  )}
                </Link>
              </div>
            </div>
          )}
        </div>

        <button
          className="lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden mt-4 flex flex-col gap-4">
          <Link href="/surfboards" className="hover:font-bold uppercase">
            Surfboards
          </Link>
          <Link href="/skimboards" className="hover:font-bold uppercase">
            Skimboards
          </Link>
          <Link href="/cart" className="hover:font-bold uppercase">
            CART
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
