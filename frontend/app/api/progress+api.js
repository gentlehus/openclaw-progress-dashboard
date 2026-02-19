import { glob } from 'glob';
import fs from 'fs/promises';
import { parseMarkdown } from '../../utils/parser';

const WORKSPACE_ROOT = process.env.WORKSPACE_PATH || '/home/lubby/.openclaw/workspace';

export async function GET(request) {
  try {
    const files = await glob('**/PROGRESS.md', {
      cwd: WORKSPACE_ROOT,
      absolute: true
    });

    const aggregated = {
      summary: { completed: 0, inProgress: 0, pending: 0 },
      tasks: { completed: [], inProgress: [], pending: [] }
    };

    const results = await Promise.all(
      files.map(async (file) => {
        try {
          const content = await fs.readFile(file, 'utf-8');
          return parseMarkdown(content);
        } catch (err) {
          console.error(`Error reading ${file}:`, err);
          return null;
        }
      })
    );

    for (const result of results) {
      if (!result) continue;
      
      // Aggregate summary
      aggregated.summary.completed += result.summary.completed || 0;
      aggregated.summary.inProgress += result.summary.inProgress || 0;
      aggregated.summary.pending += result.summary.pending || 0;

      // Aggregate tasks
      aggregated.tasks.completed.push(...(result.tasks.completed || []));
      aggregated.tasks.inProgress.push(...(result.tasks.inProgress || []));
      aggregated.tasks.pending.push(...(result.tasks.pending || []));
    }

    return Response.json(aggregated);
  } catch (error) {
    console.error('Progress API error:', error);
    return Response.json({ error: 'Failed to aggregate progress' }, { status: 500 });
  }
}
