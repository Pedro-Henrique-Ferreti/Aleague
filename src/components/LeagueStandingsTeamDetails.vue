<template>
  <tr v-show="show">
    <td colspan="16">
      <div class="team-details">
        <p class="team-details__title | text-darken">
          {{ name }}
        </p>
        <SkeletonLoader v-if="!statistics || isLoadingStatistics" />
        <template v-else>
          <ul class="team-details__statistics-list">
            <li class="team-details__statistics-list-title">
              <span class="text-darken font-semibold">
                {{ statistics?.home.gamesPlayed }}
              </span> Jogos mandante:
            </li>
            <li>
              <span class="text-success font-semibold">
                {{ statistics?.home.wins }}
              </span> Vitórias
            </li>
            <li>
              <span class="text-secondary-lighten font-semibold">
                {{ statistics?.home.ties }}
              </span> Empates
            </li>
            <li>
              <span class="text-danger font-semibold">
                {{ statistics?.home.losses }}
              </span> Derrotas
            </li>
            <li class="team-details__statistics-list-title">
              <span class="text-darken font-semibold">
                {{ statistics?.away.gamesPlayed }}
              </span> Jogos visitante:
            </li>
            <li>
              <span class="text-success font-semibold">
                {{ statistics?.away.wins }}
              </span> Vitórias
            </li>
            <li>
              <span class="text-secondary-lighten font-semibold">
                {{ statistics?.away.ties }}
              </span> Empates
            </li>
            <li>
              <span class="text-danger font-semibold">
                {{ statistics?.away.losses }}
              </span> Derrotas
            </li>
          </ul>
          <p class="team-details__heading">
            Sequência no campeonato
          </p>
          <div class="team-details__matches-list">
            <LeagueStandingsRecentGame
              v-for="game in statistics.completedGames"
              :key="game.id"
              :game="game"
              :team-id="id"
            />
          </div>
        </template>
      </div>
    </td>
  </tr>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { LeagueTeamStatistics } from '@/types/League';
import { ref, watch } from 'vue';
import { useNotificationStore } from '@/stores/notificationStore';
import LeagueStandingsRecentGame from './LeagueStandingsRecentGame.vue';
import SkeletonLoader from './SkeletonLeagueStandingsTeamDetails.vue';

const { openSnackbarNotification } = useNotificationStore();

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  id: {
    type: Number,
    required: true,
  },
  hashId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: '',
  },
  statistics: {
    type: Object as PropType<LeagueTeamStatistics>,
    default: null,
  },
  getStatisticsFn: {
    type: Function as PropType<(teamId: string) => Promise<void>>,
    required: true,
  },
});

// Statistics
const isLoadingStatistics = ref(false);

async function getStatistics() {
  isLoadingStatistics.value = true;

  try {
    await props.getStatisticsFn(props.hashId);
  } catch (error: any) {
    openSnackbarNotification({
      type: 'error',
      message: error.message,
    });
  } finally {
    isLoadingStatistics.value = false;
  }
}

watch([() => props.show, () => props.statistics], () => {
  if (props.show && !props.statistics && !isLoadingStatistics.value) {
    getStatistics();
  }
});
</script>

<style lang="scss" scoped>
.team-details {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid $color--light-gray-1;
  font-size: 0.875rem;
  &__heading {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    color: $color--text-darken;
    font-weight: $font-weight--semibold;
  }
  &__title {
    margin-bottom: 1rem;
    font-size: 1.25rem;
    font-weight: $font-weight--semibold;
  }
  &__statistics-list {
    display: grid;
    grid-template-columns: repeat(4, max-content);
    gap: 0.5rem 1rem;
  }
  &__statistics-list-title {
    @include for-tablet-portrait-down {
      grid-column: 1 / 5;
    }
  }
  &__matches-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
    max-width: 24rem;
  }
}
</style>
