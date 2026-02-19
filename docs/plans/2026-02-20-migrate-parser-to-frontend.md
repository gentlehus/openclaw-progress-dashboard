# Parser Migration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrate the markdown parser utility and its tests from the backend to the frontend to enable client-side progress parsing.

**Architecture:** The parser is a pure utility function. It will be moved to `frontend/utils/` to be shared across frontend components. CommonJS syntax will be preserved for compatibility with the existing test structure and environment requirements.

**Tech Stack:** JavaScript (CommonJS), Jest, React Native (Expo).

---

### Task 1: Migrate Parser Utility and Tests

**Files:**
- Create: `frontend/utils/parser.js`
- Create: `frontend/utils/parser.test.js`

**Step 1: Create frontend/utils directory**
Run: `mkdir -p /home/lubby/repo/openclaw-dashboard/.worktrees/integrated-architecture/frontend/utils`

**Step 2: Copy parser logic**
Run: `cp /home/lubby/repo/openclaw-dashboard/.worktrees/integrated-architecture/backend/utils/parser.js /home/lubby/repo/openclaw-dashboard/.worktrees/integrated-architecture/frontend/utils/parser.js`

**Step 3: Copy parser tests**
Run: `cp /home/lubby/repo/openclaw-dashboard/.worktrees/integrated-architecture/backend/tests/parser.test.js /home/lubby/repo/openclaw-dashboard/.worktrees/integrated-architecture/frontend/utils/parser.test.js`

**Step 4: Update test imports**
Modify: `frontend/utils/parser.test.js:1`
Change `require('../utils/parser')` to `require('./parser')`.

**Step 5: Verify tests pass in frontend**
Run: `npm test utils/parser.test.js` in `/home/lubby/repo/openclaw-dashboard/.worktrees/integrated-architecture/frontend`
Expected: PASS

**Step 6: Commit**
```bash
git add frontend/utils/parser.js frontend/utils/parser.test.js
git commit -m "feat: migrate parser utility and tests to frontend"
```
