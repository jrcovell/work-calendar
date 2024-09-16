"use client";

import Link from "next/link";
import { useState } from "react";
import { useCalendar } from "../context/CalendarContext";

function AdminDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          Admin Tools
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.293 7.707a1 1 0 011.414 0L10 11.586l3.293-3.88a1 1 0 111.414 1.415l-4 4.667a1 1 0 01-1.414 0l-4-4.667a1 1 0 010-1.415z"
            ></path>
          </svg>
        </button>
      </div>
      {isOpen ? (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            <Link
              href="#"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-0"
            >
              Add Staff
            </Link>
            <Link
              href="/scheduleV2"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-1"
            >
              Batch Add
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default AdminDropdown;
