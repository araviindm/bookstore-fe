"use client";
import Link from "next/link";
import DarkModeToggle from "@/components/DarkModeToggle";
import { useState } from "react";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const name = "a";
  return (
    <div className="w-full border-b border-slate-500">
      <nav>
        <div className="block">
          <ul className="flex justify-end h-auto">
            <li className="py-2 pb-6 mt-2.5 text-slate-200">
              <DarkModeToggle />
            </li>
            {isLoggedIn ? (
              <li className="py-2 pb-6 pl-2 text-center md:pl-6">
                <Link href="/profile">
                  <div className="w-10 h-10 pt-[8px] pr-[2px] uppercase text-white rounded-full bg-sky-500">
                    {name}
                  </div>
                </Link>
              </li>
            ) : (
              <>
                <li className="py-2 pb-6 pl-2 text-center md:pl-6">
                  <Link href="/login">
                    <button className="px-4 py-2 ">Login</button>
                  </Link>
                </li>
                <li className="px-2 py-2 pb-6 text-center text-white md:px-6">
                  <Link href="/signup">
                    <button className="px-4 py-2 rounded-md bg-sky-500">
                      Sign up
                    </button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
