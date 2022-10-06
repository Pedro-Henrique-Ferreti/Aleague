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
          />
          <TableButton
            aria-label="Previous gameweek"
            rotate="left"
          />
          <span class="league-matches__table-gameweek">
            Rodada {{ currentGameweek }}
          </span>
          <TableButton aria-label="Next gameweek" />
          <TableButton
            aria-label="Last gameweek"
            icon="double-chevron"
            rotate="right"
          />
        </div>
        <div class="league-matches__table-body">
          <LoadingIndicator
            v-if="isLoadingGameweek"
            class="league-matches__loading-indicator"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Gameweek } from '@/types/Game';
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
const currentGameweek = ref(1);
const gameweek = ref<Gameweek>([]);

getGameweek();

async function getGameweek() {
  isLoadingGameweek.value = true;

  try {
    gameweek.value = await leaguesStore.getGameweek({
      leagueId: league?.value.hashid || '',
      gameweekNumber: currentGameweek.value,
    });
  } catch (error: any) {
    openSnackbarNotification({
      type: 'error',
      message: error.message,
    });
  } finally {
    isLoadingGameweek.value = false;
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
}
</style>
