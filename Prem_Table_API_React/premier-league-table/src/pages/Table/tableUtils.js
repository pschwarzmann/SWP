// src/utils/tableUtils.js
export const sortTableData = (data) => {
    return data.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if ((b.goals - b.opponentGoals) !== (a.goals - a.opponentGoals)) {
        return (b.goals - b.opponentGoals) - (a.goals - a.opponentGoals);
      }
      return b.goals - a.goals;
    });
  };