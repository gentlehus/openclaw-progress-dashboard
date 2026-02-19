import React from 'react';
import renderer from 'react-test-renderer';
import DashboardChart from './DashboardChart';

// Mock victory-native as it contains native code that might fail in jest
jest.mock('victory-native', () => ({
  VictoryPie: 'VictoryPie'
}));

describe('DashboardChart', () => {
  it('renders correctly with given data', () => {
    const data = { completed: 10, inProgress: 5, pending: 2 };
    let tree;
    renderer.act(() => {
      tree = renderer.create(<DashboardChart data={data} />);
    });
    const json = tree.toJSON();
    
    expect(json).toBeDefined();
    expect(json.type).toBe('VictoryPie');
    expect(json.props.data).toEqual([
      { x: 'Completed', y: 10 },
      { x: 'In Progress', y: 5 },
      { x: 'Pending', y: 2 }
    ]);
  });

  it('uses correct colors for slices', () => {
    const data = { completed: 1, inProgress: 1, pending: 1 };
    let tree;
    renderer.act(() => {
      tree = renderer.create(<DashboardChart data={data} />);
    });
    const json = tree.toJSON();
    
    expect(json.props.colorScale).toEqual(['#4CAF50', '#FF9800', '#9E9E9E']);
  });
});
