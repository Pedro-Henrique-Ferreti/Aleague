# F2 — Competitions

## Overview

A World is made of **competitions**. In every season, each competition produces its tournament(s) for that season. There are two competition types; they differ in how teams carry over from one season to the next, not in their format.

## 1. Competition types

- **CMP-01** — There are two competition types: **League** and **Cup**.
- **CMP-02** — A **league** is a pyramid made of one or more **pyramid levels**, numbered from 1 at the top (e.g. Campeonato Brasileiro: Série A = level 1 … Série D = level 4). Each season, every pyramid level produces one tournament.
- **CMP-03** — A league keeps its teams from one season to the next; teams only move between its levels through promotion and relegation.
- **CMP-04** — A team plays in at most **one pyramid level of each league**. It may play in several leagues in the same season (e.g. Campeonato Brasileiro and Campeonato Paulista).
- **CMP-05** — A league with a single pyramid level is allowed (a closed league).
- **CMP-06** — A **cup** produces one tournament per season. Its teams are defined again every season: prefilled by competition links and completed by the user (F3).

## 2. Identity

- **CMP-07** — A competition has a **name**, a **short name**, an **icon** and a **scope**: domestic, regional, continental or worldwide.
- **CMP-08** — The scope is **informational only**: it does not restrict which teams can take part, nor does it change how the competition works. Any team can be added to any competition (e.g. Barcelona in a domestic competition of Brazilian clubs).
- **CMP-09** — Each pyramid level of a league has its own **name**, **short name** and **icon**.
- **CMP-10** — Each season's tournament is named automatically from its level/cup name and the season label (e.g. "Série A 2027"). The user can rename a specific season's tournament.

## 3. Participants

- **CMP-11** — A competition is either for **clubs** or for **national teams**. This is chosen when the competition is created and cannot be changed.
- **CMP-12** — A World can mix club competitions and national team competitions.
- **CMP-13** — Both leagues and cups can be used for national teams.

## 4. Frequency

- **CMP-14** — Leagues are played every season.
- **CMP-15** — A cup can be **periodic**: played every N seasons, starting from a chosen season (e.g. every 4 seasons from 2026). In the other seasons it has no tournament.

## 5. Format and entry

- **CMP-16** — Each pyramid level and each cup has a **format** (its stages), followed by every season's tournament.
- **CMP-17** — A cup can receive teams at **any of its stages**; each entry stage defines how many teams enter there. The remaining places of later stages are filled by the teams advancing from the previous stage.
- **CMP-18** — Format changes, including a change in the number of teams of a pyramid level, apply **from the next season on**. The current season's tournament keeps its format.
- **CMP-19** — A format is **valid** only if its last stage produces a **single winner**: either a single table or a playoff. A last stage made of several groups makes the format invalid. An invalid format is flagged while it is being created or edited; the World cannot be created, and a format change cannot be saved, until it is fixed.

## 6. Promotion and relegation

- **CMP-20** — Promotion and relegation only move teams **between adjacent pyramid levels of the same league**, through promotion and relegation links (F3, LNK-12 to LNK-18). Movement between different competitions is handled by cup links (F3).
- **CMP-21** — Promotion and relegation links read positions from any stage of a level's tournament, so a level may, for example, relegate its last 4 teams or promote the winner of a promotion playoff.
- **CMP-22** — The number of teams moving across each boundary must balance, as defined in LNK-18; otherwise the World cannot advance to the next season.
- **CMP-23** — The top level never promotes teams.
- **CMP-24** — Teams relegated from the **lowest level** go "Out of the World"; replacing them is optional (LNK-15, LNK-16).

## 7. First season

- **CMP-25** — When the World is created, the user picks the teams of every pyramid level and every cup for the first season.

## 8. Changes after creation

- **CMP-26** — Once a World is no longer a draft, competitions **cannot be added, removed or stopped**, and pyramid levels **cannot be added or removed**.
- **CMP-27** — Competitions can still be edited (identity, format, competition links), following CMP-18.

## Open topics (to discuss later)

- **Cross-level playoffs**: promotion/relegation decided by a playoff between teams of two levels (e.g. 16th of level 1 vs 3rd of level 2).
- **Adding, removing or stopping** competitions and pyramid levels after the World is created.
- **Season states** shown on the World (e.g. "in play", "ready to advance") — to be decided in F6/F7.
