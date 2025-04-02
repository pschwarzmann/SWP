import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [activeTab, setActiveTab] = useState("/");

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <header
        className={`fixed left-0 w-full bg-[#381D54] text-white z-[1002] px-6 h-[60px] flex items-center justify-between transition-all duration-300 ${
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

      <div className="absolute left-[50px] top-[190px] z-[1001] flex gap-10">
        <div className="relative">
          <NavLink
            to="/"
            onClick={() => handleTabClick("/")}
            className={({ isActive }) =>
              `text-[20px] no-underline ${
                isActive ? "text-[#381D54] font-bold" : "text-[#c6bece]"
              }`
            }
          >
            Home
          </NavLink>
          <div
            className={`absolute bottom-[-10px] left-0 w-[75px] h-[5px] bg-[url('/img/kbalken.png')] bg-cover ${
              activeTab === "/" ? "block" : "hidden"
            }`}
            style={{ left: "-10px", top: "35.5px" }}
          />
        </div>
        <div className="relative">
          <NavLink
            to="/table"
            onClick={() => handleTabClick("/table")}
            className={({ isActive }) =>
              `text-[20px] no-underline ${
                isActive ? "text-[#381D54] font-bold" : "text-[#c6bece]"
              }`
            }
          >
            Table
          </NavLink>
          <div
            className={`absolute bottom-[-10px] left-0 w-[75px] h-[5px] bg-[url('/img/kbalken.png')] bg-cover ${
              activeTab === "/table" ? "block" : "hidden"
            }`}
            style={{ left: "-10px", top: "35.5px" }}
          />
        </div>
      </div>

      <main className="pt-[230px]">
        <div className="w-full h-[200px] bg-[url('/img/Balken.png')] bg-cover bg-left flex items-center pl-[50px]">
          <h1 className="text-white text-[50px] font-bold">
            {activeTab === "/" ? "Home" : "Table"}
          </h1>
        </div>
      </main>
    </>
  );
}
