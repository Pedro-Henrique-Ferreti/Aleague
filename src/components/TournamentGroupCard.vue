<template>
  <section class="group-card | app-base-card">
    <div class="group-card__header">
      <h2 class="group-card__title">
        {{ title }}
      </h2>
    </div>
    <div class="group-card__table-container">
      <div
        class="group-card__table-wrapper"
        ref="tableWrapperRef"
      >
        <table class="group-card__table">
          <TransitionTournamentStandings tag="tbody">
            <tr
              class="group-card__table-header"
              key="header"
            >
              <th
                class="header-placeholder"
                aria-hidden="true"
              />
              <th class="position">
                Posição
              </th>
              <th class="points">
                Pontos
              </th>
              <th>
                <span class="mobile">J</span>
                <span class="desktop">Jogos</span>
              </th>
              <th>
                <span class="mobile">V</span>
                <span class="desktop">Vitórias</span>
              </th>
              <th>
                <span class="mobile">E</span>
                <span class="desktop">Empates</span>
              </th>
              <th>
                <span class="mobile">D</span>
                <span class="desktop">Derrotas</span>
              </th>
              <th>
                <span v-tooltip="'Gols Pró'">GP</span>
              </th>
              <th>
                <span v-tooltip="'Gols Contra'">GC</span>
              </th>
              <th>
                <span v-tooltip="'Saldo de Gols'">SG</span>
              </th>
              <th>
                <span v-tooltip="'Aproveitamento'">%</span>
              </th>
              <th class="recent-matches">
                Recentes
              </th>
              <th />
            </tr>
            <tr
              v-for="row in standings"
              class="group-card__table-row"
              :key="row.id"
              :data-highlight="row.team.id && highlightedTeamsId.includes(row.team.id)"
              @click="(!row.team.id) ? $router.push({
                name: 'edit-tournament-teams',
                params: { id: tournament?.id },
                query: { stageId: stage.id },
              }) : null"
            >
              <td
                v-resize-observer="onResizeObserver"
                class="resize-observer"
                aria-hidden="true"
              />
              <td class="position">
                <TournamentGroupCardTeam
                  :row="row"
                  :team-data-width="teamDataWidth"
                  @update-position-color="updatePositionColor(row)"
                />
              </td>
              <td
                v-if="!row.team.id"
                colspan="11"
              />
              <template v-else>
                <td class="points">
                  {{ row.points }}
                </td>
                <td>{{ row.gamesPlayed }}</td>
                <td>{{ row.wins }}</td>
                <td>{{ row.ties }}</td>
                <td>{{ row.loses }}</td>
                <td>{{ row.goalsFor }}</td>
                <td>{{ row.goalsAgainst }}</td>
                <td>{{ row.goalsFor - row.goalsAgainst }}</td>
                <td>
                  {{ row.gamesPlayed ? Math.round(row.points / (row.gamesPlayed * 3) * 100) : 0 }}%
                </td>
                <td>
                  <TournamentTeamRecentMatches
                    :recent-games="row.recentGames"
                    :team="row.team"
                  />
                </td>
                <td />
              </template>
            </tr>
          </TransitionTournamentStandings>
        </table>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { ResizeObserverCallback } from '@vueuse/core';
import type { TournamentGroupsStage, TournamentStageStandings } from '@/types/Tournament';
import { computed, inject, ref } from 'vue';
import { useScroll } from '@vueuse/core';
import { vResizeObserver } from '@vueuse/components';
import { KEY_TOURNAMENT } from '@/constants/injectionKeys';
import { PositionColor, STANDINGS_POSITION_COLORS } from '@/constants/tournament';
import TransitionTournamentStandings from './TransitionTournamentStandings.vue';
import TournamentTeamRecentMatches from './TournamentTeamRecentMatches.vue';
import TournamentGroupCardTeam from './TournamentGroupCardTeam.vue';

const emit = defineEmits<{
  (e: 'update:position-color', payload: { rowIndex: number; color: PositionColor }): void;
}>();
const props = defineProps<{
  title: string;
  standings: TournamentStageStandings[];
  stage: TournamentGroupsStage;
  highlightedTeamsId: string[];
}>();

// Injected values
const tournament = inject(KEY_TOURNAMENT);

const tableWrapperRef = ref<HTMLElement | null>(null);
const tableScroll = useScroll(tableWrapperRef);

const leftDividerWidth = computed(() => (
  `${(tableScroll.x.value > 6) ? 6 : tableScroll.x.value}px`
));

const rightDividerWidth = computed(() => {
  const clientWidth = tableWrapperRef.value?.clientWidth || 0;
  const scrollWidth = tableWrapperRef.value?.scrollWidth || 0;
  const scrollSize = scrollWidth - clientWidth;

  return `${scrollSize - tableScroll.x.value}px`;
});

// Resize observer
const teamDataWidth = ref('0px');

function onResizeObserver(entries: Parameters<ResizeObserverCallback>[0]) {
  teamDataWidth.value = `${entries[0].contentRect.width}px`;
}

// Update position color
function updatePositionColor(row: TournamentStageStandings) {
  const index = STANDINGS_POSITION_COLORS.indexOf(row.positionColor);

  emit('update:position-color', {
    rowIndex: props.standings.findIndex((standing) => standing.id === row.id),
    color: STANDINGS_POSITION_COLORS[index + 1] || '',
  });
}
</script>

<style lang="scss" scoped>
@mixin resize-observer {
  min-width: var(--fixed-column-min-width);
  width: 40%;
  pointer-events: none;
}
.group-card {
  --base-card--padding: 1rem 1.125rem;
  --fixed-column-min-width: 15rem;
  overflow: hidden;
  @include for-tablet-portrait-up {
    --fixed-column-min-width: 18rem;
  }
  &__header {
    padding-bottom: 0.75rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid $color--neutral-300;
  }
  &__title {
    color: $color--text-strong;
    font-weight: $font-weight--medium;
  }
  &__table-container {
    position: relative;
    &::before {
      content: '';
      display: block;
      width: v-bind(leftDividerWidth);
      background-image: linear-gradient(to left, rgba(0, 0, 0, .0) 0%, #dadce0 100%);
      position: absolute;
      left: var(--fixed-column-min-width);
      top: 0;
      bottom: 0;
      pointer-events: none;
    }
    &::after {
      content: '';
      display: block;
      width: v-bind(rightDividerWidth);
      max-width: 2.25rem;
      height: 100%;
      background-image: linear-gradient(to right, rgba(255,255,255,0) 0%, #fff 100%);
      position: absolute;
      right: 0;
      top: 0;
      pointer-events: none;
    }
  }
  &__table-wrapper {
    overflow-x: auto;
  }
  &__table {
    width: 100%;
    @include for-tablet-portrait-down {
      font-size: 0.875rem;
    }
  }
  &__table-header {
    background-color: $color--neutral-50;
    font-size: 0.75rem;
    font-weight: $font-weight--medium;
    th {
      height: 2rem;
      padding: 0 0.75rem;
      &.header-placeholder {
        @include resize-observer;
      }
      &.position {
        align-content: center;
        min-width: var(--fixed-column-min-width);
        width: v-bind(teamDataWidth);
        background-color: $color--neutral-50;
        text-align: left;
        position: absolute;
        left: 0;
      }
      &.points {
        font-weight: $font-weight--semibold;
      }
      &.recent-matches {
        width: 6.5rem;
      }
      span.mobile {
        @include for-desktop-up {
          display: none;
        }
      }
      span.desktop {
        @include for-desktop-down {
          display: none;
        }
      }
    }
  }
  &__table-row {
    --row-bg-color: #{$color--white};
    background-color: var(--row-bg-color);
    border: 1px solid $color--neutral-300;
    border-width: 1px 0 1px 0;
    cursor: pointer;
    &:not(.tournament-standings-move) {
      transition: background-color $transition--fastest ease-in;
    }
    &:hover {
      --row-bg-color: #{$color--neutral-200};
    }
    &[data-highlight="true"] {
      --row-bg-color: #{$color--neutral-100};
    }
    td {
      height: 2.9375rem;
      padding: 0 0.75rem;
      text-align: center;
      &.resize-observer {
        @include resize-observer;
        padding: 0;
      }
      &.position {
        min-width: var(--fixed-column-min-width);
        width: v-bind(teamDataWidth);
        padding: 0;
        position: absolute;
        left: 0;
      }
      &.points {
        color: $color--text-strong;
        font-weight: $font-weight--semibold;
      }
    }
  }
}
</style>
