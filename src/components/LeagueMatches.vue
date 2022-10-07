<template>
  <div class="league-matches">
    <div class="league-matches__content">
      <AppButton
        icon-rounded
        class="league-matches__save-button"
        icon-left="save"
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
              <div
                v-if="shouldShowGameDate(game, index)"
                class="league-matches__game-date"
              >
                <span class="text-darken">{{ getWeekday(game.weekday) }}</span>
                <span class="text-darken">{{ game.hour }}</span>
              </div>
              <div>
                {{ game.homeTeam.name }} x {{ game.awayTeam.name }}
              </div>
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

const { openSnackbarNotification } = useNotificationStore();
const leaguesStore = useLeaguesStore();

// Injected values
const league = inject(INJECTION_KEYS.league);

// Gameweek
const isLoadingGameweek = ref(false);
const currentGameweekIndex = ref(1);
const gameweeks = ref<Gameweek[]>([]);

getGameweeks();

async function getGameweeks() {
  isLoadingGameweek.value = true;

  try {
    gameweeks.value = await leaguesStore.getLeagueGameweeks(league?.value.hashid || '');
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

function getWeekday(weekday: string) {
  switch (weekday) {
    case '1':
      return 'Seg';
    case '2':
      return 'Ter';
    case '3':
      return 'Qua';
    case '4':
      return 'Qui';
    case '5':
      return 'Sex';
    case '6':
      return 'Sáb';
    case '7':
      return 'Dom';
    default:
      return '';
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
    width: 20rem;
    border-radius: 0.25rem;
    border: 1px solid $color--light-gray-1;
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
  &__game-date {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 1.5rem;
    align-items: flex-end;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    font-weight: $font-weight--semibold;
    &::after {
      content: '';
      display: block;
      grid-column: 2 / 3;
      grid-row: 1 / 2;
      width: 100%;
      height: 1px;
      background-color: $color--light-gray-1;
      transform: translateY(-0.25rem);
    }
  }
}
</style>
