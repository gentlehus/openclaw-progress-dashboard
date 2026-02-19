import React from 'react';
import { VictoryPie } from 'victory-native';

const DashboardChart = ({ data }) => {
  const chartData = [
    { x: 'Completed', y: data.completed },
    { x: 'In Progress', y: data.inProgress },
    { x: 'Pending', y: data.pending },
  ];

  const colorScale = ['#4CAF50', '#FF9800', '#9E9E9E'];

  return (
    <VictoryPie
      data={chartData}
      colorScale={colorScale}
      labels={({ datum }) => `${datum.x}: ${datum.y}`}
    />
  );
};

export default DashboardChart;
