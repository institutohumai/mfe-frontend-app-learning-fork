# GitHub Copilot Instructions for frontend-app-learning

This is the Open edX Learning Micro-Frontend (MFE), responsible for learner-facing course experiences (outline, courseware, progress).

## Architecture & Core Concepts

- **Framework**: React 18 with Redux Toolkit. Built on `@edx/frontend-platform`.
- **Entry Point**: `src/index.jsx` initializes the app using `initialize()` and renders `AppProvider`.
- **Routing**: `react-router-dom` v6.
  - Routes are defined in `src/index.jsx`.
  - **`DecodePageRoute`**: Wraps most routes to recursively decode URL parameters and ensure correct routing before rendering.
  - **`PageWrap`**: Wraps page content (often via `DecodePageRoute`) to provide standard page structure.
- **State Management**: Redux Toolkit (`src/store.ts`).
  - **Slices**: `courseware`, `courseHome`, `models` (generic data), `plugins`.
  - **Thunks**: Used for async data fetching (e.g., `src/course-home/data/thunks.js`).
- **Data Fetching**:
  - **`TabContainer`**: Higher-order component pattern used in `src/index.jsx` to handle data fetching for course tabs (`fetchOutlineTab`, `fetchProgressTab`, etc.).
  - **`model-store`**: Generic Redux slice for caching and managing model data (`src/generic/model-store`).

## Development Workflows

- **Start Dev Server**: `npm run dev` (uses `fedx-scripts webpack-dev-server`).
  - Runs on port 2000 by default (`http://localhost:2000/learning/`).
- **Testing**: `npm test` (Jest + React Testing Library).
  - Configuration: `jest.config.js`, `setupTest.js`.
  - Run in watch mode: `npm run test:watch`.
- **Linting**: `npm run lint` (ESLint).

## Project Conventions

- **Styling**:
  - Use **Paragon** (`@openedx/paragon`) components whenever possible.
  - SCSS files are used for custom styling (`index.scss`, component-specific `.scss`).
  - Follow BEM naming conventions where applicable.
- **Plugins**:
  - The app is extensible via the **Frontend Plugin Framework**.
  - **Slots**: Defined in `src/plugin-slots`. Use these to inject content or modify behavior.
  - **Plugin Store**: `src/generic/plugin-store` manages plugin state.
- **Internationalization (i18n)**:
  - Use `src/i18n/index.js` for messages.
  - `UserMessagesProvider` handles displaying user-facing alerts/messages.
- **Configuration**:
  - Environment variables are merged into the app config in `src/index.jsx` via `mergeConfig`.
  - Access config using `getConfig()` from `@edx/frontend-platform`.

## Key Directories

- `src/course-home/`: Components and logic for the course home page (Outline, Dates, Progress).
- `src/courseware/`: Components for the learning sequence and unit display.
- `src/generic/`: Shared utilities, hooks, and generic components.
- `src/plugin-slots/`: Definitions for plugin extension points.
- `src/store.ts`: Redux store configuration.

## Common Patterns

- **Course Tab Loading**:
  ```jsx
  <TabContainer tab="outline" fetch={fetchOutlineTab} slice="courseHome">
    <OutlineTab />
  </TabContainer>
  ```
- **Accessing Context**:
  Use `useContextId` hook (`src/data/hooks.ts`) to get the current course ID.
