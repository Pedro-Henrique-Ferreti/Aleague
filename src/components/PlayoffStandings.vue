<template>
  <div class="playoff-standings">
    <div class="playoff-standings__controls">
      <RoundToggle
        :disable-previous-button="activeRoundNumber === 1"
        :disable-next-button="activeRoundNumber === playoff?.standings.length"
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
        <template
          v-for="confrontation in round.confrontations"
          :key="confrontation.number"
        >
          <PlayoffCard
            v-if="confrontation.games[1]"
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
              nextConfrontationNumber: confrontation.nextConfrontationNumber
            })"
          />
          <PlayoffCard
            v-else
            :games="confrontation.games"
            v-model:first-game-score-team-a="confrontation.games[0].homeTeamScore"
            v-model:first-game-score-team-b="confrontation.games[0].awayTeamScore"
            v-model:penalty-score-team-a="confrontation.games[0].homeTeamPenaltyShootoutScore"
            v-model:penalty-score-team-b="confrontation.games[0].awayTeamPenaltyShootoutScore"
            @update-next-round="updateNextRound({
              team: $event,
              confrontationNumber: confrontation.number,
              roundNumber: round.number,
              nextConfrontationNumber: confrontation.nextConfrontationNumber
            })"
          />
        </template>
      </div>
    </div>
    <div class="playoff-standings__save-button-wrapper">
      <AppButton
        icon-rounded
        class="playoff-standings__save-button"
        icon-left="save"
        :is-loading="isSavingGames"
        @click="saveGames"
      >
        Salvar
      </AppButton>
    </div>
  </div>
</template>

<script lang="ts">
type Team = { id: number | null, name: string | null };

interface UpdateNextRoundParams {
  roundNumber: number;
  confrontationNumber: number;
  nextConfrontationNumber: number | null;
  team: Team | null;
}

interface setConfrontationTeamParams {
  roundIndex: number,
  confrontationIndex: number,
  team: Team,
  isTeamA: boolean,
}
</script>

<script lang="ts" setup>
import type { PlayoffGame } from '@/types/Playoff';
import { inject, ref, computed } from 'vue';
import { useNotificationStore } from '@/stores/notificationStore';
import { usePlayoffStore } from '@/stores/playoffStore';
import { KEY_PLAYOFF } from '@/constants/injectionKeys';
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

  const { standings } = playoff.value;
  const index = activeRoundNumber.value - 1;

  return standings.slice(index, index + 3);
});

function getRoundName(number: number): string {
  if (!playoff) {
    return '';
  }

  const roundNumbers = playoff.value.standings
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

  const index = playoff.value.standings.findIndex(
    ({ number }) => number === round + 1,
  );

  return (index === -1) ? null : index;
}

function getNextConfronationIndex(roundIndex: number, confrontationNumber: number) {
  if (!playoff) {
    return null;
  }

  const index = playoff.value.standings[roundIndex].confrontations.findIndex(
    ({ number }) => number === confrontationNumber,
  );

  return (index === -1) ? null : index;
}

function updateNextRound({
  roundNumber,
  confrontationNumber,
  nextConfrontationNumber,
  team,
}: UpdateNextRoundParams) {
  if (!nextConfrontationNumber) return;

  const nextRoundIndex = getNextRoundIndex(roundNumber);

  if (nextRoundIndex === null) return;

  const nextConfrontationIndex = getNextConfronationIndex(nextRoundIndex, nextConfrontationNumber);

  if (nextConfrontationIndex === null) return;

  setConfrontationTeam({
    team: team || { id: null, name: null },
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
}: setConfrontationTeamParams) {
  if (!playoff) return;

  const games = playoff.value.standings[roundIndex].confrontations[confrontationIndex].games;

  const { id, name } = team;

  games[0][isTeamA ? 'homeTeamId' : 'awayTeamId'] = id;
  games[0][isTeamA ? 'homeTeamName' : 'awayTeamName'] = name;
  games[0].homeTeamScore = null;
  games[0].awayTeamScore = null;

  if (games[1]) {
    games[1][isTeamA ? 'awayTeamId' : 'homeTeamId'] = id;
    games[1][isTeamA ? 'awayTeamName' : 'homeTeamName'] = name;
    games[1].homeTeamScore = null;
    games[1].awayTeamScore = null;
  }
}

function getPlayoffGames() {
  let playoffGames: PlayoffGame[] = [];

  if (playoff) {
    playoff.value.standings.forEach(({ confrontations }) => {
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
        homeTeamId,
        awayTeamId,
        homeTeamScore,
        awayTeamScore,
        homeTeamPenaltyShootoutScore,
        awayTeamPenaltyShootoutScore,
      } = staticPlayoffGames[index];

      if (
        homeTeamId !== game.homeTeamId
        || awayTeamId !== game.awayTeamId
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
    display: grid;
    gap: 1rem;
    &:not(:first-of-type) {
      place-items: center flex-end;
    }
    &:nth-child(2) {
      place-items: center;
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
  &__save-button {
    --min-width: 9rem !important;
  }
}
</style>
