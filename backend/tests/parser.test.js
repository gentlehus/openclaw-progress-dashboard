const { parseMarkdown } = require('../utils/parser');

describe('parseMarkdown', () => {
  test('should correctly parse various task formats from markdown', () => {
    const markdown = `
# Project Progress

## Completed
- [x] Task 1
## [已完成] Task 2
✅ Task 3

## In Progress
🚧 Task 4
[进行中] Task 5

## Pending
- [ ] Task 6
[待完成] Task 7
⏳ Task 8
    `;

    const expected = {
      summary: { completed: 3, inProgress: 2, pending: 3 },
      tasks: {
        completed: ['Task 1', 'Task 2', 'Task 3'],
        inProgress: ['Task 4', 'Task 5'],
        pending: ['Task 6', 'Task 7', 'Task 8']
      }
    };

    const result = parseMarkdown(markdown);
    expect(result).toEqual(expected);
  });

  test('should handle empty or null input', () => {
    const expected = {
      summary: { completed: 0, inProgress: 0, pending: 0 },
      tasks: {
        completed: [],
        inProgress: [],
        pending: []
      }
    };
    expect(parseMarkdown('')).toEqual(expected);
    expect(parseMarkdown(null)).toEqual(expected);
  });
});
