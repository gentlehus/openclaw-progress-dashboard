const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { glob } = require('glob');
const { parseMarkdown } = require('./utils/parser');
const app = express();

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/api/progress', async (req, res) => {
  const workspacePath = process.env.WORKSPACE_PATH || '/home/lubby/.openclaw/workspace';
  
  const emptyResult = {
    summary: { completed: 0, inProgress: 0, pending: 0 },
    tasks: { completed: [], inProgress: [], pending: [] }
  };

  try {
    const files = await glob('**/PROGRESS.md', { cwd: workspacePath, absolute: true });
    
    const parseResults = await Promise.all(
      files.map(async (file) => {
        try {
          const content = await fs.readFile(file, 'utf8');
          return parseMarkdown(content);
        } catch (err) {
          console.error(`Error reading or parsing file ${file}:`, err);
          return null;
        }
      })
    );

    const aggregated = parseResults
      .filter(result => result !== null)
      .reduce((acc, curr) => ({
        summary: {
          completed: acc.summary.completed + curr.summary.completed,
          inProgress: acc.summary.inProgress + curr.summary.inProgress,
          pending: acc.summary.pending + curr.summary.pending,
        },
        tasks: {
          completed: [...acc.tasks.completed, ...curr.tasks.completed],
          inProgress: [...acc.tasks.inProgress, ...curr.tasks.inProgress],
          pending: [...acc.tasks.pending, ...curr.tasks.pending],
        }
      }), emptyResult);

    res.json(aggregated);
  } catch (err) {
    console.error('Error finding PROGRESS.md files:', err);
    res.json(emptyResult);
  }
});

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
