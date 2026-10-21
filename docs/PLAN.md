# Project Plan

## Scope and fixed decisions

- Build a local project-management MVP with a single Kanban board per user.
- Use Next.js for the frontend, FastAPI for the backend, `uv` for Python dependencies, and SQLite for local persistence.
- Run directly on the user's machine. Do not use Docker or require a container.
- Run AI inference only with a free model installed locally in Ollama. A backend connection to Ollama over localhost is allowed; hosted AI providers, cloud AI APIs, and API keys are out of scope.
- Keep the MVP sign-in credentials fixed to `user` / `password`; design stored data to support multiple users later.
- Preserve the existing frontend demo and its color scheme while wiring in backend capabilities.
- Run the backend directly with `python -m uv`; stop it from the terminal running the process.

## Part 1: Plan and approval

- [x] Expand this document with implementation checklists, validation, and completion criteria for each project part.
- [x] Add `frontend/AGENTS.md` describing the existing frontend and its development/test commands.
- [x] Review this plan and approve it before implementation begins.

**Validation:** Confirm all parts have actionable tasks, tests, and success criteria; confirm the plan matches the local-only, no-Docker, Ollama requirements.

**Success criteria:** The user approves this plan. Do not begin Parts 2–10 before approval.

## Part 2: Local scaffolding

- [x] Inspect the available development environment and record prerequisites for Python/`uv`, Node.js/npm, and Ollama.
- [x] Create the FastAPI backend in `backend/` and manage its Python dependencies with `uv`.
- [x] Add a minimal backend route for a health/status check.
- [x] Document direct local server startup with `python -m uv` and stopping with Ctrl+C; do not use containers or launcher scripts.
- [x] Serve a minimal local example page and expose the backend route so the initial end-to-end local setup can be verified.
- [x] Document the minimal commands needed to set up, start, and stop the application.

**Tests and validation:** Run the backend unit tests; start the backend with the documented command; request the example page and health route locally; stop it with Ctrl+C.

**Success criteria:** A developer can run the app locally without Docker, see the example page, and receive a successful health response using the documented `uv` command.

## Part 3: Serve the existing frontend

- [x] Configure Next.js to produce a static build compatible with the FastAPI static-file serving approach.
- [x] Serve the exported frontend and its assets from FastAPI at `/`, with the backend routes remaining reachable.
- [x] Preserve the existing Kanban demo, layout, and styling.
- [x] Add or update frontend unit and browser tests for the served application.

**Tests and validation:** Run the frontend lint, unit tests, production build, and Playwright tests; start the local backend and verify `/` and static assets load from it.

**Success criteria:** Opening the local application at `/` displays the existing five-column Kanban demo without requiring the Next.js development server.

## Part 4: MVP sign-in

- [x] Add a sign-in screen using the fixed MVP credentials `user` / `password`.
- [x] Keep the board hidden until sign-in succeeds.
- [x] Add a sign-out action that returns the user to the sign-in screen.
- [x] Show a clear error for invalid credentials and cover keyboard-accessible form use.

**Tests and validation:** Unit and browser tests cover signed-out access, valid and invalid credentials, keyboard submission, sign-out, and page refresh behavior.

**Success criteria:** Only a successfully signed-in user can access the board in the MVP flow; sign-out returns to the sign-in screen. The sign-in state survives page refresh in the current browser tab.

## Part 5: Database design and approval

- [ ] Propose a SQLite schema in a JSON file under `docs/`.
- [ ] Document the schema and database lifecycle in a concise document under `docs/`.
- [ ] Include users, one board per user, fixed-but-renamable columns, cards, ordering, and relationships in the proposal.
- [ ] Describe keys, constraints, and how the MVP's single hardcoded account maps to a design that can support multiple users.
- [ ] Present the proposal for user review and approval before implementing persistence.

**Tests and validation:** Validate the schema JSON syntactically and review that relationships and constraints support the specified board/card workflows.

**Success criteria:** The proposed schema can represent the MVP data and future multiple-user ownership, and the user approves it before Part 6.

## Part 6: Backend and SQLite persistence

- [ ] Initialize the SQLite database and create required tables when the database file does not exist.
- [ ] Implement backend routes to read and update the signed-in user's board and its columns/cards.
- [ ] Enforce board ownership and validate request/response data at the API boundary.
- [ ] Keep the MVP authentication behavior consistent with Part 4.
- [ ] Return explicit, useful errors for invalid requests and unavailable persistence operations.

**Tests and validation:** Add backend unit and API tests for database initialization, default data, board reads/updates, card and column changes, invalid payloads, and user/board ownership. Use a temporary test database so tests do not alter the local application database.

**Success criteria:** A new local database is initialized automatically, and API operations persist only the signed-in user's board with invalid operations reported clearly.

## Part 7: Connect frontend and backend

- [ ] Replace frontend-only board state as the source of truth with the backend API.
- [ ] Load the signed-in user's board and persist card creation, editing, deletion, movement, and column renaming.
- [ ] Provide clear loading and error states without discarding unsaved changes silently.
- [ ] Verify authentication and board access stay consistent across refreshes.

**Tests and validation:** Run frontend unit and browser tests against the local backend; verify board changes survive a page reload and that API failures are visible to the user.

**Success criteria:** The frontend displays and updates the persisted board through the backend, and supported board changes remain after reload.

## Part 8: Local Ollama connectivity

- [ ] Add backend configuration for the local Ollama address and a model name selected from installed local models, without requiring code edits to switch models.
- [ ] Call Ollama only through its local interface; do not add hosted-provider integrations, cloud AI calls, or API-key configuration.
- [ ] Add a small backend operation to send a simple prompt such as `2+2` and return the model response.
- [ ] Report Ollama unavailable or model-not-installed errors clearly.

**Tests and validation:** Unit-test request construction, response handling, configuration, and failure reporting with a mocked local Ollama service. Provide an opt-in local integration check for `2+2` that runs only when Ollama and a selected model are installed.

**Success criteria:** With Ollama running locally and a model installed, the backend obtains a correct response; no cloud service or API key is used, and the normal automated test suite does not require Ollama.

## Part 9: Structured AI board actions

- [ ] Send the current board JSON, the user's prompt, and relevant conversation history to the locally configured Ollama model.
- [ ] Define and validate a structured response containing a user-facing reply and optional board changes.
- [ ] Validate proposed board changes against the current user's board before applying them through the backend.
- [ ] Keep invalid model output or failed updates from partially changing persisted board data.

**Tests and validation:** Unit-test valid and invalid structured responses, card creation/edit/move operations, conversation context, and persistence failures. Include a local Ollama integration check for the structured response path.

**Success criteria:** The backend returns a user-facing response and applies only valid, authorized board updates; malformed output cannot corrupt or partially update the board.

## Part 10: AI chat sidebar

- [ ] Add a sidebar chat interface to the existing board UI.
- [ ] Display conversation history and clearly indicate loading and error states.
- [ ] Send chat turns to the backend's structured local-model operation.
- [ ] Refresh the board in the UI when the AI successfully changes it; leave it unchanged when no update is returned or an update fails.
- [ ] Keep the sidebar usable on supported screen sizes and keyboard accessible.

**Tests and validation:** Add component and browser tests for sending messages, displaying responses and errors, and reflecting successful AI board changes. Run the full frontend and backend suites and manually verify the end-to-end Ollama flow locally.

**Success criteria:** A user can chat with the locally hosted model from the sidebar, and valid model-generated card changes are persisted and visible on the board without a page reload.
