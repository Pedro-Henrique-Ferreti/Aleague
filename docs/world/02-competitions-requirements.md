# F2 — Competitions

## Overview

A World is made of **competitions**. In every season, each competition produces its tournament(s) for that season. There are two competition types; they differ in how teams carry over from one season to the next, not in their format.

## 1. Competition types

- **CMP-01** — There are two competition types: **League** and **Cup**.
- **CMP-02** — A **league** is a pyramid made of one or more **pyramid levels**, numbered from 1 at the top (e.g. Campeonato Brasileiro: Série A = level 1 … Série D = level 4). Each season, every pyramid level produces one tournament.
- **CMP-03** — A league carries its teams over from one season to the next: promotion and relegation move them between its levels, and the user may replace any team during season setup (F6).
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

- **CMP-14** — Every competition is played every season.

## 5. Format and entry

- **CMP-15** — Each pyramid level and each cup has a **format** (its stages), followed by every season's tournament.
- **CMP-16** — A cup can receive teams at **any of its stages**; each entry stage defines how many teams enter there. The remaining places of later stages are filled by the teams advancing from the previous stage.
- **CMP-17** — Format changes apply **from the next season on**. The current season's tournament keeps its format.
- **CMP-18** — A format is **valid** only if its last stage produces a **single winner**: either a single table or a playoff. A last stage made of several groups makes the format invalid. An invalid format is flagged while it is being created or edited; the World cannot be created, and a format change cannot be saved, until it is fixed.

## 6. Promotion and relegation

- **CMP-19** — Promotion and relegation only move teams **between adjacent pyramid levels of the same league**, through promotion and relegation links (F3, LNK-12 to LNK-16). Movement between different competitions is handled by cup links (F3).
- **CMP-20** — Promotion and relegation links read positions from any stage of a level's tournament, so a level may, for example, relegate its last 4 teams or promote the winner of a promotion playoff.
- **CMP-21** — The number of teams moving across each boundary must balance, as defined in LNK-16; otherwise the World cannot advance to the next season.
- **CMP-22** — The top level never promotes teams.
- **CMP-23** — The lowest level never relegates teams.

## 7. First season

- **CMP-24** — The teams of the first season are picked in the first season's setup (SET-04), after the World is created.

## 8. Changes after creation

- **CMP-25** — Once a World is no longer a draft, competitions **cannot be added, removed or stopped**, pyramid levels **cannot be added or removed**, and the **number of teams of each pyramid level cannot change**.
- **CMP-26** — Competitions can still be edited (identity, format, competition links), following CMP-17.

