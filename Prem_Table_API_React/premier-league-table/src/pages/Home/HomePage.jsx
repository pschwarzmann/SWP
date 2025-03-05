// src/pages/Home/HomePage.jsx
import React from 'react';

export default function HomePage() {
  return (
    <div className="mt-[200px] pl-[50px]">
      <div className="w-full h-[200px] bg-[url('/img/Balken.png')] bg-cover bg-center flex items-center pl-[40px] mb-[200px]">
        <h1 className="text-white text-[50px] font-bold">Home</h1>
      </div>

      <section className="mb-[20px]">
        <h2 className="text-[#381D54] text-[30px] font-bold mb-[-5px]">Description</h2>
        <div className="flex gap-8">
          <div className="flex-1">
            <img
              src="/img/kbalken.png"
              alt="Decoration"
              className="h-[5px] w-[75px] mb-4"
            />
            <p className="text-[#381D54] text-[25px] leading-[1.4]">
              The Premier League, founded in 1992, is the top tier of English football...
            </p>
          </div>
          <img
            src="/img/foden.jpg"
            alt="Phil Foden"
            className="h-[750px] mt-[-20px] mr-[50px]"
          />
        </div>
      </section>
    </div>
  );
}