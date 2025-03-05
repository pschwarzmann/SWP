import { useEffect, useState } from 'react';
import styles from './TablePage.module.css';

export default function TablePage() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.openligadb.de/getbltable/bl1/2023'
        );
        const data = await response.json();
        setTableData(data.sort((a, b) => b.points - a.points));
      } catch (error) {
        console.error('Error fetching table data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.tablePage}>
      <div className={styles.tableBanner}>
        <h1 className={styles.bannerText}>Table</h1>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.leagueTable}>
          <thead>
            <tr>
              <th>Position</th>
              <th>Club</th>
              <th>Played</th>
              <th>Won</th>
              <th>Drawn</th>
              <th>Lost</th>
              <th>GF</th>
              <th>GA</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((team, index) => (
              <tr key={team.teamId} className={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                <td className={styles.positionCell}>
                  <span>{index + 1}</span>
                  <span className={styles.dot}>•</span>
                </td>
                <td className={styles.teamCell}>
                  <img 
                    src={team.teamIconUrl} 
                    alt={team.teamName} 
                    className={styles.teamLogo} 
                  />
                  <span>{team.teamName}</span>
                </td>
                <td>{team.matches}</td>
                <td>{team.won}</td>
                <td>{team.draw}</td>
                <td>{team.lost}</td>
                <td>{team.goals}</td>
                <td>{team.opponentGoals}</td>
                <td className={styles.pointsCell}>{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}