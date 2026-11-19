# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Aleague is a client-only Nuxt 4 app for building and simulating football tournaments (group stages, playoffs, draws, standings, match simulation). It is deployed as a static site to GitHub Pages (`nuxt generate --preset github_pages`); `server/` is empty. UI text is in Portuguese (pt-BR); code, comments, commits and docs are in English.

## Commands

```bash
npm run dev            # dev server on http://localhost:8080
npm run typecheck      # nuxt typecheck (vue-tsc); also run in CI before deploy
npm run lint           # eslint (lint:fix to autofix)
npm run test:unit      # vitest project "unit"  -> test/unit, node env
npm run test:nuxt      # vitest project "nuxt"  -> test/nuxt, Nuxt env + happy-dom
npx vitest run test/nuxt/tournament/tournament.test.ts           # single file
npx vitest run test/nuxt/tournament/tournament.test.ts -t "getTournamentWinner"  # single test
```

Coverage is enabled by default in `vitest.config.ts`. During typecheck, a `vue-router/volar/sfc-route-blocks ... ERR_PACKAGE_PATH_NOT_EXPORTED` stack trace is printed; it is a harmless dependency warning, not a type error.

The dev machine is Windows; Python is not installed.

## Architecture

### Data model: files, collections, tournaments

- A `SourceFile` (`app/features/files/types/fileTypes.ts`) is either a `TournamentFile` (`data: Tournament`) or a `CollectionFile` (`data: Collection`, which holds `tournaments: Record<id, Tournament>`). Use `isTournamentFile` / `isCollectionFile` from `app/features/files/helpers/file.ts` to narrow.
- Tournaments inside a collection are plain `Tournament` objects, **not** files. Don't pass them to file-oriented components like `FileCard`; use tournament-oriented ones (e.g. `TournamentPreviewCard`).
- A `Tournament` has ordered `stages: TournamentStage[]`, each either a `GroupStage` (groups, standings, matchweeks, legends) or a `PlayoffStage` (rounds), discriminated by `StageType`. The tournament winner is derived from the last stage (`getTournamentWinner`).
- There is no backend or browser persistence. Files live in memory in `useFileStore` and are imported/exported as gzip-compressed JSON (`app/features/files/helpers/file-compression.ts`). `updatedAt` is set on export by diffing against a snapshot taken on import/export.

### Routing and "active" state

Routes are defined manually in `app/router.options.ts` (not file-based): `welcome`, `home`, `editor` (`/editor/:fileId/:tournamentId?`), `analytics`. Middleware redirects to `welcome` when no files are imported and validates the `fileId`/`tournamentId` params.

Stores derive the "active" entity from the route, forming a chain:
`useFileStore.activeFile` (from `fileId`) → `useCollectionStore.activeCollection` / `useTournamentStore.activeTournament` (the tournament file itself, or the collection tournament from `tournamentId`) → `useStageStore.activeStage` (selected via `useStageSelectorStore`). These are writable computeds that write back into the file in `useFileStore`, so mutating active state mutates the file. `Editor.vue` renders `TournamentPage` or `CollectionPage` based on which is active.

To link to a tournament inside a collection: `{ name: 'editor', params: { fileId: collectionId, tournamentId } }`. A standalone tournament file uses only `fileId`.

### Code organization: features

Code is grouped by feature in `app/features/<feature>/`, each with only the folders it needs: `components/`, `composables/`, `constants/`, `helpers/`, `stores/`, `types/`.

- `teams` — team catalog (`constants/teams/*` lists per country, built with `defineTeams`), team components, `Country`-typed team data.
- `tournament` — the tournament engine and editor: stages, matchweeks, standings, playoffs, draws. Components are in subfolders (`stage/`, `matchweek/`, `standings/`, `playoff/`, `draw/`) only for organization.
- `collection` — collection page, forms and store.
- `files` — `SourceFile` types, import/export, the file store, `FileCard` and file-related modals.

Shared code stays outside features:
- `app/components/base/` — generic UI kit (`App*`, `Base*`, `CloseButton`, `LoadingIndicator`…), free of feature imports.
- `app/components/layout/` — app shell: `TheSidebar*`, `EditorToolbar*`, `AuthModal*`, `Welcome*`.
- `app/types/` (`UUID`, `Branded`, `Country`, select/regle types), `app/utils/`, `app/pages/`, `app/layouts/`, `app/middleware/`, `app/plugins/`.
- `app/middleware/` and `app/router.options.ts` must stay where they are: Nuxt resolves named middleware only from that folder.

Dependency direction: `teams` ← `tournament` ← `collection` ← `files` ← pages/layout. Some stores and components still break it (e.g. the tournament and collection stores read `useFileStore`); do not add new violations.

- `helpers/*.ts` — pure domain logic (creating stages, scheduling, simulation, standings, draws, seeding). Explicitly imported (`~/features/tournament/helpers/...`), not auto-imported.
- `stores/*.ts` — Pinia setup stores that hold UI/active state and call helpers.
- Prefer components that receive data via props over reading store "active" state, so they can be reused (e.g. `TournamentWinnerBadge` takes a `winner` prop).

### Tests

Tests live outside `app/`, in `test/`:
- `test/nuxt/<feature>/*.test.ts` — run in the Nuxt environment (needed because helpers use auto-imported types and enums). They mirror helpers one-to-one (`tournament/helpers/match-score.ts` → `test/nuxt/tournament/match-score.test.ts`).
- `test/unit/` — plain Node tests, currently only `utils` (`utils.test.ts`, `array.test.ts`, `date.test.ts`).
- `test/mocks/<feature>.ts` — shared builders (`mockTournament`, `mockCollectionFile`…). A feature's mocks may use other features' mocks, never the reverse.

### Auto-imports

`app/types`, `app/utils` and each feature's `types/`, `constants/`, `stores/` and `composables/` are auto-imported (`nuxt.config.ts` → `imports.dirs`), so types, enums like `StageType`/`SourceFileType`/`Country`, utils like `clone`, `uuidv4`, `formatDate`, `matchesSearch`, and stores need no import. Helpers are **not** auto-imported. Components in `app/components` and `app/features/*/components` are registered globally **without path prefix** (`<StandingsTable>` regardless of subfolder), so component names must be unique across features. Subfolders of a feature's `constants/` (e.g. `teams/`) are not scanned and are imported explicitly.

SVGs in `app/assets/icons` import as Vue components (`nuxt-svgo`); `@tabler/icons-vue` is also used. Forms are validated with Regle (`app/regle-config.ts`).

### Styling

Tailwind v4 + daisyUI (emerald theme), configured in `app/assets/css/main.css`. Note the non-default theme:
- `--spacing: 1rem`, so `p-1` = 1rem, `size-2` = 2rem; fractional steps like `0.25`, `0.75`, `1.25` exist.
- Custom breakpoints only: `sm`, `tablet`, `tablet-md`, `tablet-lg`, `tablet-xl`, `desktop`, `desktop-xl`.

## Code style

ESLint is `@antfu/eslint-config` plus overrides (`eslint.config.mjs`): semicolons, 1tbs braces, top-level `import type`, Vue SFC block order template → script → style, **one attribute per line** in templates, and a strict attribute order (`v-for`, `v-if`, …, `:prop`, `@event`). Run `npm run lint:fix` after editing templates.

Commits follow Conventional Commits with a scope, e.g. `feat(tournament): ...`, `refactor(components): ...`, `docs(world): ...`.

## Docs

`docs/world/NN-*-requirements.md` hold product requirements for the upcoming "world / multi-season" feature set; unresolved items go to `docs/world/open-topics-and-future-ideas.md`. `docs/rules/season.txt` contains reference competition formats (Portuguese).
