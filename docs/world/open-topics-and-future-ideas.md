# Worlds — Open topics and future ideas

Topics that were raised during the requirements discussion and left for later. Every new topic to be discussed later is added here.

## World and files

- **Fate of Collection** now that World exists. For now both coexist as separate file types.
- **Data loss on browser refresh**, affecting drafts and every other open file. To be its own feature.
- **Smaller and lighter World files** (technical).
- **World map as an image**: exporting the World map (F5) as a picture.
- **Presets**: which presets (templates shipped with the app, WLD-22) exist and what each one contains.

## Competitions and structure

- **Adding, removing or stopping** competitions and pyramid levels after the World is created, and **changing the number of teams** of a pyramid level (CMP-25).
- **Periodic cups**: cups played every N seasons (e.g. every 4 seasons from 2026), with no tournament in the other seasons, and how they interact with competition links.
- **Cross-level playoffs**: promotion and relegation decided by a playoff between teams of two levels (e.g. 16th of level 1 vs 3rd of level 2).
- **"Out of the World"**: teams relegated from the lowest level of a league leave the World and are replaced by teams from outside it.
- **Teams outside the World**: teams that play in no competition, teams leaving and returning, and pools of teams to pick replacements from.

## Competition links

- **Same-season qualification** (e.g. Pré-Libertadores winners → Libertadores of the same season). Related to the season calendar.
- **Combined tables across groups** as link sources (e.g. "best 3rd-placed teams").
- **Mutually exclusive competitions** (e.g. a team cannot play both the Libertadores and the Sudamericana in the same season).
- **Links from other competitions into leagues** (e.g. state championships sending teams to the lowest national level).

## Seasons

- **Season calendar**: every match is scheduled on a day of the season, and simulation follows calendar order across competitions.
- **Reviewing generated matches**: when the user starts a season (SET-15), show the matches about to be created and allow regenerating them. Open questions:
  - Is the review per tournament, or one screen for the whole season?
  - Does "regenerate" redo a whole stage, or can single matchweeks be regenerated?
  - Can the user edit the matches by hand (swap home and away, move a match to another matchweek)?
  - Should the same review be available for later stages, when they are drawn during the season?

## Accounts and plans

- **Accounts and cloud**: user accounts, Worlds saved in the cloud and synced across devices, sharing links and public World pages. Suggested phases: free accounts and cloud saves first, then sharing, then a paid tier. Notes:
  - A backend alone does not make large Worlds faster in the browser; the app would need to load only the current season and fetch past seasons on demand.
  - Limits on local files cannot really be enforced; paid value should come from what needs the server (storage, sync, sharing, long histories).
  - Requires payments, privacy compliance, terms of use and moderation of public content.
- **Full match history for accounts**: keeping every season's matches instead of compacting them (END-13, END-15), and advanced history features such as head-to-head records across seasons.
- **Plans and limits**: what each tier allows (number of competitions, pyramid levels, history detail, sharing) and how limits are shown: a "season load" meter based on matches per season, soft warnings before hard limits, caps on competitions and levels, checks when formats change and when files are imported.

## Future ideas

- **Dynamic team strength**: team strength changes based on results; manual override.
- **Season recaps and stories** generated from what happened in a season.
- **Achievements.**
- **Records and hall of fame.**
