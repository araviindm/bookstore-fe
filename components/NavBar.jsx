"use client";
import Link from "next/link";
import DarkModeToggle from "@/components/DarkModeToggle";
import rootStore from "@/stores/index";

const NavBar = () => {
  let firstLetterOfName = rootStore.custmomerStore.name[0];
  return (
    <div className="w-full border-b h-1/5 border-slate-500">
      <nav>
        <div className="block">
          <ul className="flex justify-end h-auto">
            <li className="py-2 pb-6 mt-2.5 text-slate-200">
              <DarkModeToggle />
            </li>
            {rootStore.userStore.isLoggedIn ? (
              <li className="py-2 pb-6 pl-2 text-center md:pl-6">
                <Link href="/profile">
                  <div className="w-10 h-10 pt-[8px] pr-[2px] uppercase text-white rounded-full bg-sky-500 hover:bg-sky-600">
                    {firstLetterOfName}
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
                    <button className="px-4 py-2 rounded-md bg-sky-500 hover:bg-sky-600">
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
