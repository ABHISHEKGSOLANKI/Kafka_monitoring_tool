import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-0.5">
        {/* Top Bar */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="text-xl sm:text-2xl font-bold">
            Full Stack Java Developer
          </a>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-2">
            <NavLink
              to="/"
              className="px-4 py-2 hover:bg-green-700 rounded"
            >
              Home
            </NavLink>
            <NavLink
              to="/skills"
              className="px-4 py-2 hover:bg-green-700 rounded"
            >
              Skills
            </NavLink>
            <NavLink
              to="/contact"
              className="px-4 py-2 hover:bg-green-700 rounded"
            >
              Contact
            </NavLink>
          </nav>

          {/* Mobile Button */}
          <button
            className="md:hidden p-2 rounded hover:bg-gray-800"
            onClick={() => setOpen(!open)}
          >
            {/* Hamburger Icon */}
            <div className="space-y-1">
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <nav className="flex flex-col px-4 py-3 space-y-2">
            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className="px-4 py-2 hover:bg-green-700 rounded"
            >
              Home
            </NavLink>
            <NavLink
              to="/skills"
              onClick={() => setOpen(false)}
              className="px-4 py-2 hover:bg-green-700 rounded"
            >
              Skills
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setOpen(false)}
              className="px-4 py-2 hover:bg-green-700 rounded"
            >
              Contact
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}