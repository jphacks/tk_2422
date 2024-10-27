"use client";
import Link from "next/link";
import React, { useState } from "react";

const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <section className="w-full px-3 antialiased lg:px-6">
      <div className="mx-auto">
        <nav className="flex items-center w-full h-24 select-none">
          <div className="relative flex flex-wrap items-start justify-between w-full mx-auto font-medium md:items-center md:h-24 md:justify-between">
            <a href="#_" className="flex items-center w-1/4 py-4 pl-6 pr-4 space-x-2 font-extrabold text-white md:py-0">
              <span className="text-2xl">LuggPal</span>
            </a>
            <div
              className={`${
                showMenu ? "flex" : "hidden md:flex"
              } absolute z-50 flex-col items-center justify-center w-full h-auto px-2 text-center text-gray-400 -translate-x-1/2 border-0 border-gray-700 rounded-full md:border md:w-auto md:h-10 left-1/2 md:flex-row md:items-center`}
            >
              <Link
                href="/"
                className="relative inline-block w-full h-full px-4 py-5 mx-2 font-medium leading-tight text-center hover:text-white md:py-2 group md:w-auto md:px-2 lg:mx-3 md:text-center"
              >
                <span>Home</span>
                <span className="absolute bottom-0 left-0 w-full h-px duration-300 ease-out translate-y-px bg-gradient-to-r md:from-gray-700 md:via-gray-400 md:to-gray-700 from-gray-900 via-gray-600 to-gray-900"></span>
              </Link>
              <Link
                href="/"
                className="relative inline-block w-full h-full px-4 py-5 mx-2 font-medium leading-tight text-center duration-300 ease-out md:py-2 group hover:text-white md:w-auto md:px-2 lg:mx-3 md:text-center"
              >
                <span>Chat</span>
                <span className="absolute bottom-0 w-0 h-px duration-300 ease-out translate-y-px group-hover:left-0 left-1/2 group-hover:w-full bg-gradient-to-r md:from-gray-700 md:via-gray-400 md:to-gray-700 from-gray-900 via-gray-600 to-gray-900"></span>
              </Link>
              <Link
                href="/"
                className="relative inline-block w-full h-full px-4 py-5 mx-2 font-medium leading-tight text-center duration-300 ease-out md:py-2 group hover:text-white md:w-auto md:px-2 lg:mx-3 md:text-center"
              >
                <span>Notification</span>
                <span className="absolute bottom-0 w-0 h-px duration-300 ease-out translate-y-px group-hover:left-0 left-1/2 group-hover:w-full bg-gradient-to-r md:from-gray-700 md:via-gray-400 md:to-gray-700 from-gray-900 via-gray-600 to-gray-900"></span>
              </Link>
              <Link
                href="/"
                className="relative inline-block w-full h-full px-4 py-5 mx-2 font-medium leading-tight text-center duration-300 ease-out md:py-2 group hover:text-white md:w-auto md:px-2 lg:mx-3 md:text-center"
              >
                <span>Profile</span>
                <span className="absolute bottom-0 w-0 h-px duration-300 ease-out translate-y-px group-hover:left-0 left-1/2 group-hover:w-full bg-gradient-to-r md:from-gray-700 md:via-gray-400 md:to-gray-700 from-gray-900 via-gray-600 to-gray-900"></span>
              </Link>
              <Link
                href="/"
                className="relative inline-block w-full h-full px-4 py-5 mx-2 font-medium leading-tight text-center duration-300 ease-out md:py-2 group hover:text-white md:w-auto md:px-2 lg:mx-3 md:text-center"
              >
                <span>Setting</span>
                <span className="absolute bottom-0 w-0 h-px duration-300 ease-out translate-y-px group-hover:left-0 left-1/2 group-hover:w-full bg-gradient-to-r md:from-gray-700 md:via-gray-400 md:to-gray-700 from-gray-900 via-gray-600 to-gray-900"></span>
              </Link>
            </div>
            <div
              className={`${
                showMenu ? "flex" : "hidden"
              } fixed top-0 left-0 z-40 items-center w-full h-full p-3 text-sm bg-gray-900 bg-opacity-50 md:w-auto md:bg-transparent md:p-0 md:relative md:flex`}
            >
              <div className="flex-col items-center w-full h-full p-3 overflow-hidden bg-black bg-opacity-50 rounded-lg select-none md:p-0 backdrop-blur-lg md:h-auto md:bg-transparent md:rounded-none md:relative md:flex md:flex-row md:overflow-auto">
                <div className="flex flex-col items-center justify-end w-full h-full pt-2 md:w-full md:flex-row md:py-0">
                  <a
                    href="#_"
                    className="inline-flex items-center justify-center w-full px-4 py-3 md:py-1.5 font-medium leading-6 text-center whitespace-no-wrap transition duration-150 ease-in-out border border-transparent md:mr-1 text-gray-900 md:w-auto bg-white rounded-lg md:rounded-full hover:bg-white focus:outline-none focus:border-gray-700 focus:shadow-outline-gray active:bg-gray-700"
                  >
                    for Keeper
                  </a>
                </div>
              </div>
            </div>
            <div
              onClick={() => setShowMenu(!showMenu)}
              className={`absolute right-0 z-50 flex flex-col items-end translate-y-1.5 w-10 h-10 p-2 mr-4 rounded-full cursor-pointer md:hidden hover:bg-gray-200/10 hover:bg-opacity-10 ${
                showMenu ? "text-gray-400" : "text-gray-100"
              }`}
            >
              <svg
                className="w-6 h-6"
                style={{ display: showMenu ? "none" : "block" }}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
              <svg className="w-6 h-6" style={{ display: showMenu ? "block" : "none" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Header;
