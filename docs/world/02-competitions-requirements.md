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
- **CMP-17** — After the World is created, formats can only be changed from the **next-season preview** (ADV-09), once the season is Finished. Changes apply **from the next season on**; the finished season keeps the format it was played with.
- **CMP-18** — Each format has a **champion stage**: the stage that decides the tournament's champion and runner-up (END-10 to END-12). When a format has a single stage, that stage is the champion stage. When it has more than one stage, the user **must pick** the champion stage while creating or editing the format; there is no default.
- **CMP-19** — A format is **valid** only if its champion stage is picked and produces a **single winner**: either a single table or a playoff that ends in a final. A champion stage made of several groups, or a playoff that sends several teams on, makes the format invalid. Other stages, including the last one, have no such restriction (e.g. relegation play-out groups after the main table). An invalid format can be saved and is flagged wherever it appears; the World cannot be created (WLD-13) or advance to the next season (ADV-08) until it is fixed.
- **CMP-20** — The champion stage also applies to **standalone tournament files**, following CMP-18 and CMP-19. Existing standalone files with several stages and no champion stage use their **last stage** as the champion stage; the user can change it in the format.

## 6. Promotion and relegation

- **CMP-21** — Promotion and relegation only move teams **between adjacent pyramid levels of the same league**, through promotion and relegation links (F3, LNK-12 to LNK-16). Movement between different competitions is handled by cup links (F3).
- **CMP-22** — Promotion and relegation links read positions from any stage of a level's tournament, so a level may, for example, relegate its last 4 teams or promote the winner of a promotion playoff.
- **CMP-23** — The number of teams moving across each boundary must balance, as defined in LNK-16; otherwise the World cannot be created or advance to the next season.
- **CMP-24** — The top level never promotes teams.
- **CMP-25** — The lowest level never relegates teams.

## 7. First season

- **CMP-26** — The teams of the first season are picked in the first season's setup (SET-04), after the World is created.

## 8. Changes after creation

- **CMP-27** — Once a World is no longer a draft, competitions **cannot be added, removed or stopped**, pyramid levels **cannot be added or removed**, and the **number of teams of each pyramid level cannot change**.
- **CMP-28** — A competition's identity can be edited at any time. Its format and competition links can only be edited from the next-season preview (CMP-17, ADV-09).

