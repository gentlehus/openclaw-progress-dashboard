const express = require('express');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const { parseMarkdown } = require('./utils/parser');
const app = express();

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/api/progress', (req, res) => {
  const workspacePath = process.env.WORKSPACE_PATH || '/home/lubby/.openclaw/workspace';
  
  const result = {
    summary: { completed: 0, inProgress: 0, pending: 0 },
    tasks: { completed: [], inProgress: [], pending: [] }
  };

  try {
    const files = glob.sync('**/PROGRESS.md', { cwd: workspacePath, absolute: true });
    
    files.forEach(file => {
      try {
        const content = fs.readFileSync(file, 'utf8');
        const parsed = parseMarkdown(content);
        
        // Aggregate summary
        result.summary.completed += parsed.summary.completed;
        result.summary.inProgress += parsed.summary.inProgress;
        result.summary.pending += parsed.summary.pending;
        
        // Aggregate tasks
        result.tasks.completed.push(...parsed.tasks.completed);
        result.tasks.inProgress.push(...parsed.tasks.inProgress);
        result.tasks.pending.push(...parsed.tasks.pending);
      } catch (err) {
        console.error(`Error reading or parsing file ${file}:`, err);
      }
    });
  } catch (err) {
    console.error('Error finding PROGRESS.md files:', err);
  }

  res.json(result);
});

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
