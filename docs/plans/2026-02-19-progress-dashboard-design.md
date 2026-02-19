# Project Progress Dashboard Design

**Date:** 2026-02-19
**Status:** Approved

## Overview
A cross-platform mobile application (built with Expo) that provides a visual overview of project progress within the OpenClaw workspace. It aggregates data from multiple `PROGRESS.md` files and displays them in a Pie chart.

## Architecture
The system uses a decoupled frontend-backend architecture:

1.  **Backend (Node.js/Express):**
    *   **Responsibility:** Scans the local filesystem for `PROGRESS.md` files, parses their content, and serves aggregated statistics via a JSON API.
    *   **Data Source:** `/home/lubby/.openclaw/workspace/`.
    *   **Parsing Logic:** Uses regex to detect task statuses:
        *   Completed: `- [x]`, `[已完成]`, `✅`, `100%`.
        *   In Progress: `[进行中]`, `🚧`.
        *   Pending: `- [ ]`, `[待完成]`, `⏳`, `0%`.

2.  **Frontend (Expo/React Native):**
    *   **Responsibility:** Fetches data every 60 seconds, renders a Pie chart, and displays task lists on segment interaction.
    *   **Key Libraries:** `victory-native` (charts), `axios` (API requests).

## Components

### Backend API
*   `GET /api/progress`: Returns statistics and task titles.
    ```json
    {
      "summary": { "completed": 15, "inProgress": 5, "pending": 10 },
      "tasks": {
        "completed": ["Task 1", "Task 2"],
        "inProgress": ["Task 3"],
        "pending": ["Task 4"]
      }
    }
    ```

### Frontend App
*   **Dashboard Screen:** Contains the `VictoryPie` chart and summary numbers.
*   **Detail Modal:** A scrollable list of tasks that appears when a pie slice is tapped.
*   **Auto-Refresh Logic:** `setInterval` inside a `useEffect` hook.

## Testing Strategy (TDD)
*   **Backend Tests:** Unit tests for the parser using mock Markdown strings. Integration tests for the API endpoint using `supertest`.
*   **Frontend Tests:** Component tests using `@testing-library/react-native` to ensure the chart and lists render correctly based on mock data.

## Deployment
*   **Local Execution:** Backend runs on `localhost:3000`.
*   **Expo Testing:** App connects to the local backend (using the local IP address for physical device testing).
*   **Source Control:** Hosted on GitHub in a new repository.
