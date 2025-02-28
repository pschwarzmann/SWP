import React, { useEffect } from 'react';
import './home.css'; // Importiere die CSS-Datei für spezielle Anpassungen

const Home = () => {

  useEffect(() => {
    window.onscroll = function () {
      checkScroll();
    };

    const navbar = document.getElementById('navbar');
    const sticky = navbar.offsetTop - 70;

    function checkScroll() {
      if (window.pageYOffset > sticky) {
        navbar.classList.add('sticky');
        navbar.style.position = 'fixed';
        navbar.style.top = '0';
      } else {
        navbar.classList.remove('sticky');
        navbar.style.position = 'relative';
        navbar.style.top = '70px';
      }
    }
  }, []);

  return (
    <div>
      <header className="bg-[#381d54] text-white">
        <div id="navbar" className="relative top-[70px] left-0 w-full flex items-center p-4 z-10">
          <img
            src="/img/premierleague-1024x1024.png"
            height="200"
            width="200"
            alt="Premier League Logo"
            className="transition-all duration-300"
          />
          <span className="ml-4 text-4xl font-bold">Premier League</span>
        </div>

        <div className="text-center mt-[140px] mb-[-140px] ml-5">
          <div className="flex ml-[60px] gap-[40px]">
            <a href="#" className="font-bold text-white no-underline hover:underline">Home</a>
            <a href="/table" className="font-bold text-white no-underline hover:underline">Table</a>
          </div>
          <img
            src="/img/kbalken.png"
            alt="Home Icon"
            className="mx-[50px] mt-2 h-[5px] w-[75px]"
          />
        </div>

        <div id="wide-bar" className="w-full h-[200px] bg-cover bg-center relative flex items-center justify-start z-[900] bg-[url('/img/Balken.png')]">
          <span className="ml-10 text-white text-5xl font-bold">Home</span>
        </div>

        <div className="ml-[50px] mt-[200px] mb-5">
          <h2 className="text-[#381d54] text-3xl font-extrabold mb-[-5px]">Description</h2>
          <div className="flex items-start">
            <div className="text-[#381d54] text-xl">
              <img
                src="/img/kbalken.png"
                alt="small-image"
                className="inline-block mr-3"
              />
              <p className="text-lg">
                The Premier League, founded in 1992, is the top tier of English football and is widely regarded as one of the most prestigious leagues in the world...
              </p>
            </div>
            <img
              src="/img/foden.jpg"
              alt="foden"
              className="h-[750px] w-auto ml-10 mt-[-20px]"
            />
          </div>
        </div>

        <footer className="bg-[#381d54] text-white p-5 w-full h-[100px] absolute bottom-0">
          <p className="ml-10">Für weitere Informationen, besuche:</p>
          <a href="https://www.premierleague.com" className="ml-10 text-white underline hover:text-gray-300">Die offizielle Premier League Website</a>
        </footer>
      </header>
    </div>
  );
};

export default Home;
