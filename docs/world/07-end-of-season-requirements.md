# F7 — End of season

## Overview

A season ends when every tournament played in it is complete. Once finished, the user sees a summary of the season's winners and can move on to the next season. When the user confirms advancing, the season is **compacted**: its matches are deleted, and only what History and competition links need is kept.

## 1. When a season ends

- **END-01** — A season is **finished** when every tournament played that season has all its matches played and a winner.
- **END-02** — Ties are broken by each tournament's own rules.
- **END-03** — A season cannot finish while any match is unplayed.

## 2. Season states

- **END-04** — A season is in one of three states: **Setup**, **In play** or **Finished** (SET-01). This feature covers the last two.
- **END-05** — Advancing to the next season (F8) is only available when the season is Finished.

## 3. Simulating the rest of the season

- **END-06** — While a season is In play, the user can **simulate every remaining match** of the season in one action.
- **END-07** — If the simulation reaches a cup stage with empty slots (LNK-22), it pauses and asks the user to fill them, then continues.

## 4. Finished season

- **END-08** — When a season becomes Finished, the user sees a **season summary**: each tournament's champion and runner-up, and the result of its final. The summary leads to the next-season preview (F8).
- **END-09** — Results can still be edited while the season is Finished, until it is compacted. Changes to standings and winners are reflected in the summary.

## 5. Winners

- **END-10** — Every tournament records its **champion** and **runner-up**.
- **END-11** — When a tournament's champion stage (CMP-18) is a playoff, the champion and runner-up are the winner and loser of the final. The record also keeps **every match of the final**: both legs if it is two-legged, and the penalty shoot-out if there was one.
- **END-12** — When a tournament's champion stage is a single table, the champion and runner-up are its **1st and 2nd**.

## 6. Compaction

- **END-13** — When a season is compacted, its matches are deleted. Only the following are kept, which is everything History (F9) and competition links (LNK-06) need:
  - the season's **structure** as it was played: each tournament's format (stages, groups, playoff rounds and champion stage), so past seasons keep the structure they were played with (WLD-29);
  - the **full table of every stage**: position, team and every stat column (played, won, drawn, lost, goals for, goals against, goal difference, points);
  - the **bracket of every playoff stage**: every tie, its two teams and its result (aggregate score and penalty shoot-out, if any), without its individual matches;
  - the **legends** of every stage, from that season's links (LEG-11): positions, colours, targets and any renamed labels;
  - the **winners** of every tournament, including every match of the final (END-10, END-11);
  - the name of any tournament the user **renamed** for that season (CMP-10).
- **END-14** — Compacted seasons keep **references** to competitions, pyramid levels and teams, not copies of their names and icons. History always shows their **current** names and icons (HIS-10).
- **END-15** — Every final position of every stage is **fixed when the season is compacted** and never changes afterwards.
- **END-16** — Compaction happens **when the user confirms advancing** to the next season (F8). Before confirming, the user is told that compaction is irreversible and what will be kept. The same message **promotes accounts** as the way to keep the full match history and access advanced history features, such as head-to-head records across seasons.
- **END-17** — No full backup with the season's matches is offered before compaction.
