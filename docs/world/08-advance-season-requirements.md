# F8 — Preview and advance season

## Overview

When a season is Finished, the user advances the World to the next season. A preview shows where every team is suggested to play next season. Once the user confirms, the finished season is compacted and the next season is created in Setup.

## 1. Starting

- **ADV-01** — When a season is Finished (END-05), the user can **advance to the next season**. The new season's label is generated automatically (WLD-05).
- **ADV-02** — Advancing opens a **preview page** of next season. Its **"Advance to <next season>"** button opens a **confirmation dialog**.

## 2. Preview

- **ADV-03** — The preview shows each pyramid level and cup with its **suggested teams** for next season. Each team has a badge (promoted, relegated, stays, qualified) and the reason it is there (e.g. "Série A, 1st"). Slots without a link, or whose link is ignored because its target no longer exists (LNK-30), are shown as **to be filled in setup**.
- **ADV-04** — Suggestions for **later entry stages** of a cup are also shown, marked as **filled during the season** (SET-03).
- **ADV-05** — A separate **Movements** view lists only the changes: who goes up, who goes down, and who qualifies for each cup.
- **ADV-06** — Suggestions follow the links' order and pass-down rules (LNK-24 to LNK-27).
- **ADV-07** — The preview is **informative only**. Every suggestion can be changed in the next season's setup (SET-09).

## 3. Blockers and editing rules

- **ADV-08** — Blocking issues in the formats and links being edited for next season, such as invalid formats (CMP-19) or promotion and relegation counts that do not match (LNK-16), are listed at the top of the preview, each with a shortcut to fix it. The **Advance button stays disabled** while any remain.
- **ADV-09** — The preview has an **"Edit formats and links"** button that opens the **same competition and link editors used in the creation wizard** (formats and links steps). Links can be added, edited and removed there; competitions, pyramid levels and team counts stay locked (CMP-27). This is the only place where formats and competition links can be edited after the World is created (CMP-17). Format changes apply to the next season's tournaments. Link changes become the **next season's links**: they do not change this preview's suggestions, and first seed the season after (LNK-28). On return, the preview recalculates (e.g. links ignored by LNK-30).
- **ADV-10** — Match results cannot be edited from the preview. It always reflects the season's current results, which stay editable until confirming (END-09).

## 4. Confirming

- **ADV-11** — The confirmation dialog warns that the finished season will be **compacted**, which is irreversible, and states what will be kept (END-13 to END-16). It also promotes accounts.
- **ADV-12** — Confirming compacts the finished season and creates the next one in **Setup** (SET-02). The user returns to the **World overview**, which shows the new season in Setup with a call to action to set it up.
- **ADV-13** — Advancing **cannot be undone**.
