const STATUS_KEYS = ['completed', 'inProgress', 'pending'];

const PATTERNS = {
  completed: [
    /^(?:#+\s*)?- \[x\] (.*)/,
    /^(?:#+\s*)?\[已完成\] (.*)/,
    /^(?:#+\s*)?✅ (.*)/
  ],
  inProgress: [
    /^(?:#+\s*)?🚧 (.*)/,
    /^(?:#+\s*)?\[进行中\] (.*)/
  ],
  pending: [
    /^(?:#+\s*)?- \[ \] (.*)/,
    /^(?:#+\s*)?\[待完成\] (.*)/,
    /^(?:#+\s*)?⏳ (.*)/
  ]
};

/**
 * Creates an initial result structure.
 * @returns {object}
 */
function createInitialResult() {
  const result = {
    summary: {},
    tasks: {}
  };
  for (const key of STATUS_KEYS) {
    result.summary[key] = 0;
    result.tasks[key] = [];
  }
  return result;
}

/**
 * Parses markdown text for task progress.
 * @param {string} text The markdown text to parse.
 * @returns {object} The parsed summary and tasks.
 */
function parseMarkdown(text) {
  const result = createInitialResult();

  if (!text) return result;

  const lines = text.split('\n');

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    let matched = false;
    for (const [status, regexes] of Object.entries(PATTERNS)) {
      for (const regex of regexes) {
        const match = trimmedLine.match(regex);
        if (match) {
          const taskTitle = match[1].trim();
          result.tasks[status].push(taskTitle);
          result.summary[status]++;
          matched = true;
          break;
        }
      }
      if (matched) break;
    }
  }

  return result;
}

module.exports = { parseMarkdown };
