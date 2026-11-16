# F5 — World map

## Overview

The **World map** is a read-only visual diagram that shows every competition of a World and the competition links between them. It is the centrepiece of the last step of the creation wizard, where the user reviews the World before creating it, and it remains available on the created World.

## 1. Purpose and availability

- **MAP-01** — The **World map** is a read-only visual diagram of a World's competitions and the competition links between them.
- **MAP-02** — The map is part of the **last step of the creation wizard, "Review and confirm"**.
- **MAP-03** — The map is also available on a created World. It shows the **current season's** formats and links, meaning the links that will seed the next season (LNK-03).

## 2. Contents

- **MAP-04** — Each **pyramid level** and each **cup** is a box. A league's levels are stacked, level 1 on top, inside a frame for that league.
- **MAP-05** — Each box shows the name, icon, scope, number of teams and format.
- **MAP-06** — A cup's entry stages appear as separate entry points on its box, so arrows arrive at the stage they fill.
- **MAP-07** — Cup links are drawn as arrows. Links that share a source stage, a target and a colour (F4) become **one arrow**, drawn in that colour.
- **MAP-08** — An arrow's label lists the positions it carries (e.g. "1st–4th", or "1st, 2nd, 5th" when they are not consecutive).
- **MAP-09** — Promotion and relegation are drawn as **up and down arrows between adjacent levels**, with their counts (e.g. "↑ 4 ↓ 4").
- **MAP-10** — Counts that don't match (LNK-16) are highlighted on the map.
- **MAP-11** — A cup that links to itself shows a looping arrow on its own box.
- **MAP-12** — The map shows the **structure only**; teams are not listed in the boxes.
- **MAP-13** — The map always shows **every competition**. Competitions cannot be hidden.

## 3. Interaction

- **MAP-14** — The map is arranged **automatically**. The user can only pan and zoom; clicking or dragging boxes and arrows does nothing.

## 4. Review and confirm step

- **MAP-15** — Besides the map, the review step shows:
  - a profile summary: name, icon, description and season label style;
  - totals: competitions and pyramid levels;
  - a **list of blocking issues**: invalid formats (CMP-19) and promotion/relegation counts that don't match (LNK-16);
  - a **list of warnings**, e.g. cup slots that will need filling by hand;
  - the **Create World** button.
- **MAP-16** — Warnings do not block creation (WLD-11); blocking issues do, until they are fixed (WLD-13).
