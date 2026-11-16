# F4 — Automatic legends

## Overview

Inside a World, the legends of every tournament stage are **inferred from competition links**. Each link has a colour, and the positions it reads are shown in that colour, so the standings always tell where each position leads next season. Legends cannot be edited by hand inside a World.

## 1. Link colour

- **LEG-01** — Every competition link has a **colour**, chosen from a fixed palette. This applies to cup links and to promotion and relegation links.
- **LEG-02** — A new link starts with the colour already used by links to the **same target**. If it is the first link to that target, it gets the next unused colour of the palette. The user can change it.
- **LEG-03** — **Different targets cannot share a colour** within the same stage's legend.

## 2. Legends come from links

- **LEG-04** — In a World, a tournament stage's legends come **only from the competition links that read from that stage**. Legends cannot be added, removed or recoloured manually.
- **LEG-05** — Each position of a stage's table shows the colour of the link that reads it. A position with no link has no colour.
- **LEG-06** — Links that share a colour and a target appear as **one legend entry** (e.g. positions 1–4 → "Libertadores, group stage").

## 3. Legend labels

- **LEG-07** — A legend entry's label is generated from its target (e.g. "Libertadores, group stage", "Promotion to Série A", "Relegation to Série B"). The user can rename it.

## 4. Positions with several links

- **LEG-08** — When a position is the source of several links, the row shows the colour of one **main link** and indicates that it has more than one destination. The legend lists every destination.
- **LEG-09** — The user chooses which link is the main one. By default, it is the first link created from that position.

## 5. Behaviour over time

- **LEG-10** — Legends describe **positions**, not teams: pass-down (LNK-25) does not move colours.
- **LEG-11** — When links change, the legends of the current season's tournaments update immediately. Past seasons keep the legends they were played with.
- **LEG-12** — Standalone tournament files keep manual legends as they work today.

## 6. Playoff tables

- **LEG-13** — Everywhere in a World (current season and History), a playoff stage's table shows, in each row, **the round where the team was eliminated** instead of a position number: Champion, Runner-up, Semi-finals, Quarter-finals, Round of 16, and so on. This applies to every playoff stage, in cups and in pyramid levels (e.g. a promotion playoff).
- **LEG-14** — The two semi-final rows carry a badge: **"lost to champion"** (always the 3rd row) and **"lost to runner-up"** (the 4th row). Rows follow the playoff order defined in LNK-08.
