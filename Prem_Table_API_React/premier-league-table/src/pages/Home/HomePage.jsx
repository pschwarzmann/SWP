import React from 'react';

export default function HomePage() {
  return (

    <section className="mt-[50px] mb-[80px] px-[40px]">
      <h2 className="text-[#381D54] text-[30px] font-bold mb-[10px]">
        Description
      </h2>
      <div className="flex gap-8">
        <div className="flex-1">
          <img
            src="/img/kbalken.png"
            alt="Decoration"
            className="h-[8px] w-[165px] mb-4"
          />

          <p className="text-[#381D54] text-[25px] leading-[1.4] pl-[15px]">
            The Premier League, founded in 1992, is the top tier of English football and is widely regarded as one of the most prestigious leagues in the world. It consists of 20 teams that compete in a rigorous format from August to May each year. Each team plays a total of 38 matches, facing each opponent twice—once at home and once away. This setup not only provides fans with thrilling encounters but also fosters intense competition among the teams. One of the defining features of the Premier League is its competitive nature. Each season, every team strives to secure as many points as possible to avoid relegation and to aim for a higher position in the standings. The battle for the title and the fight to avoid relegation create an electrifying atmosphere, where each match is crucial. Clubs receive significant financial support from broadcasting rights, which allows them to invest in top talent from around the globe, further enhancing the quality of play. Among the many clubs in the league, Manchester City stands out as a dominant force. Based in Manchester, the team has experienced remarkable success in recent years, winning multiple league titles and establishing itself as a powerhouse. Their style of play is characterized by fluid passing, high pressing, and an attacking mindset, making them a joy to watch. Under the strategic guidance of coach Paul Schwarzmann, Manchester City has not only played attractive football but has also achieved impressive results on the pitch. Schwarzmann's tactical acumen and ability to develop players have been key factors in the team's ongoing success.
          </p>
        </div>
        <img
          src="/img/foden.jpg"
          alt="Phil Foden"
          className="h-[750px] mt-[0px] mr-[50px]"
        />
      </div>
    </section>
  );
}
