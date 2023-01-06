<template>
  <div class="playoff-standings">
    <div class="playoff-standings__controls">
      <RoundToggle
        :disable-previous-button="activeRoundNumber === 1"
        :disable-next-button="activeRoundNumber === playoff?.rounds.length"
        @previous-round="activeRoundNumber--"
        @next-round="activeRoundNumber++"
      />
    </div>
    <RoundHeader>
      <span
        v-for="{ number } in displayedRounds"
        v-text="getRoundName(number)"
        :key="number"
      />
    </RoundHeader>
    <div class="playoff-round-grid">
      <div
        v-for="round in displayedRounds"
        class="playoff-standings__card-list"
        :key="round.number"
      >
        <div
          v-for="confrontation in round.confrontations"
          class="playoff-standings__card-list-item"
          :key="confrontation.number"
        >
          <PlayoffCard
            v-if="confrontation.games[1]"
            class="playoff-standings__card"
            :games="confrontation.games"
            v-model:first-game-score-team-a="confrontation.games[0].homeTeamScore"
            v-model:first-game-score-team-b="confrontation.games[0].awayTeamScore"
            v-model:second-game-score-team-a="confrontation.games[1].awayTeamScore"
            v-model:second-game-score-team-b="confrontation.games[1].homeTeamScore"
            v-model:penalty-score-team-a="confrontation.games[1].awayTeamPenaltyShootoutScore"
            v-model:penalty-score-team-b="confrontation.games[1].homeTeamPenaltyShootoutScore"
            @update-next-round="updateNextRound({
              team: $event,
              roundNumber: round.number,
              confrontationNumber: confrontation.number,
              nextConfrontationId: confrontation.nextConfrontationId
            })"
          />
          <PlayoffCard
            v-else
            class="playoff-standings__card"
            :games="confrontation.games"
            v-model:first-game-score-team-a="confrontation.games[0].homeTeamScore"
            v-model:first-game-score-team-b="confrontation.games[0].awayTeamScore"
            v-model:penalty-score-team-a="confrontation.games[0].homeTeamPenaltyShootoutScore"
            v-model:penalty-score-team-b="confrontation.games[0].awayTeamPenaltyShootoutScore"
            @update-next-round="updateNextRound({
              team: $event,
              confrontationNumber: confrontation.number,
              roundNumber: round.number,
              nextConfrontationId: confrontation.nextConfrontationId
            })"
          />
        </div>
      </div>
    </div>
    <div class="playoff-standings__save-button-wrapper">
      <SaveButton
        :is-loading="isSavingGames"
        @click="saveGames"
      />
    </div>
  </div>
</template>

<script lang="ts">
interface UpdateNextRoundParams {
  roundNumber: number;
  confrontationNumber: number;
  nextConfrontationId: number | null;
  team: GameTeam | null;
}

interface SetConfrontationTeamParams {
  roundIndex: number,
  confrontationIndex: number,
  team: GameTeam | null,
  isTeamA: boolean,
}
</script>

<script lang="ts" setup>
import type { PlayoffGame } from '@/types/Playoff';
import type { GameTeam } from '@/types/Game';
import { inject, ref, computed } from 'vue';
import { useNotificationStore } from '@/stores/notificationStore';
import { usePlayoffStore } from '@/stores/playoffStore';
import { KEY_PLAYOFF } from '@/constants/injectionKeys';

import SaveButton from './SaveButton.vue';
import RoundToggle from './CompetitionRoundToggle.vue';
import RoundHeader from './PlayoffRoundHeader.vue';
import PlayoffCard from './PlayoffCard.vue';

const { openSnackbarNotification } = useNotificationStore();
const { savePlayoffGames } = usePlayoffStore();

// Injected values
const playoff = inject(KEY_PLAYOFF);

const activeRoundNumber = ref(1);

const displayedRounds = computed(() => {
  if (!playoff) {
    return [];
  }

  const { rounds } = playoff.value;
  const index = activeRoundNumber.value - 1;

  return rounds.slice(index, index + 3);
});

function getRoundName(number: number): string {
  if (!playoff) {
    return '';
  }

  const roundNumbers = playoff.value.rounds
    .slice(-4)
    .map(({ number }) => number)
    .reverse();

  switch (number) {
    case roundNumbers[0]:
      return 'Final';
    case roundNumbers[1]:
      return 'Semi-final';
    case roundNumbers[2]:
      return 'Quartas de final';
    case roundNumbers[3]:
      return 'Oitavas de final';
    default:
      return `Fase ${number}`;
  }
}

// Update next round
function getNextRoundIndex(round: number) {
  if (!playoff) {
    return null;
  }

  const index = playoff.value.rounds.findIndex(
    ({ number }) => number === round + 1,
  );

  return (index === -1) ? null : index;
}

function getNextConfronationIndex(roundIndex: number, confrontationId: number) {
  if (!playoff) {
    return null;
  }

  const index = playoff.value.rounds[roundIndex].confrontations.findIndex(
    ({ id }) => id === confrontationId,
  );

  return (index === -1) ? null : index;
}

function updateNextRound({
  roundNumber,
  confrontationNumber,
  nextConfrontationId,
  team,
}: UpdateNextRoundParams) {
  if (!nextConfrontationId) return;

  const nextRoundIndex = getNextRoundIndex(roundNumber);

  if (nextRoundIndex === null) return;

  const nextConfrontationIndex = getNextConfronationIndex(nextRoundIndex, nextConfrontationId);

  if (nextConfrontationIndex === null) return;

  setConfrontationTeam({
    team,
    roundIndex: nextRoundIndex,
    confrontationIndex: nextConfrontationIndex,
    isTeamA: confrontationNumber % 2 === 1,
  });
}

function setConfrontationTeam({
  team,
  roundIndex,
  confrontationIndex,
  isTeamA,
}: SetConfrontationTeamParams) {
  if (!playoff) return;

  const games = playoff.value.rounds[roundIndex].confrontations[confrontationIndex].games;

  games[0][isTeamA ? 'homeTeam' : 'awayTeam'] = team;
  games[0].homeTeamScore = null;
  games[0].awayTeamScore = null;

  if (games[1]) {
    games[1][isTeamA ? 'awayTeam' : 'homeTeam'] = team;
    games[1].homeTeamScore = null;
    games[1].awayTeamScore = null;
  }
}

function getPlayoffGames() {
  let playoffGames: PlayoffGame[] = [];

  if (playoff) {
    playoff.value.rounds.forEach(({ confrontations }) => {
      confrontations.forEach(({ games }) => {
        playoffGames = [...playoffGames, ...games] as PlayoffGame[];
      });
    });
  }

  return JSON.parse(JSON.stringify(playoffGames)) as PlayoffGame[];
}

// Save games
let staticPlayoffGames = getPlayoffGames();
const isSavingGames = ref(false);

async function saveGames() {
  if (!playoff) return;

  isSavingGames.value = true;

  try {
    const playoffGames = getPlayoffGames();

    const updatedGames: PlayoffGame[] = [];

    playoffGames.forEach((game, index) => {
      const {
        homeTeam,
        awayTeam,
        homeTeamScore,
        awayTeamScore,
        homeTeamPenaltyShootoutScore,
        awayTeamPenaltyShootoutScore,
      } = staticPlayoffGames[index];

      if (
        homeTeam?.id !== game.homeTeam?.id
        || awayTeam?.id !== game.awayTeam?.id
        || homeTeamScore !== game.homeTeamScore
        || awayTeamScore !== game.awayTeamScore
        || homeTeamPenaltyShootoutScore !== game.homeTeamPenaltyShootoutScore
        || awayTeamPenaltyShootoutScore !== game.awayTeamPenaltyShootoutScore
      ) {
        updatedGames.push(game);
      }
    });

    if (updatedGames.length < 1) return;

    await savePlayoffGames({
      hashId: playoff.value.hashid,
      games: updatedGames,
    });

    staticPlayoffGames = getPlayoffGames();

    openSnackbarNotification({
      message: 'Alterações salvas com sucesso!',
    });
  } catch (error: any) {
    openSnackbarNotification({
      type: 'error',
      message: error.message,
    });
  } finally {
    isSavingGames.value = false;
  }
}
</script>

<style lang="scss" scoped>
.playoff-standings {
  display: grid;
  margin-top: 1.5rem;
  position: relative;
  &__controls {
    display: flex;
    align-items: flex-end;
    width: 100%;
    min-height: 2.75rem;
    margin-bottom: 1.5rem;
  }
  &__card-list {
    --justify: flex-start;
    --bracket-display: none;
    display: grid;
    gap: 1rem;
    &:not(:first-of-type) {
      --justify: flex-end;
      --bracket-display: block;
    }
    &:nth-child(2) {
      --justify: center;
    }
    @include for-large-tablet-portrait-down {
      --justify: center;
    }
  }
  &__card-list-item {
    display: flex;
    justify-content: var(--justify);
    align-items: center;
    width: 100%;
    height: 100%;
    position: relative;
  }
  &__card {
    &::before,
    &::after {
      content: '';
      display: var(--bracket-display);
      position: absolute;
      z-index: -1;
    }
    &::before {
      width: 1.5rem;
      height: 54%;
      border: 2px solid $color--light-gray-1;
      border-top-right-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
      border-left-color: transparent;
      transform: translateX(calc(-100% - 2.5rem));
    }
    &::after {
      width: 2.5rem;
      height: 2px;
      background-color: $color--light-gray-1;
      transform: translateX(-100%);
    }
  }
  &__save-button-wrapper {
    margin-top: 2rem;
    margin-left: auto;
    @include for-large-tablet-portrait-up {
      margin: 0;
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
</style>
