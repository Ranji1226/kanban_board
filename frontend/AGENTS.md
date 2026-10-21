# Frontend

## Existing application

- This is a Next.js App Router application in `src/app/`. The root page renders the Kanban board.
- The interactive board is in `src/components/KanbanBoard.tsx`. It currently keeps board data in client-side React state, supports drag-and-drop between five columns, and handles column renaming and card creation/deletion.
- Kanban cards and columns are implemented in the other components under `src/components/`.
- Board/card types, demo data, ID generation, and card movement logic are in `src/lib/kanban.ts`.
- Styling is in `src/app/globals.css` and the components' Tailwind classes. Keep the existing visual design and color palette when extending the app.
- This frontend is currently a standalone demo; it does not yet connect to authentication, a backend, or persistent storage.

## Development and checks

- `npm run dev` starts the Next.js development server.
- `npm run lint` runs ESLint.
- `npm run test:unit` runs Vitest unit/component tests.
- `npm run test:e2e` runs Playwright browser tests.
- `npm run build` creates a production build.

Unit tests are located alongside source files; browser tests are under `tests/`. Keep frontend behavior testable and preserve the existing Kanban interactions when integrating backend features.
