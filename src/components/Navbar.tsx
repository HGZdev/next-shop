// components/Navbar.tsx
"use client";
import Link from "next/link";
import {GiSwirledShell} from "react-icons/gi";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-600 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link
          href="/"
          className="text-lg font-bold flex justify-center items-center gap-2"
        >
          <GiSwirledShell size={28} /> Next Shop
        </Link>
        <div className="space-x-4">
          <Link href="/cart">Cart</Link>
          <Link href="/profile">Profile</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
