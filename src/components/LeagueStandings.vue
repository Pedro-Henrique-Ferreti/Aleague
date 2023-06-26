<template>
  <div class="league-standings">
    <span class="league-standings__heading">
      Tabela
    </span>
    <table class="league-standings-table text-center">
      <thead class="table-head">
        <tr>
          <th
            class="text-left"
            colspan="3"
          >
            Posição
          </th>
          <th>
            <span class="th-full">Pontos</span>
            <span class="th-abbreviation">P</span>
          </th>
          <th>
            <span class="th-full">Jogos</span>
            <span class="th-abbreviation">J</span>
          </th>
          <th>
            <span class="th-full">Vitórias</span>
            <span class="th-abbreviation">V</span>
          </th>
          <th>
            <span class="th-full">Empates</span>
            <span class="th-abbreviation">E</span>
          </th>
          <th>
            <span class="th-full">Derrotas</span>
            <span class="th-abbreviation">D</span>
          </th>
          <th class="hide-tablet-landscape">
            GP
          </th>
          <th class="hide-tablet-landscape">
            GC
          </th>
          <th>SG</th>
          <th class="hide-tablet-landscape">
            %
          </th>
          <th class="hide-mobile">
            Recentes
          </th>
        </tr>
      </thead>
      <TransitionGroup
        :name="transitionName"
        tag="tbody"
        class="table-body"
      >
        <template
          v-for="(standing, index) in leagueStandings"
          :key="standing.teamId"
        >
          <tr
            class="table-row"
            :class="{ 'expanded': expandedRowId === standing.teamId }"
          >
            <LeagueStandingsButtonExpand
              :expanded="expandedRowId === standing.teamId"
              @click="setExpandedRow(standing.teamId)"
            />
            <td
              class="position"
              :class="getPositionClass(index + 1)"
            >
              {{ index + 1 }}
            </td>
            <td class="team">
              <div class="team__content">
                <span>{{ standing.teamName }}</span>
                <span
                  v-text="(standing.movement) ? standing.movement : ''"
                  class="movement | hide-mobile"
                  :class="getMovementClass(standing.movement)"
                />
              </div>
            </td>
            <td class="points">
              {{ standing.points }}
            </td>
            <td>{{ standing.gamesPlayed }}</td>
            <td>{{ standing.gamesWon }}</td>
            <td>{{ standing.gamesTied }}</td>
            <td>{{ standing.gamesLost }}</td>
            <td class="hide-tablet-landscape">
              {{ standing.goalsFor }}
            </td>
            <td class="hide-tablet-landscape">
              {{ standing.goalsAgainst }}
            </td>
            <td>{{ standing.goalDifference }}</td>
            <td class="hide-tablet-landscape">
              {{ getPercentage(standing.points, standing.gamesPlayed) }}%
            </td>
            <td class="recent-games hide-mobile text-left">
              <div class="recent-games__content">
                <LeagueStandingsRecentGame
                  v-for="game in [...standing.recentGames].reverse()"
                  :key="game.id"
                  :game="game"
                  :team-id="standing.teamId"
                />
              </div>
            </td>
          </tr>
          <LeagueStandingsTeamDetails
            :show="expandedRowId === standing.teamId"
            :id="standing.teamId"
            :name="standing.teamName"
            :standings-length="leagueStandings.length"
            :statistics="getStatisticsByTeamId(standing.teamId)"
            :get-statistics-fn="getStatistics"
          />
        </template>
      </TransitionGroup>
    </table>
  </div>
</template>

<script lang="ts" setup>
import type { LeagueStandingMovement, LeagueTeamStatistics } from '@/types/League';
import { computed, inject, ref, watch } from 'vue';
import { useLeaguesStore } from '@/stores/leaguesStore';
import { KEY_LEAGUE } from '@/constants/injectionKeys';
import { sortStandings } from '@/helpers/standings';
import LeagueStandingsRecentGame from './LeagueStandingsRecentGame.vue';
import LeagueStandingsButtonExpand from './LeagueStandingsButtonExpand.vue';
import LeagueStandingsTeamDetails from './LeagueStandingsTeamDetails.vue';

const { getTeamStatistics } = useLeaguesStore();

// Injected values
const league = inject(KEY_LEAGUE);

// League standings
const leagueStandings = computed(() => {
  if (!league || !league.value.standings) {
    return [];
  }
  return [...league.value.standings].sort(sortStandings);
});

// Team statistics
const teamStatistics = ref<{ teamId: string; statistics: LeagueTeamStatistics }[]>([]);

async function getStatistics(teamId: string) {
  const statistics = await getTeamStatistics({
    leagueId: league?.value.id || '',
    teamId,
  });

  teamStatistics.value.push({ teamId, statistics });
}

function getStatisticsByTeamId(id: string) {
  return teamStatistics.value.find(({ teamId }) => teamId === id)?.statistics;
}

watch(() => league?.value.standings, () => {
  teamStatistics.value = [];
}, { deep: true });

// Transition
const transitionName = ref<'standings' | ''>('standings');

watch(() => leagueStandings.value, () => {
  transitionName.value = 'standings';
}, { deep: true });

// League table
const expandedRowId = ref<string | null>(null);

function setExpandedRow(rowId: string) {
  transitionName.value = '';

  (expandedRowId.value === rowId)
    ? expandedRowId.value = null
    : expandedRowId.value = rowId;
}

function getPositionClass(position: number) {
  const length = leagueStandings.value.length;

  if (position === 1 || (length === 20 && position <= 4)) {
    return 'promotion';
  }

  if (length === 20 && position >= 17) {
    return 'relegation';
  }
}

function getMovementClass(movement: LeagueStandingMovement) {
  return {
    up: movement && movement > 0,
    none: !movement,
    down: movement && movement < 0,
  };
}

function getPercentage(points: number, gamesPlayed: number) {
  if (gamesPlayed === 0) return 0;

  return Math.floor((points / (gamesPlayed * 3)) * 100);
}
</script>

<style lang="scss" scoped>
.league-standings {
  &__heading {
    display: flex;
    align-items: flex-end;
    height: 2.75rem;
    margin-bottom: 1rem;
    font-size: 1.25rem;
    font-weight: $font-weight--semibold;
    @include for-desktop-down {
      display: none;
    }
  }
}
.league-standings-table {
  --padding: 0.875rem;
  --row-height: 2.5rem;
  --cell-spacing: 0.25rem;
  --position-width: 2rem;
  --team-width: 25%;

  width: 100%;
  border-collapse: initial;
  .table-head {
    background-color: $color--light-gray-2;
  }
  th {
    padding: 0.5rem var(--cell-spacing);
    font-size: 0.875rem;
    font-weight: $font-weight--semibold;
    &:first-child {
      padding-left: var(--padding);
      border-radius: 0.5rem 0 0 0.5rem;
    }
    &:last-child {
      padding-right: var(--padding);
      border-radius: 0 0.5rem 0.5rem 0;
    }
  }
  .th-full {
    display: none;
  }
  .table-body {
    position: relative;
    &::before {
      content: '';
      display: block;
      height: 0.5rem;
    }
    &::after {
      content: '';
      display: block;
      width: 1px;
      background-color: $color--light-gray-1;
      position: absolute;
      top: -0.4rem;
      bottom: 0;
      right: 0;
    }
  }
  .table-row {
    --border-color: #{$color--light-gray-1};
    &.expanded {
      --border-color: transparent;
    }
    > td {
      height: var(--row-height);
      padding: var(--cell-spacing);
      border-bottom: 1px solid var(--border-color);
      &:last-child {
        padding-right: var(--padding);
      }
      &:not(.team, .position) {
        font-size: 0.9rem;
      }
    }
  }
  .position {
    width: var(--position-width);
    color: $color--text-lighten;
    font-weight: $font-weight--semibold;
    &.promotion {
      color: $color--success-600;
    }
    &.relegation {
      color: $color--danger;
    }
  }
  .team {
    width: var(--team-width);
    text-align: left;
    &__content {
      display: flex;
      gap: 0.5rem;
      justify-content: space-between;
      align-items: center;
    }
    .movement {
      display: flex;
      gap: 0.25rem;
      align-items: center;
      font-size: 0.75rem;
      font-weight: $font-weight--medium;
      &::after {
        content: '';
        display: block;
        width: 0.3rem;
        height: 0.3rem;
      }
      &.up::after {
        border: 4px solid transparent;
        border-bottom-color: #3AE374;
        transform: translateY(-0.125rem);
      }
      &.down::after {
        border: 4px solid transparent;
        border-top-color: $color--danger;
        transform: translateY(0.125rem);
      }
      &.none::after {
        background-color: $color--text-lighten;
        border-radius: 50%;
      }
    }
  }
  .points {
    color: $color--text-darken;
    font-weight: $font-weight--semibold;
  }
  .recent-games {
    width: 8.5rem;
    &__content {
      display: inline-flex;
      gap: 0.25rem;
    }
  }
  @include for-tablet-portrait-up {
    min-width: 12rem;
  }
  @include for-large-tablet-portrait-down {
    font-size: 0.875rem;
  }
  @include for-large-tablet-portrait-up {
    --row-height: 2.75rem;
    --cell-spacing: 0.375rem;
    --team-width: 30%;
    .th-abbreviation {
      display: none;
    }
    .th-full {
      display: block;
    }
  }
  @include for-tablet-landscape-down {
    .hide-tablet-landscape {
      display: none;
    }
  }
  @include for-desktop-down {
    .hide-mobile {
      display: none;
    }
  }
}
</style>
