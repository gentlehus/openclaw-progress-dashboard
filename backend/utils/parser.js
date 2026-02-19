/**
 * Parses markdown text for task progress.
 * @param {string} text The markdown text to parse.
 * @returns {object} The parsed summary and tasks.
 */
function parseMarkdown(text) {
  const result = {
    summary: { completed: 0, inProgress: 0, pending: 0 },
    tasks: {
      completed: [],
      inProgress: [],
      pending: []
    }
  };

  if (!text) return result;

  const lines = text.split('\n');

  const patterns = {
    completed: [/- \[x\] (.*)/, /\[已完成\] (.*)/, /✅ (.*)/],
    inProgress: [/🚧 (.*)/, /\[进行中\] (.*)/],
    pending: [/- \[ \] (.*)/, /\[待完成\] (.*)/, /⏳ (.*)/]
  };

  lines.forEach(line => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return;

    for (const [status, regexes] of Object.entries(patterns)) {
      for (const regex of regexes) {
        const match = trimmedLine.match(regex);
        if (match) {
          const taskTitle = match[1].trim();
          result.tasks[status].push(taskTitle);
          result.summary[status]++;
          return; // Move to the next line once a match is found
        }
      }
    }
  });

  return result;
}

module.exports = { parseMarkdown };
