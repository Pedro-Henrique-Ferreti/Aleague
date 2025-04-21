<template>
  <div class="performance">
    <div class="performance__list-wrapper">
      <ul class="performance__list">
        <li data-type="matches">
          <b>{{ stagePerformance?.homeGames.played }}</b> Jogos mandante
        </li>
        <li data-type="wins">
          <b>{{ stagePerformance?.homeGames.won }}</b> Vitórias
        </li>
        <li data-type="draws">
          <b>{{ stagePerformance?.homeGames.tied }}</b> Empates
        </li>
        <li data-type="losses">
          <b>{{ stagePerformance?.homeGames.lost }}</b> Derrotas
        </li>
      </ul>
      <ul class="performance__list">
        <li data-type="matches">
          <b>{{ stagePerformance?.awayGames.played }}</b> Jogos visitante
        </li>
        <li data-type="wins">
          <b>{{ stagePerformance?.awayGames.won }}</b> Vitórias
        </li>
        <li data-type="draws">
          <b>{{ stagePerformance?.awayGames.tied }}</b> Empates
        </li>
        <li data-type="losses">
          <b>{{ stagePerformance?.awayGames.lost }}</b> Derrotas
        </li>
      </ul>
    </div>
    <div>
      <b class="performance__recent-matches-title">
        Sequência no campeonato
      </b>
      <TournamentTeamRecentMatches
        v-if="stagePerformance?.games"
        class="performance__recent-matches-list"
        :recent-games="stagePerformance.games"
        :team="team"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TeamStagePerformance } from '@/types/Tournament';
import type { MatchTeam } from '@/types/Match';
import TournamentTeamRecentMatches from './TournamentTeamRecentMatches.vue';

defineProps<{
  stagePerformance: TeamStagePerformance;
  team: MatchTeam;
}>();
</script>

<style lang="scss" scoped>
.performance {
  display: grid;
  gap: 1rem;
  &__list-wrapper {
    display: grid;
    gap: 0.25rem 0.75rem;
    grid-template-columns: 1fr 1fr;
    @include for-tablet-portrait-up {
      grid-template-columns: repeat(4, max-content);
    }
  }
  &__list {
    display: grid;
    grid-template-columns: subgrid;
    font-size: 0.875rem;
    @include for-tablet-portrait-up {
      grid-column: 1 / 5;
    }
    > li {
      &[data-type="matches"] {
        --color: #{$color--text-strong};
      }
      &[data-type="wins"] {
        --color: #{$color--success-600};
      }
      &[data-type="draws"] {
        --color: #{$color--blue-800};
      }
      &[data-type="losses"] {
        --color: #{$color--danger};
      }
      > b {
        color: var(--color);
        font-weight: $font-weight--medium;
      }
    }
  }
  &__recent-matches-title {
    display: block;
    margin-bottom: 0.5rem;
    color: $color--text-strong;
    font-size: 0.875rem;
  }
  &__recent-matches-list {
    flex-wrap: wrap;
  }
}
</style>
