"use client";

import { useState, useEffect } from "react";

import { useTheme } from "next-themes";

import { RiMoonClearFill, RiSunFill } from "react-icons/ri";

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [isOn, setIsOn] = useState();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleSwitch = () => {
    setIsOn(!isOn);
    theme == "dark" ? setTheme("light") : setTheme("dark");
  };
  return (
    <div
      className={`flex-start flex h-[25px] w-[50px] rounded-[25px] bg-zinc-100 px-1 pt-1   shadow-inner dark:bg-zinc-700 hover:cursor-pointer ${
        isOn && "place-content-end"
      }`}
      onClick={toggleSwitch}
    >
      <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-black/90 duration-0">
        {isOn ? (
          <RiSunFill className="w-3 h-3 text-yellow-300 " />
        ) : (
          <RiMoonClearFill className="w-3 h-3 text-slate-500" />
        )}
      </div>
    </div>
  );
};

export default DarkModeToggle;
