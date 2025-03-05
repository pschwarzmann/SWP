// src/components/Header/Header.jsx
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 70);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-[70px] w-full bg-[#381D54] text-white z-[1000] px-5 h-[200px] transition-all duration-300 ${isSticky ? '!top-0 !h-[80px]' : ''}`}>
      <div className="flex items-center gap-4">
        <img
          src="/img/premierleague-1024x1024.png"
          alt="Premier League Logo"
          className={`h-[135px] transition-all duration-300 ${isSticky ? '!h-[60px]' : ''}`}
        />
        <span className={`text-[35px] font-bold transition-all duration-300 ${isSticky ? '!text-[28px]' : ''}`}>
          Premier League
        </span>
      </div>

      <div className="flex flex-col items-end mt-[140px]">
        <div className="flex gap-10">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-[20px] no-underline ${isActive ? 'text-white font-bold' : 'text-[#c6bece]'}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/table"
            className={({ isActive }) =>
              `text-[20px] no-underline ${isActive ? 'text-white font-bold' : 'text-[#c6bece]'}`
            }
          >
            Table
          </NavLink>
        </div>
        <img
          src="/img/kbalken.png"
          alt="Navigation Indicator"
          className="h-[5px] w-[75px] mt-2"
        />
      </div>
    </header>
  );
}