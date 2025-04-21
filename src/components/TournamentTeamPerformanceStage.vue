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
    <AppChart
      v-if="stagePerformance?.positionHistory?.length"
      :config="chartConfig"
    />
  </div>
</template>

<script lang="ts" setup>
import type { ChartConfiguration } from 'chart.js';
import type { TeamStagePerformance } from '@/types/Tournament';
import { MatchOutcome, type MatchTeam } from '@/types/Match';
import { computed } from 'vue';
import { getMatchOutcome } from '@/helpers/match';
import AppChart from './AppChart.vue';
import TournamentTeamRecentMatches from './TournamentTeamRecentMatches.vue';

const props = defineProps<{
  stagePerformance: TeamStagePerformance;
  team: MatchTeam;
  numberOfTeamsPerGroup?: number;
}>();

const pointBackgroundColors = computed(() => props.stagePerformance.games.map((_, index) => {
  const outcome = getMatchOutcome(props.team.id, props.stagePerformance.games[index]);
  switch (outcome) {
    case MatchOutcome.WIN:
      return '#008F62';
    case MatchOutcome.DRAW:
      return '#CCCCCC';
    case MatchOutcome.LOSS:
      return '#E73737';
    default:
      return '#FFF';
  }
}));

const chartConfig = computed<ChartConfiguration>(() => ({
  type: 'line',
  data: {
    labels: props.stagePerformance.positionHistory.map(({ gameweek }) => gameweek),
    datasets: [{
      data: props.stagePerformance.positionHistory.map(({ position }) => position),
      borderColor: '#ADADAD',
      borderWidth: 2,
      tension: 0.1,
      pointRadius: 6,
      pointBackgroundColor: pointBackgroundColors.value,
      pointBorderColor: '#FFF',
      pointHoverRadius: 6,
    }],
  },
  options: {
    responsive: true,
    clip: false,
    aspectRatio: 6.5 / 2,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        title: {
          display: true,
          text: 'Partidas',
          color: '#757575',
        },
      },
      y: {
        reverse: true,
        position: 'left',
        min: 1,
        max: props.numberOfTeamsPerGroup,
        grid: { drawTicks: false },
        ticks: { padding: 12, stepSize: 5 },
        border: { display: false },
      },
    },
    plugins: {
      tooltip: {
        displayColors: false,
        callbacks: {
          title: (tooltips) => tooltips.map(({ label }) => `Rodada ${label}`),
          label: (tooltip) => `Pos: ${tooltip.formattedValue}`,
        },
      },
    },
  },
}));
</script>

<style lang="scss" scoped>
.performance {
  display: grid;
  gap: 0.75rem;
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
