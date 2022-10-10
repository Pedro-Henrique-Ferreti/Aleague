<template>
  <div class="league-matches">
    <div class="league-matches__content">
      <AppButton
        icon-rounded
        class="league-matches__save-button"
        icon-left="save"
        :is-loading="isSavingGames"
        @click="saveGames"
      >
        Salvar
      </AppButton>
      <div class="league-matches__table">
        <div class="league-matches__table-header">
          <TableButton
            aria-label="First gameweek"
            icon="double-chevron"
            @click="currentGameweekIndex = 0"
          />
          <TableButton
            aria-label="Previous gameweek"
            rotate="left"
            @click="updateGameweekIndex(-1)"
          />
          <span class="league-matches__table-gameweek">
            Rodada {{ currentGameweekIndex + 1 }}
          </span>
          <TableButton
            aria-label="Next gameweek"
            @click="updateGameweekIndex(1)"
          />
          <TableButton
            aria-label="Last gameweek"
            icon="double-chevron"
            rotate="right"
            @click="currentGameweekIndex = league?.numberOfGameweeks as number - 1"
          />
        </div>
        <div class="league-matches__table-body">
          <LoadingIndicator
            v-if="isLoadingGameweek"
            class="league-matches__loading-indicator"
          />
          <template v-else>
            <template
              v-for="(game, index) in gameweeks[currentGameweekIndex].games"
              :key="game.id"
            >
              <GameDate
                v-if="shouldShowGameDate(game, index)"
                :weekday="game.weekday"
                :hour="game.hour"
              />
              <LeagueMatchesGame
                v-model:home-team-score="game.homeTeamScore"
                v-model:away-team-score="game.awayTeamScore"
                :home-team="game.homeTeam.name"
                :away-team="game.awayTeam.name"
              />
            </template>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Game, Gameweek } from '@/types/Game';
import { inject, ref } from 'vue';
import { useNotificationStore } from '@/stores/notificationStore';
import { useLeaguesStore } from '@/stores/leaguesStore';
import { INJECTION_KEYS } from '@/constants';

import LoadingIndicator from './LoadingIndicator.vue';
import TableButton from './LeagueMatchesTableButton.vue';
import GameDate from './LeagueMatchesGameDate.vue';
import LeagueMatchesGame from './LeagueMatchesGame.vue';

const { openSnackbarNotification } = useNotificationStore();
const leaguesStore = useLeaguesStore();

// Injected values
const league = inject(INJECTION_KEYS.league);
const reloadLeague = inject(INJECTION_KEYS.reloadLeague);

// Gameweek
const isLoadingGameweek = ref(false);
const currentGameweekIndex = ref(0);
const gameweeks = ref<Gameweek[]>([]);
let staticGameweeks: Gameweek[] = [];

getGameweeks();

async function getGameweeks() {
  isLoadingGameweek.value = true;

  try {
    const gameweeksValues = await leaguesStore.getLeagueGameweeks(league?.value.hashid || '');

    gameweeks.value = JSON.parse(JSON.stringify(gameweeksValues));
    staticGameweeks = JSON.parse(JSON.stringify(gameweeksValues));
  } catch (error: any) {
    openSnackbarNotification({
      type: 'error',
      message: error.message,
    });
  } finally {
    isLoadingGameweek.value = false;
  }
}

function updateGameweekIndex(value: number) {
  const newIndex = currentGameweekIndex.value + value;

  if (league && newIndex > -1 && newIndex < league.value.numberOfGameweeks) {
    currentGameweekIndex.value = newIndex;
  }
}

function shouldShowGameDate(game: Game, index: number) {
  const previousGame = gameweeks.value[currentGameweekIndex.value].games[index - 1];

  return (
    !previousGame
    || previousGame.weekday !== game.weekday
    || previousGame.hour !== game.hour
  );
}

// Save games
const isSavingGames = ref(false);

async function saveGames() {
  isSavingGames.value = true;

  try {
    const updatedGames: Record<string, unknown>[] = [];

    gameweeks.value.forEach((gameweek, gameweekIndex) => {
      gameweek.games.forEach((game, gameIndex) => {
        const {
          homeTeamScore, awayTeamScore,
        } = staticGameweeks[gameweekIndex].games[gameIndex];

        if (game.homeTeamScore !== homeTeamScore || game.awayTeamScore !== awayTeamScore) {
          updatedGames.push({
            id: game.id,
            homeTeamScore: game.homeTeamScore,
            awayTeamScore: game.awayTeamScore,
          });
        }
      });
    });

    if (updatedGames.length < 1) return;

    await leaguesStore.saveLeagueGames({
      leagueId: league?.value.hashid || '',
      games: updatedGames as any,
    });

    if (reloadLeague) {
      await reloadLeague({ showLoader: false });
    }

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
.league-matches {
  &__content {
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-end;
    gap: 1rem;
    @include for-desktop-up {
      flex-direction: column;
    }
  }
  &__save-button {
    margin-left: auto;
  }
  &__table {
    --spacing: 1rem;
    border-radius: 0.25rem;
    border: 1px solid $color--light-gray-1;
    @include for-tablet-portrait-up {
      width: 25rem;
    }
  }
  &__table-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem var(--spacing);
    background-color: $color--light-gray-2;
    border-bottom: 1px solid $color--light-gray-1;
  }
  &__table-gameweek {
    flex: 1;
    font-weight: $font-weight--semibold;
    text-align: center;
  }
  &__table-body {
    padding: var(--spacing);
  }
  &__loading-indicator {
    --size: 3rem;
    height: 10rem;
  }
}
</style>
