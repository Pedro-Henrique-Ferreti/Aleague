# F6 — Season setup

## Overview

Every season begins in **Setup**, before any match is played. In the first season, the user picks the teams of every competition's first stage. In later seasons, competition links prefill those first stages with suggested teams, and the user accepts them, replaces them or fills the remaining slots. The user then draws each first stage and starts the season, which generates its matches. Later stages are filled and drawn on each tournament's page while the season is In play.

## 1. The Setup state

- **SET-01** — Every season begins in the **Setup** state, before any match is played. Season states are **Setup → In play → Finished**.
- **SET-02** — The first season is created in Setup as soon as the World is created. Every later season is created in Setup when the user confirms advancing (F8).
- **SET-03** — In setup, the user only fills the slots of each tournament's **first stage**. Slots of later entry stages, including those covered by competition links, are filled on the tournament page once the season is In play (LNK-22).

## 2. Teams of the first season

- **SET-04** — In the first season's setup, the user picks the first-stage teams of **every pyramid level and every cup**.
- **SET-05** — If the World was created from a template, the template's initial teams prefill this setup, and the user can change them.

## 3. Placement rules

- **SET-06** — A team plays in **at most one level of each league** (CMP-04).
- **SET-07** — Within a tournament, a team appears **at most once in each stage**. It may appear in several stages of the same tournament.
- **SET-08** — A team **enters** a tournament only once, at one entry stage (CMP-16).

## 4. Teams of later seasons

- **SET-09** — Every first-stage slot covered by a competition link, **in a pyramid level or in a cup**, arrives prefilled with a **suggested** team. In a pyramid level, that means teams promoted, relegated or staying (LNK-15). The user can accept, replace or remove any suggested team. Replacing or removing a suggestion **only affects the current season**: the link is not changed and suggests a team again next season.
- **SET-10** — The user fills the remaining first-stage slots with any team allowed by SET-06 to SET-08.

## 5. Drawing the first stage

- **SET-11** — Once a tournament's first-stage slots are filled, the user draws that stage in a **draw editor**, assigning teams to pots **freely**.
- **SET-12** — A **"Draw all"** action draws every tournament whose first stage is filled, using the pots as currently set; teams without a pot are placed at random. Tournaments can still be drawn one by one.
- **SET-13** — Later stages are drawn on the tournament page during the season, after their slots are filled.

## 6. Starting the season

- **SET-14** — Each tournament shows whether it is **ready**: every slot of its first stage is filled and the stage is drawn.
- **SET-15** — When every tournament is ready, the user clicks **"Start season"**. This **generates the matches of every first stage** (e.g. all the matchweeks of a league) and moves the season to **In play**.
- **SET-16** — Until the season starts, every setup choice can be changed, including redoing draws.
