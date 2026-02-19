# Integrated Project Progress Dashboard Design

**Date:** 2026-02-20
**Status:** Approved

## Overview
A unified Expo application that serves both the frontend UI and the server-side logic for project progress tracking. By leveraging Expo API Routes, the application becomes a single-project deployment while maintaining the ability to read local host files for progress updates.

## Architecture
The application is a single Expo project that utilizes **Expo Router API Routes** to handle server-side operations.

### 1. Server-Side (Expo API Routes)
- **Path:** `app/api/progress+api.js`
- **Responsibility:**
    *   Runs on the Node.js development server during local development.
    *   Uses `glob` and `fs` to scan `/home/lubby/.openclaw/workspace/` for `PROGRESS.md` files.
    *   Parses and aggregates data using shared utilities.
- **Benefits:** No separate backend process required; single command (`npx expo start`) to run the whole system.

### 2. Client-Side (React Native / Expo Web)
- **Responsibility:**
    *   Fetches progress data from the internal `/api/progress` route.
    *   Renders the Pie chart and interactive task lists.
- **Refresh Logic:** Uses `setInterval` to fetch fresh data every 60 seconds.

### 3. Shared Utilities
- **Path:** `utils/parser.js`
- **Responsibility:** Regex-based parsing of Markdown content to extract task statuses.

## Components

### API Route (`GET /api/progress`)
- **Return Type:** JSON
- **Response Structure:**
    ```json
    {
      "summary": { "completed": 10, "inProgress": 5, "pending": 2 },
      "tasks": {
        "completed": ["Task A", "Task B"],
        "inProgress": ["Task C"],
        "pending": ["Task D"]
      }
    }
    ```

### Frontend UI
- **Dashboard:** Interactive `VictoryPie` chart.
- **Detail View:** Modal listing task titles for the selected status.

## Testing Strategy
- **Integrated Jest:** Tests for both the parser utility and the UI components reside in the same project.
- **API Mocks:** Frontend tests will mock the API response to verify UI behavior.

## Implementation Steps
1.  Move `parser.js` and `glob` logic into the `frontend` directory.
2.  Set up Expo Router API routes.
3.  Update `App.js` to fetch from the local API route.
4.  Remove the legacy `backend` directory.
