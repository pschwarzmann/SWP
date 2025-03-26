// src/pages/Table/TablePage.jsx
import React, { useEffect, useState } from 'react';

export default function TablePage() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.openligadb.de/getbltable/bl1/2023');
        const data = await response.json();
        setTableData(data);
      } catch (error) {
        console.error('Error fetching table data:', error);
      }
    };
    fetchData();
  }, []);

  return (
      <div className="max-w-[1200px] mx-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="py-3 px-4 text-[#6c757d] text-[16px] font-bold">Position</th>
              <th className="py-3 px-4 text-[#6c757d] text-[16px] font-bold">Club</th>
              <th className="py-3 px-4 text-[#6c757d] text-[16px] font-bold">Played</th>
              <th className="py-3 px-4 text-[#6c757d] text-[16px] font-bold">Won</th>
              <th className="py-3 px-4 text-[#6c757d] text-[16px] font-bold">Drawn</th>
              <th className="py-3 px-4 text-[#6c757d] text-[16px] font-bold">Lost</th>
              <th className="py-3 px-4 text-[#6c757d] text-[16px] font-bold">GF</th>
              <th className="py-3 px-4 text-[#6c757d] text-[16px] font-bold">GA</th>
              <th className="py-3 px-4 text-[#6c757d] text-[16px] font-bold">Points</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((team, index) => (
              <tr key={team.teamId} className={index % 2 === 0 ? 'bg-[#f9f9f9]' : 'bg-white'}>
                <td className="py-4 px-4 text-[14px] h-[60px] align-middle">
                  <div className="flex items-center justify-center gap-2">
                    <span>{index + 1}</span>
                    <span className="text-[20px] text-[#6c757d]">•</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-[14px] h-[60px] align-middle">
                  <div className="flex items-center gap-4">
                    <img
                      src={team.teamIconUrl}
                      alt={team.teamName}
                      className="h-[35px] w-auto"
                    />
                    <span>{team.teamName}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-[14px] h-[60px] align-middle">{team.matches}</td>
                <td className="py-4 px-4 text-[14px] h-[60px] align-middle">{team.won}</td>
                <td className="py-4 px-4 text-[14px] h-[60px] align-middle">{team.draw}</td>
                <td className="py-4 px-4 text-[14px] h-[60px] align-middle">{team.lost}</td>
                <td className="py-4 px-4 text-[14px] h-[60px] align-middle">{team.goals}</td>
                <td className="py-4 px-4 text-[14px] h-[60px] align-middle">{team.opponentGoals}</td>
                <td className="py-4 px-4 text-[14px] h-[60px] align-middle font-bold">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
}