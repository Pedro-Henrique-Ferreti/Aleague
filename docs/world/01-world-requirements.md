# F1 — World

## Overview

A **World** is a long-running football universe that the user manages as its commissioner. It groups competitions, the rules that move teams between them (competition links), and the history of every season played.

## 1. Identity and file type

- **WLD-01** — The feature is called **World**.
- **WLD-02** — A World is a new kind of file, alongside Collection and Tournament. It is independent from Collection.
- **WLD-03** — Standalone tournament files remain exactly as they are today, except for the champion stage (CMP-20).

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
- **WLD-11** — Creation happens in a **multi-step wizard** with sequential steps: a step unlocks the next one once its required fields are filled. Optional content (e.g. cup slots left to be filled by hand) shows a warning but does not block; invalid content (e.g. an invalid format) is flagged and blocks only creation (WLD-13), not moving to the next step. Previous steps can be revisited.
- **WLD-12** — Creating from a template uses the same wizard with every step pre-filled; the user can change anything, then advances to the last step and creates the World.
- **WLD-13** — Finishing creation requires at least a **name** and **one competition**, every format must be valid (CMP-19), and promotion and relegation links must be balanced (LNK-16).

## 5. Drafts (pausing creation)

- **WLD-14** — A World exists from the first wizard step, with the status **"Draft"**.
- **WLD-15** — Leaving the wizard keeps the draft. The wizard offers **"Export draft"** at every step.
- **WLD-16** — Opening or importing a draft reopens the wizard on the **last step visited**.
- **WLD-17** — Drafts appear in the Home file list and in the sidebar, with a "Draft" badge and their progress (e.g. "step 3 of 5").
- **WLD-18** — Drafts can be shared and imported like any file; whoever imports one continues from where it was paused.
- **WLD-19** — A created World never returns to "Draft"; later changes are made in the regular World screens.
- **WLD-20** — Drafts are not saved automatically; they follow the app's current behaviour for open files.

## 6. Templates

- **WLD-21** — A **template** contains: competitions and their formats, competition links, season label style, and the initial teams of each competition **at every entry stage**, which prefill the first season (SET-05).
- **WLD-22** — **Presets are templates shipped with the app.** Users can also import template files (their own or from friends).
- **WLD-23** — Templates are created only by exporting a created World (**"Export as template"**). There is no separate template editor.
- **WLD-24** — When exporting a template, the user chooses whether the initial teams are those of the **current season** or of the **first season**. A season's teams can only be exported once that season is **In play** or **Finished**: "current season" is unavailable while the current season is in Setup, and a World whose first season is still in Setup cannot be exported as a template.
- **WLD-25** — Drafts cannot be exported as templates.

## 7. Export and import

- **WLD-26** — Exporting a World saves its **structure**, the **current season** with all its matches, and every **past season in compacted form** (END-13).
- **WLD-27** — Exporting as a template saves only the content listed in WLD-21.

## 8. Editing after creation

- **WLD-28** — Name, icon, description and season label style can be edited at any time.
- **WLD-29** — After the World is created, formats and competition links can only be edited from the **next-season preview**, once the season is Finished (ADV-09), using the same editors as the creation wizard, within the limits defined in F2. Changes apply **from the next season on**. Past seasons keep the structure they were played with.
- **WLD-30** — Formats and links may be invalid (e.g. invalid formats, or promotion and relegation counts that do not match) **while they are being edited**, in the creation wizard or in the next-season preview. The World cannot be created, and cannot advance to the next season, until they are fixed (WLD-13, ADV-08).

