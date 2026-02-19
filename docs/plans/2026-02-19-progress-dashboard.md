# OpenClaw Progress Dashboard Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a project progress dashboard consisting of a Node.js backend to parse `PROGRESS.md` files and an Expo frontend to visualize the data with a pie chart.

**Architecture:** A decoupled frontend-backend architecture. The backend scans the local workspace for progress files and exposes a JSON API. The frontend fetches this data every 60 seconds and renders interactive visualizations.

**Tech Stack:** Node.js, Express, Expo, Victory Native, Jest, Axios.

---

### Task 1: Backend Scaffolding & Initial Test

**Files:**
- Create: `backend/package.json`
- Create: `backend/index.js`
- Test: `backend/tests/index.test.js`

**Step 1: Write the failing test**

```javascript
const request = require('supertest');
const app = require('../index');

describe('GET /api/health', () => {
  it('should return health status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });
});
```

**Step 2: Run test to verify it fails**

Run: `cd backend && npm test`
Expected: FAIL (dependencies missing, index.js empty)

**Step 3: Write minimal implementation**

Initialize `npm`, install `express`, `supertest`, `jest`. Set up `index.js` with `/api/health`.

**Step 4: Run test to verify it passes**

Run: `cd backend && npm test`
Expected: PASS

**Step 5: Commit**

```bash
git add backend/
git commit -m "feat(backend): scaffold express server with health check"
```

---

### Task 2: Progress Parser Implementation (TDD)

**Files:**
- Create: `backend/utils/parser.js`
- Test: `backend/tests/parser.test.js`

**Step 1: Write the failing test**

```javascript
const { parseMarkdown } = require('../utils/parser');

const mockMD = \`
# Project
- [x] Task 1
- [ ] Task 2
## [已完成] Task 3
🚧 Task 4
\`;

describe('parseMarkdown', () => {
  it('should correctly categorize tasks', () => {
    const result = parseMarkdown(mockMD);
    expect(result.summary.completed).toBe(2);
    expect(result.summary.inProgress).toBe(1);
    expect(result.summary.pending).toBe(1);
    expect(result.tasks.completed).toContain('Task 1');
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm test backend/tests/parser.test.js`
Expected: FAIL

**Step 3: Write minimal implementation**

Implement `parseMarkdown` using regex for the patterns defined in the design doc.

**Step 4: Run test to verify it passes**

Run: `npm test backend/tests/parser.test.js`
Expected: PASS

**Step 5: Commit**

```bash
git add backend/utils/parser.js backend/tests/parser.test.js
git commit -m "feat(backend): add markdown parser for progress files"
```

---

### Task 3: API Endpoint for Progress Statistics

**Files:**
- Modify: `backend/index.js`
- Test: `backend/tests/api.test.js`

**Step 1: Write the failing test**

Test that `GET /api/progress` returns aggregated data from the workspace (using a mock workspace directory).

**Step 2: Run test to verify it fails**

Run: `npm test backend/tests/api.test.js`
Expected: FAIL (404 or empty data)

**Step 3: Write minimal implementation**

Use `glob` to find `PROGRESS.md` files in \`/home/lubby/.openclaw/workspace/\`, read them, parse them, and aggregate results.

**Step 4: Run test to verify it passes**

Run: `npm test backend/tests/api.test.js`
Expected: PASS

**Step 5: Commit**

```bash
git add backend/index.js
git commit -m "feat(backend): implement /api/progress endpoint"
```

---

### Task 4: Frontend Scaffolding

**Files:**
- Create: `frontend/` (via \`npx create-expo-app\`)

**Step 1: Initialize App**

Run: \`npx create-expo-app@latest frontend --template blank\`

**Step 2: Install dependencies**

Install \`victory-native\`, \`axios\`, \`react-native-svg\`.

**Step 3: Commit**

```bash
git add frontend/
git commit -m "feat(frontend): scaffold expo application"
```

---

### Task 5: Dashboard Visualization (TDD)

**Files:**
- Create: \`frontend/components/DashboardChart.js\`
- Test: \`frontend/components/DashboardChart.test.js\`

**Step 1: Write the failing test**

Verify that \`DashboardChart\` renders a \`VictoryPie\` component when provided with data.

**Step 2: Run test to verify it fails**

Run: \`npm test\` in frontend directory.
Expected: FAIL

**Step 3: Write minimal implementation**

Implement the component using \`victory-native\`.

**Step 4: Run test to verify it passes**

Run: \`npm test\`
Expected: PASS

**Step 5: Commit**

```bash
git add frontend/components/DashboardChart.js
git commit -m "feat(frontend): add pie chart visualization"
```

---

### Task 6: Data Refresh & Interaction

**Files:**
- Modify: \`frontend/App.js\`
- Create: \`frontend/components/TaskDetailModal.js\`

**Step 1: Implement Fetching Logic**

Add \`setInterval\` in \`App.js\` to fetch from backend every 60s.

**Step 2: Implement Interaction**

Add \`onPress\` handler to the Pie chart to open the \`TaskDetailModal\` with filtered task titles.

**Step 3: Commit**

```bash
git add frontend/App.js frontend/components/TaskDetailModal.js
git commit -m "feat(frontend): add data refresh and interaction details"
```

---

### Task 7: Final Integration & GitHub Push

**Step 1: Manual Verification**

Start backend and frontend, verify they communicate and update.

**Step 2: GitHub Push**

Create a new repository using \`gh repo create\` and push the code.

**Step 3: Commit**

```bash
git commit -m "docs: finalize implementation and push to github"
```
