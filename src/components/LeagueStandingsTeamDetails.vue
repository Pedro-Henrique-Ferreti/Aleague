<template>
  <tr>
    <td colspan="16">
      <div class="team-details">
        <p class="team-details__title | text-darken">
          {{ name }}
        </p>
        <ul class="team-details__statistics-list">
          <li class="team-details__statistics-list-title">
            <span class="text-darken font-semibold">
              {{ homeGames.length }}
            </span> Jogos mandante:
          </li>
          <li>
            <span class="text-success font-semibold">
              {{ homeStatistics.wins }}
            </span> Vitórias
          </li>
          <li>
            <span class="text-secondary-lighten font-semibold">
              {{ homeStatistics.draws }}
            </span> Empates
          </li>
          <li>
            <span class="text-danger font-semibold">
              {{ homeStatistics.losses }}
            </span> Derrotas
          </li>
          <li class="team-details__statistics-list-title">
            <span class="text-darken font-semibold">
              {{ awayGames.length }}
            </span> Jogos visitante:
          </li>
          <li>
            <span class="text-success font-semibold">
              {{ awayStatistics.wins }}
            </span> Vitórias
          </li>
          <li>
            <span class="text-secondary-lighten font-semibold">
              {{ awayStatistics.draws }}
            </span> Empates
          </li>
          <li>
            <span class="text-danger font-semibold">
              {{ awayStatistics.losses }}
            </span> Derrotas
          </li>
        </ul>
        <p class="team-details__heading">
          Sequência no campeonato
        </p>
        <div class="team-details__matches-list">
          <LeagueStandingsRecentGame
            v-for="game in games"
            :key="game.id"
            :game="game"
            :team-id="id"
          />
        </div>
      </div>
    </td>
  </tr>
</template>

<script lang="ts" setup>
import type { LeagueGame } from '@/types/League';
import { inject, computed } from 'vue';
import { KEY_LEAGUE } from '@/constants/injectionKeys';
import LeagueStandingsRecentGame from './LeagueStandingsRecentGame.vue';

// Injected values
const league = inject(KEY_LEAGUE);

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    default: '',
  },
});

const games = computed(() => {
  if (!league) {
    return [];
  }

  let leagueGames: LeagueGame[] = [];

  league.value.gameweeks.forEach(({ games }) => {
    leagueGames = [...leagueGames, ...games];
  });

  return leagueGames.filter(({ homeTeam, awayTeam, homeTeamScore, awayTeamScore }) => (
    [homeTeam.id, awayTeam.id].includes(props.id)
    && homeTeamScore !== null
    && awayTeamScore !== null
  ));
});

const homeGames = computed(() => games.value.filter(({ homeTeam: { id } }) => id === props.id));
const awayGames = computed(() => games.value.filter(({ awayTeam: { id } }) => id === props.id));

const homeStatistics = computed(() => getGameStatistics(homeGames.value));

const awayStatistics = computed(() => {
  const { wins, draws, losses } = getGameStatistics(awayGames.value);

  return {
    draws,
    wins: losses,
    losses: wins,
  };
});

function getGameStatistics(games: LeagueGame[]) {
  let wins = 0;
  let draws = 0;
  let losses = 0;

  games.forEach(({ homeTeamScore, awayTeamScore }) => {
    if (homeTeamScore > awayTeamScore) wins += 1;
    else if (homeTeamScore === awayTeamScore) draws += 1;
    else losses += 1;
  });

  return { wins, losses, draws };
}
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
  }
}
</style>
