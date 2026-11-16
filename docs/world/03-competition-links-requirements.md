# F3 — Competition links

## Overview

**Competition links** tell the system where teams go from one season to the next. Cup links prefill the team slots of next season's cup tournaments from this season's results; they are optional and may be partial, and the user fills any slot they don't cover. Promotion and relegation links suggest how teams move between the pyramid levels of a league; the user can replace any suggested team.

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
- **LNK-11** — **Cup links** target cup tournaments, at any of their entry stages (CMP-16). Their source can be any competition.
- **LNK-12** — **Promotion and relegation links** only exist **inside a league**.
- **LNK-13** — A **promotion link** moves the team at a position of a level to the **level directly above**. The highest level has no promotion links.
- **LNK-14** — A **relegation link** moves the team at a position of a level to the **level directly below**. The lowest level has no relegation links.
- **LNK-15** — Like cup links, promotion and relegation links produce **suggestions**: they prefill the slots of next season's levels, and the user may replace any team during season setup (F6). Teams without a promotion or relegation link are suggested to stay in their level.
- **LNK-16** — The number of relegation links from a level must equal the number of promotion links from the level below. Otherwise the World shows a warning and **cannot advance to the next season**.
- **LNK-17** — No links come into a league from another competition.
- **LNK-18** — A cup can link to **itself** (e.g. Libertadores champion → next season's Libertadores).

## 5. Partial links and manual filling (cup links)

- **LNK-19** — A cup tournament may have links for any number of its slots, including none.
- **LNK-20** — When the next season is created, linked first-stage slots are prefilled with suggested teams, and the user fills the remaining slots in season setup (SET-09, SET-10).
- **LNK-21** — Prefilled teams are suggestions: the user can replace or remove any of them (SET-09). This only affects the current season; the link is not changed and suggests a team again next season.
- **LNK-22** — Slots of later stages can be filled at any time during the season. Linked slots show their linked team. The user is asked to fill any empty slots when the stage is about to start, and the stage cannot start until every slot is filled.

## 6. Conflicts (cup links)

- **LNK-23** — A team can be placed in several **different** competitions in the same season.
- **LNK-24** — The links into a tournament follow an **order set by the user**. When two links point to the same team, the earlier one keeps it.
- **LNK-25** — Each link has a **pass-down** option, used when its team is already in the tournament:
  - **on** — the slot takes the next position of the same source table whose team is not already in the tournament;
  - **off** — the slot becomes manual.
- **LNK-26** — If pass-down reaches the end of the source table without finding a team, the slot becomes manual.

## 7. Broken links

- **LNK-27** — If a format change makes a link impossible (e.g. it reads Group H, but the cup now has 6 groups), the user is warned and **the link is deleted**. A deleted cup link leaves its slot manual and does not block advancing; a deleted promotion or relegation link is reflected in the count check of LNK-16.

