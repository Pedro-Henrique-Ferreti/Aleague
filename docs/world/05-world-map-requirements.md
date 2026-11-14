# F5 — World map

## Overview

The **World map** is a read-only visual diagram that shows every competition of a World and the competition links between them. It is the centrepiece of the last step of the creation wizard, where the user reviews the World before creating it, and it remains available on the finished World.

## 1. Purpose and availability

- **MAP-01** — The **World map** is a read-only visual diagram of a World's competitions and the competition links between them.
- **MAP-02** — The map is part of the **last step of the creation wizard, "Review and confirm"**.
- **MAP-03** — The map is also available on a finished World. It shows the **current structure**, meaning the rules that will apply when the next season is created.

## 2. Contents

- **MAP-04** — Each **pyramid level** and each **cup** is a box. A league's levels are stacked, level 1 on top, inside a frame for that league.
- **MAP-05** — Each box shows the name, icon, scope, number of teams, format and, for periodic cups, the frequency (e.g. "every 4 seasons from 2026").
- **MAP-06** — A cup's entry stages appear as separate entry points on its box, so arrows arrive at the stage they fill.
- **MAP-07** — Cup links are drawn as arrows. Links that share a source stage, a target and a colour (F4) become **one arrow**, drawn in that colour.
- **MAP-08** — An arrow's label lists the positions it carries (e.g. "1st–4th", or "1st, 2nd, 5th" when they are not consecutive).
- **MAP-09** — Promotion and relegation are drawn as **up and down arrows between adjacent levels**, with their counts (e.g. "↑ 4 ↓ 4").
- **MAP-10** — Relegation from the lowest level points to an **"Out of the World"** box.
- **MAP-11** — Counts that don't match (LNK-18) are highlighted on the map.
- **MAP-12** — A cup that links to itself shows a looping arrow on its own box.
- **MAP-13** — Periodic cups have no arrows (LNK-20), so they appear as separate boxes.
- **MAP-14** — The map shows the **structure only**; teams are not listed in the boxes.
- **MAP-15** — The map always shows **every competition**. Competitions cannot be hidden.

## 3. Interaction

- **MAP-16** — The map is arranged **automatically**. The user can only pan and zoom; clicking or dragging boxes and arrows does nothing.

## 4. Review and confirm step

- **MAP-17** — Besides the map, the review step shows:
  - a profile summary: name, icon, description and season label style;
  - totals: competitions and teams;
  - a **list of warnings**, e.g. promotion/relegation counts that don't match, or cup slots that will need filling by hand;
  - the **Create World** button.
- **MAP-18** — Warnings do not block creation (WLD-11); only the requirements of WLD-13 must be met.
