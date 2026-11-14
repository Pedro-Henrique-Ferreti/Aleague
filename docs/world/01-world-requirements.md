# F1 — World

## Overview

A **World** is a long-running football universe that the user manages as its commissioner. It groups competitions, the rules that move teams between them (competition links), and the history of every season played.

## 1. Identity and file type

- **WLD-01** — The feature is called **World**.
- **WLD-02** — A World is a new kind of file, alongside Collection and Tournament. It is independent from Collection.
- **WLD-03** — Standalone tournament files remain exactly as they are today.

## 2. Seasons

- **WLD-04** — Each World has a season label style, chosen at creation:
  - single year — `2026`
  - split year — `2026/27`
  - numbered — `Season 1`
- **WLD-05** — The user sets the label of the first season; every new season increments it automatically.
- **WLD-06** — The label style can be changed at any time; all seasons, past and present, are relabelled consistently.

## 3. Profile

- **WLD-07** — A World has a **name**, an **icon** and a **description** (free text).
- **WLD-08** — A World shows its **current season**.
- **WLD-09** — A World shows summary stats: seasons played, number of competitions, number of teams, and the last champion of every competition.

## 4. Creating a World

- **WLD-10** — A World can be created **from scratch** or **from a template**.
- **WLD-11** — Creation happens in a **multi-step wizard** with sequential steps: a step unlocks the next one once its required fields are filled. Invalid or optional content (e.g. promotion and relegation counts that do not match) shows a warning but does not block. Previous steps can be revisited.
- **WLD-12** — Creating from a template uses the same wizard with every step pre-filled; the user can change anything, then advances to the last step and creates the World.
- **WLD-13** — Finishing creation requires at least a **name** and **one competition with teams**, and every format must be valid (CMP-19).

## 5. Drafts (pausing creation)

- **WLD-14** — A World exists from the first wizard step, with the status **"Draft"**.
- **WLD-15** — Leaving the wizard keeps the draft. The wizard offers **"Export draft"** at every step.
- **WLD-16** — Opening or importing a draft reopens the wizard on the **last step visited**.
- **WLD-17** — Drafts appear in the Home file list and in the sidebar, with a "Draft" badge and their progress (e.g. "step 3 of 5").
- **WLD-18** — Drafts can be shared and imported like any file; whoever imports one continues from where it was paused.
- **WLD-19** — A finished World never returns to "Draft"; later changes are made in the regular World screens.
- **WLD-20** — Drafts are not saved automatically; they follow the app's current behaviour for open files.

## 6. Templates

- **WLD-21** — A **template** contains: competitions and their formats, competition links, season label style, and the initial teams of each competition.
- **WLD-22** — **Presets are templates shipped with the app.** Users can also import template files (their own or from friends).
- **WLD-23** — Templates are created only by exporting a finished World (**"Export as template"**). There is no separate template editor.
- **WLD-24** — When exporting a template, the user chooses whether the initial teams are those of the **current season** or of the **first season**.
- **WLD-25** — Drafts cannot be exported as templates.

## 7. Export and import

- **WLD-26** — Exporting a World saves its **structure**, the **current season** with all its matches, and every **past season in compacted form** (END-13).
- **WLD-27** — Exporting as a template saves only the content listed in WLD-21.

## 8. Editing after creation

- **WLD-28** — Name, icon, description and season label style can be edited at any time.
- **WLD-29** — Competitions and competition links can be edited after seasons were played (within the limits defined in F2); changes apply **from the next season on**. Past seasons keep the structure they were played with.
- **WLD-30** — A World may have invalid rules (e.g. promotion and relegation counts that do not match) while being edited or played; they must be fixed before advancing to the next season (see F3).

## Open topics (to discuss later)

- Final fate of **Collection** now that World exists.
- **Data loss on browser refresh**, affecting drafts and all other files — to be its own feature.
- **Smaller and lighter World files** (technical).
- **Season calendar**: matches scheduled on days of the season; simulation follows calendar order.
