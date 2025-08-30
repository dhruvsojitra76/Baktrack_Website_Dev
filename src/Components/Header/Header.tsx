"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

type HeaderProps = {
  scrolled: boolean;
};

const Header = ({ scrolled }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { title: "Home", key: "/" },
    { title: "Benefits", key: "benefits" },
    { title: "How it Works?", key: "works" },
    { title: "Pricing", key: "pricing" },
  ];

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed left-1/2 -translate-x-1/2 top-4 flex items-center justify-between w-[90%] z-50 transition-all duration-300
          ${
            scrolled
              ? "max-w-2xl py-2 rounded-lg shadow-lg"
              : "max-w-6xl py-2 rounded-2xl shadow-md"
          } 
          bg-white px-4`}
      >
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/baktrack_logo_large.svg"
              alt="Baktrack"
              width={48}
              height={48}
              className="h-12 w-auto transition-all duration-300"
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.key === "/" ? "/" : `#${item.key}`}
              className="text-gray-600 hover:text-purple-600 transition-colors duration-300 font-medium relative group"
            >
              {item.title}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Contact Us Button (Desktop) */}
        <div className="hidden md:block">
          <Link href="/ContactUs">
            <button className="bg-purple-600 hover:bg-purple-700 transform hover:scale-105 transition-all duration-300 hover:shadow-lg px-6 py-2 rounded-lg text-white font-semibold">
              Contact Us
            </button>
          </Link>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={28} />
        </button>
      </nav>

      {/* Sidebar (Mobile) */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white rounded-s-lg shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-purple-600">Menu</h2>
          <button onClick={() => setIsOpen(false)}>
            <X size={28} className="text-gray-700" />
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="flex flex-col space-y-6 p-6">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.key === "/" ? "/" : `#${item.key}`}
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-purple-600 text-lg font-medium"
            >
              {item.title}
            </a>
          ))}

          <Link href="/ContactUs" onClick={() => setIsOpen(false)}>
            <button className="w-full bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg text-white font-semibold transition-all duration-300">
              Contact Us
            </button>
          </Link>
        </div>
      </div>

      {/* Overlay when sidebar open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
