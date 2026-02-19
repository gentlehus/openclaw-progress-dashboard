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
      { x: 'Completed', y: 10, fill: '#4CAF50', category: 'completed' },
      { x: 'In Progress', y: 5, fill: '#FF9800', category: 'inProgress' },
      { x: 'Pending', y: 2, fill: '#9E9E9E', category: 'pending' }
    ]);
  });

  it('uses correct colors for slices', () => {
    const data = { completed: 1, inProgress: 1, pending: 1 };
    let tree;
    renderer.act(() => {
      tree = renderer.create(<DashboardChart data={data} />);
    });
    const json = tree.toJSON();
    
    expect(json.props.data[0].fill).toBe('#4CAF50');
    expect(json.props.data[1].fill).toBe('#FF9800');
    expect(json.props.data[2].fill).toBe('#9E9E9E');
  });

  it('filters out items with zero value to avoid VictoryPie sensitivity', () => {
    const data = { completed: 10, inProgress: 0, pending: 5 };
    let tree;
    renderer.act(() => {
      tree = renderer.create(<DashboardChart data={data} />);
    });
    const json = tree.toJSON();
    
    expect(json.props.data).toEqual([
      { x: 'Completed', y: 10, fill: '#4CAF50', category: 'completed' },
      { x: 'Pending', y: 5, fill: '#9E9E9E', category: 'pending' }
    ]);
  });

  it('handles all zero values by providing empty data to VictoryPie', () => {
    const data = { completed: 0, inProgress: 0, pending: 0 };
    let tree;
    renderer.act(() => {
      tree = renderer.create(<DashboardChart data={data} />);
    });
    const json = tree.toJSON();
    
    expect(json.props.data).toEqual([]);
  });
});
