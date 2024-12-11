"use client";
import Link from "next/link";
import { useState } from "react";
import { GiSwirledShell } from "react-icons/gi";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Links for the dropdown
  const adminLinks = [
    { href: "/profile", label: "Profile" },
    { href: "/admin/add-product", label: "Add Product" },
    { href: "/admin/products", label: "Products List" },
  ];

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  return (
    <nav className="bg-gray-600 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 text-lg font-bold"
        >
          <GiSwirledShell size={28} /> Next Shop
        </Link>
        <div className="relative flex items-center space-x-4">
          <Link href="/cart">
            <FaShoppingCart size={28} />
          </Link>

          {/* Admin Dropdown */}
          <div className="relative inline-block">
            <button
              onClick={toggleDropdown}
              className="flex items-center rounded bg-gray-500 px-4 py-2 hover:bg-gray-400 focus:outline-none"
            >
              <FaUserCircle size={24} />
            </button>
            {dropdownOpen && (
              <ul className="absolute right-0 mt-2 w-48 rounded bg-white text-gray-700 shadow-lg">
                {adminLinks.map((link) => (
                  <li key={link.href} className="border-b last:border-b-0">
                    <Link
                      href={link.href}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
