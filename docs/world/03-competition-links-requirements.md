# F3 — Competition links

## Overview

**Competition links** tell the system where teams go from one season to the next. Cup links prefill the team slots of next season's cup tournaments from this season's results; they are optional and may be partial, and the user fills any slot they don't cover. Promotion and relegation links move teams between the pyramid levels of a league and are always applied.

## 1. Concepts

- **LNK-01** — A **slot** is a place for one team in a tournament stage.
- **LNK-02** — A **competition link** connects **one position** of a source stage to **one slot** of a target tournament (e.g. "Série A, 1st place → Libertadores, group stage").
- **LNK-03** — Links are used when the next season's tournaments are created.
- **LNK-04** — Moving several teams requires one link per position (e.g. "the top 4 of Série A go to the Libertadores" is four links).

## 2. Setup order

- **LNK-05** — Competition links (including promotion and relegation links) can only be set up **after the formats of all tournaments are defined**. In the creation wizard, the formats step comes before the links step.

## 3. Sources

- **LNK-06** — A link's source is a **stage of a tournament** and a **position in that stage's table**. Any stage can be a source, not only the last one.
- **LNK-07** — In a group stage, each group has its own table; a source is a group and a position (e.g. "Group B, 2nd").
- **LNK-08** — A playoff stage has a table covering **every round**: 1 = winner of the final, 2 = runner-up, 3–4 = semi-final losers, 5–8 = quarter-final losers, and so on. Teams eliminated in the same round are ordered **randomly**.
- **LNK-09** — Links read **only the previous season's** results.

## 4. Kinds of links and targets

- **LNK-10** — There are two kinds of links: **cup links** and **promotion/relegation links**.
- **LNK-11** — **Cup links** target cup tournaments, at any of their entry stages (CMP-17). Their source can be any competition.
- **LNK-12** — **Promotion and relegation links** only exist **inside a league**.
- **LNK-13** — A **promotion link** moves the team at a position of a level to the **level directly above**. The highest level has no promotion links.
- **LNK-14** — A **relegation link** moves the team at a position of a level to the **level directly below**.
- **LNK-15** — At the **lowest level**, relegation links point **"Out of the World"**. Before the next season is created, the user is asked to replace those teams, but is not required to. A team that already plays in that league cannot be picked as a replacement.
- **LNK-16** — If fewer replacements are picked than teams relegated out of the World, the user chooses which of those teams actually go down; the others stay.
- **LNK-17** — Promotion and relegation links are **always applied** (they are not suggestions). Teams without a promotion or relegation link stay in their level.
- **LNK-18** — The number of relegation links from a level must equal the number of promotion links from the level below. Otherwise the World shows a warning and **cannot advance to the next season**.
- **LNK-19** — No links come into a league from another competition.
- **LNK-20** — **Periodic** cups cannot be the source or the target of links.
- **LNK-21** — A cup can link to **itself** (e.g. Libertadores champion → next season's Libertadores).

## 5. Partial links and manual filling (cup links)

- **LNK-22** — A cup tournament may have links for any number of its slots, including none.
- **LNK-23** — When the next season's tournaments are created, linked slots are prefilled; the user fills the remaining slots with any team not already in that tournament. Every slot of the **first stage** must be filled.
- **LNK-24** — Prefilled teams are suggestions: the user can replace or remove any of them, and the slot becomes manual for that season.
- **LNK-25** — Slots of later stages can be filled at any time during the season. Linked slots show their linked team. The user is asked to fill any empty slots when the stage is about to start, and the stage cannot start until every slot is filled.

## 6. Conflicts (cup links)

- **LNK-26** — A team can be placed in several **different** competitions in the same season.
- **LNK-27** — The links into a tournament follow an **order set by the user**. When two links point to the same team, the earlier one keeps it.
- **LNK-28** — Each link has a **pass-down** option, used when its team is already in the tournament:
  - **on** — the slot takes the next position of the same source table whose team is not already in the tournament;
  - **off** — the slot becomes manual.
- **LNK-29** — If pass-down reaches the end of the source table without finding a team, the slot becomes manual.

## 7. Broken links

- **LNK-30** — If a format change makes a link impossible (e.g. it reads 20th place, but the league now has 18 teams), the user is warned and **the link is deleted**. A deleted cup link leaves its slot manual and does not block advancing; a deleted promotion or relegation link is reflected in the count check of LNK-18.

## Open topics (to discuss later)

- **Same-season qualification** (e.g. Pré-Libertadores winners → Libertadores of the same season) — related to the season calendar.
- **Combined tables across groups** as sources (e.g. "best 3rd-placed teams").
- **Mutually exclusive competitions** (e.g. a team cannot play both the Libertadores and the Sudamericana).
- **Links from other competitions into leagues** (e.g. state championships sending teams to the lowest national level).
