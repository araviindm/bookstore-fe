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
    <div className="float-right">
      <div
        className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-black/80"
        onClick={toggleSwitch}
      >
        {isOn ? (
          <RiSunFill className="w-3 h-3 text-yellow-300 " />
        ) : (
          <RiMoonClearFill className="w-3 h-3 text-white" />
        )}
      </div>
    </div>
  );
};

export default DarkModeToggle;
