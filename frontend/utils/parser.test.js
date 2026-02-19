import { parseMarkdown } from './parser';

describe('parseMarkdown', () => {
  it('should correctly parse various task formats from markdown', () => {
    const markdown = `
# Project Progress

## Completed
- [x] Task 1
## [已完成] Task 2
✅ Task 3
### ✅ Task with header
- [x] Task With Trailing Spaces   
✅ Task With Leading Spaces
[已完成] Task with Header Style: # Header

## In Progress
🚧 Task 4
[进行中] Task 5
🚧    Task with Multiple Spaces
## [进行中] Task in header

## Pending
- [ ] Task 6
[待完成] Task 7
⏳ Task 8
- [ ]    Task with Extra Spaces
### ⏳ Pending in header

## False Positives
This is a [x] false positive in the middle of a sentence.
Check this ✅ emoji in the middle.
Dont match - [ ] pending here.
    `;

    const expected = {
      summary: { completed: 7, inProgress: 4, pending: 5 },
      tasks: {
        completed: [
          'Task 1',
          'Task 2',
          'Task 3',
          'Task with header',
          'Task With Trailing Spaces',
          'Task With Leading Spaces',
          'Task with Header Style: # Header'
        ],
        inProgress: ['Task 4', 'Task 5', 'Task with Multiple Spaces', 'Task in header'],
        pending: ['Task 6', 'Task 7', 'Task 8', 'Task with Extra Spaces', 'Pending in header']
      }
    };

    const result = parseMarkdown(markdown);
    expect(result).toEqual(expected);
  });

  it('should capture task title correctly even with unusual characters', () => {
    const markdown = '- [x] Task with [brackets] and (parentheses)';
    const result = parseMarkdown(markdown);
    expect(result.tasks.completed).toContain('Task with [brackets] and (parentheses)');
  });

  it('should trim whitespace from the beginning and end of task titles', () => {
    const markdown = '✅    Spaces everywhere    ';
    const result = parseMarkdown(markdown);
    expect(result.tasks.completed).toContain('Spaces everywhere');
  });

  it('should handle empty or null input', () => {
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
