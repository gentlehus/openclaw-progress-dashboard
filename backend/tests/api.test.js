const request = require('supertest');
const fs = require('fs');
const path = require('path');
const os = require('os');
const app = require('../index');

describe('GET /api/progress', () => {
  let tempDir;

  beforeAll(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'openclaw-test-'));
    process.env.WORKSPACE_PATH = tempDir;

    // Create some dummy progress files
    const project1Dir = path.join(tempDir, 'project1');
    const project2Dir = path.join(tempDir, 'project2');
    fs.mkdirSync(project1Dir);
    fs.mkdirSync(project2Dir);

    fs.writeFileSync(path.join(project1Dir, 'PROGRESS.md'), '- [x] Task 1\n- [ ] Task 2');
    fs.writeFileSync(path.join(project2Dir, 'PROGRESS.md'), '✅ Task 3\n🚧 Task 4');
  });

  afterAll(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
    delete process.env.WORKSPACE_PATH;
  });

  it('should return aggregated progress from all PROGRESS.md files', async () => {
    const response = await request(app).get('/api/progress');

    expect(response.status).toBe(200);
    expect(response.body.summary).toEqual({
      completed: 2,
      inProgress: 1,
      pending: 1
    });
    
    // Sort to avoid flaky tests due to glob order
    expect(response.body.tasks.completed.sort()).toEqual(['Task 1', 'Task 3']);
    expect(response.body.tasks.inProgress).toEqual(['Task 4']);
    expect(response.body.tasks.pending).toEqual(['Task 2']);
  });

  it('should handle missing workspace path gracefully', async () => {
    process.env.WORKSPACE_PATH = '/non/existent/path';
    const response = await request(app).get('/api/progress');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      summary: { completed: 0, inProgress: 0, pending: 0 },
      tasks: { completed: [], inProgress: [], pending: [] }
    });
  });
});
