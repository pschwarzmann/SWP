import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#381D54] text-white py-5 px-[50px] h-[150px] relative bottom-0 w-full">
      <p className="mb-2 text-[16px] ml-[50px]">
        Für weitere Informationen, besuche:
      </p>
      <a
        href="https://www.pornhub.com"
        className="text-white underline hover:no-underline ml-[50px]"
        target="_blank"
        rel="noopener noreferrer"
      >
        Die offizielle Premier League Website
      </a>
    </footer>
  );
}
