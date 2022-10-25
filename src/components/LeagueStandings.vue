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
          <tr class="table-row">
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
              {{ standing.teamName }}
            </td>
            <td class="points">
              {{ standing.points }}
            </td>
            <td>{{ standing.gamesPlayed }}</td>
            <td>{{ standing.gamesWon }}</td>
            <td>{{ standing.gamesDrawn }}</td>
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
          <tr v-show="expandedRowId === standing.teamId">
            <td colspan="12">
              <span class="team-details__name">
                {{ standing.teamName }}
              </span>
            </td>
          </tr>
        </template>
      </TransitionGroup>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, ref, watch } from 'vue';
import { injectionKeys } from '@/constants/injectionKeys';
import { sortStandings } from '@/helpers/standings';
import LeagueStandingsRecentGame from './LeagueStandingsRecentGame.vue';
import LeagueStandingsButtonExpand from './LeagueStandingsButtonExpand.vue';

// Injected values
const league = inject(injectionKeys.LEAGUE);

// League standings
const leagueStandings = computed(() => {
  if (!league || !league.value.standings) {
    return [];
  }
  return [...league.value.standings].sort(sortStandings);
});

// Transition
const transitionName = ref<'standings' | ''>('standings');

watch(() => leagueStandings.value, () => {
  transitionName.value = 'standings';
}, { deep: true });

// League table
const expandedRowId = ref(0);

function setExpandedRow(rowId: number) {
  transitionName.value = '';

  (expandedRowId.value === rowId)
    ? expandedRowId.value = 0
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
  .table-row td {
    height: var(--row-height);
    padding: var(--cell-spacing);
    border-bottom: 1px solid $color--light-gray-1;
    &:last-child {
      padding-right: var(--padding);
    }
    &:not(.team, .position) {
      font-size: 0.9rem;
    }
  }
  .position {
    width: var(--position-width);
    color: $color--text-lighten;
    font-weight: $font-weight--semibold;
    &.promotion {
      color: $color--green;
    }
    &.relegation {
      color: $color--danger;
    }
  }
  .team {
    width: var(--team-width);
    text-align: left;
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
