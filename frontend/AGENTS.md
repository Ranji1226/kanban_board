# Frontend

## Existing application

- This is a Next.js App Router application in `src/app/`. The root page renders the Kanban board.
- The interactive board is in `src/components/KanbanBoard.tsx`. It currently keeps board data in client-side React state, supports drag-and-drop between five columns, and handles column renaming and card creation/deletion.
- Kanban cards and columns are implemented in the other components under `src/components/`.
- Board/card types, demo data, ID generation, and card movement logic are in `src/lib/kanban.ts`.
- Styling is in `src/app/globals.css` and the components' Tailwind classes. Keep the existing visual design and color palette when extending the app.
- The root page gates the board behind an MVP sign-in screen. The hardcoded `user` / `password` check and `sessionStorage` session are client-side only; backend authentication and persistent storage are not yet connected.
- `npm run build` creates a static export in `out/`; FastAPI serves this export at `/`.

## Development and checks

- `npm run dev` starts the Next.js development server.
- `npm run lint` runs ESLint.
- `npm run test:unit` runs Vitest unit/component tests.
- `npm run test:e2e` runs Playwright browser tests.
- `npm run build` creates a production build.
- `npm run test:e2e` builds the static export, starts FastAPI, and runs Playwright tests against the app served at `/`.

Unit tests are located alongside source files; browser tests are under `tests/`. Keep frontend behavior testable and preserve the existing Kanban interactions when integrating backend features.
