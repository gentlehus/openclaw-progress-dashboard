# Integrated Progress Dashboard Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Integrate the backend logic into the Expo project as an API route, creating a single-project architecture.

**Architecture:** Single Expo project using Expo Router API Routes. Server-side logic for file parsing will reside in `app/api/progress+api.js`.

**Tech Stack:** Expo, React Native, Expo Router, Node.js (server-side), Victory Native.

---

### Task 1: Migrate Parser Utility

**Files:**
- Create: `frontend/utils/parser.js` (copy from backend)
- Test: `frontend/utils/parser.test.js`

**Step 1: Write the failing test**
Copy the backend parser tests to the frontend.

**Step 2: Run test to verify it fails**
Run: `cd frontend && npm test utils/parser.test.js`
Expected: FAIL (file missing)

**Step 3: Implement minimal code**
Copy `backend/utils/parser.js` to `frontend/utils/parser.js`.

**Step 4: Run test to verify it passes**
Run: `cd frontend && npm test utils/parser.test.js`
Expected: PASS

**Step 5: Commit**
```bash
git add frontend/utils/
git commit -m "feat: migrate parser utility to frontend"
```

---

### Task 2: Implement Integrated API Route

**Files:**
- Create: `frontend/app/api/progress+api.js`
- Modify: `frontend/package.json` (ensure `glob` is installed)

**Step 1: Write the failing test**
Verify that the `/api/progress` endpoint is reachable and returns the correct structure (using a mock file system in the test if possible, or an integration test).

**Step 2: Run test to verify it fails**
Run: `npm test`
Expected: FAIL

**Step 3: Implement Integrated API Route**
In `frontend/app/api/progress+api.js`:
```javascript
import { ExpoResponse } from 'expo-router/server';
import { glob } from 'glob';
import fs from 'fs/promises';
import { parseMarkdown } from '../../utils/parser';

export async function GET(request) {
  const workspacePath = process.env.WORKSPACE_PATH || '/home/lubby/.openclaw/workspace';
  // ... aggregation logic from backend/index.js ...
  return ExpoResponse.json(aggregatedData);
}
```

**Step 4: Run test to verify it passes**
Run: `npm test`
Expected: PASS

**Step 5: Commit**
```bash
git add frontend/app/api/
git commit -m "feat: implement integrated api route"
```

---

### Task 3: Update Frontend to use Relative API Path

**Files:**
- Modify: `frontend/App.js`

**Step 1: Change API URL**
Change `const API_BASE_URL = 'http://localhost:3000/api';` to `const API_BASE_URL = '/api';` (or just remove it and use relative paths).

**Step 2: Verify in Browser**
Run: `cd frontend && npx expo start --web`
Check if the dashboard still loads data.

**Step 3: Commit**
```bash
git add frontend/App.js
git commit -m "feat: update frontend to use relative api path"
```

---

### Task 4: Cleanup Legacy Backend

**Files:**
- Delete: `backend/`

**Step 1: Delete directory**
Run: `rm -rf backend/`

**Step 2: Commit**
```bash
git add .
git commit -m "chore: remove legacy backend directory"
```
