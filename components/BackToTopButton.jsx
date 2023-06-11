import { useState, useEffect } from "react";

import { AiOutlineArrowUp } from "react-icons/ai";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isVisible && (
        <button
          className="fixed w-10 h-10 px-3 text-white rounded-full shadow-md bottom-4 right-4 bg-sky-500"
          onClick={scrollToTop}
        >
          <AiOutlineArrowUp />
        </button>
      )}
    </>
  );
};

export default BackToTopButton;
