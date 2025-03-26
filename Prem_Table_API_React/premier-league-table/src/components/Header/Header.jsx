import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [activeLink, setActiveLink] = useState("/"); // Um den aktiven Link zu verfolgen

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed left-0 w-full bg-[#381D54] text-white z-[1000] px-6 h-[60px] flex items-center justify-between transition-all duration-300 ${
          isSticky ? "!top-0 !h-[80px]" : "top-[70px]"
        }`}
      >
        <div className="flex items-center gap-4">
          <img
            src="/img/premierleague-1024x1024.png"
            alt="Premier League Logo"
            className={`h-[130px] transition-all duration-200 ${
              isSticky ? "!h-[80px]" : ""
            }`}
          />
          <span
            className={`text-[35px] font-bold transition-all duration-200 ${
              isSticky ? "!text-[28px]" : ""
            }`}
          >
            Premier League
          </span>
        </div>
      </header>

      {/* Navigation mit den Buttons */}
      <nav className="fixed left-0 top-[70px] w-full px-6 flex flex-col items-start gap-4">
        <NavLink
          to="/"
          className={`text-[20px] no-underline ${
            activeLink === "/" ? "text-white font-bold" : "text-[#c6bece]"
          }`}
          onClick={() => setActiveLink("/")}
        >
          Home
        </NavLink>
        <NavLink
          to="/table"
          className={`text-[20px] no-underline ${
            activeLink === "/table" ? "text-white font-bold" : "text-[#c6bece]"
          }`}
          onClick={() => setActiveLink("/table")}
        >
          Table
        </NavLink>

        {/* Balken unter dem aktiven Button */}
        <div
          className="mt-2 w-full h-[5px] bg-[url('/img/kbalken.png')] bg-cover bg-left"
          style={{
            width: activeLink === "/" ? "75px" : activeLink === "/table" ? "75px" : "0", // Die Breite des Balkens je nach aktivem Link
            transition: "width 0.3s ease",
          }}
        />
      </nav>

      <main className="pt-[230px]">
        <div className="w-full h-[200px] bg-[url('/img/Balken.png')] bg-cover bg-left flex items-center pl-[50px]">
          <h1 className="text-white text-[50px] font-bold">Home</h1>
        </div>

        <div className="mt-[50px] flex justify-center">
          <img
            src="/img/kbalken.png"
            alt="Navigation Indicator"
            className="h-[5px] w-[75px]"
          />
        </div>
      </main>
    </>
  );
}
