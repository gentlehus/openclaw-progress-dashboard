import React from 'react';
import { VictoryPie } from 'victory-native';

const DashboardChart = ({ data, onPress }) => {
  const chartData = [
    { x: 'Completed', y: data.completed || 0, fill: '#4CAF50', category: 'completed' },
    { x: 'In Progress', y: data.inProgress || 0, fill: '#FF9800', category: 'inProgress' },
    { x: 'Pending', y: data.pending || 0, fill: '#9E9E9E', category: 'pending' },
  ].filter(item => item.y > 0);

  if (chartData.length === 0) return null;

  return (
    <VictoryPie
      data={chartData}
      colorScale={chartData.map(d => d.fill)}
      labels={({ datum }) => `${datum.x}: ${datum.y}`}
      events={[{
        target: "data",
        eventHandlers: {
          onPress: () => {
            return [
              {
                target: "data",
                mutation: ({ datum }) => {
                  if (onPress) onPress(datum.category);
                  return null;
                }
              }
            ];
          }
        }
      }]}
    />
  );
};

export default DashboardChart;
