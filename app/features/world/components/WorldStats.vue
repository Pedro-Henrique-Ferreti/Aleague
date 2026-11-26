<template>
  <div class="stats stats-vertical tablet-xl:stats-horizontal card-border border border-base-300 w-full mb-2">
    <div class="stat">
      <div class="stat-figure text-primary">
        <IconCalendarStats class="size-2" />
      </div>
      <div class="stat-title">Temporadas jogadas</div>
      <div class="stat-value text-primary">{{ world.seasonsPlayed }}</div>
      <div class="stat-desc">Temporada atual: {{ world.season.label }}</div>
    </div>
    <div class="stat">
      <div class="stat-figure text-secondary">
        <IconTrophy class="size-2" />
      </div>
      <div class="stat-title">Competições</div>
      <div class="stat-value">{{ world.competitions.length }}</div>
      <div class="stat-desc">{{ leaguesCount }} {{ leaguesCount === 1 ? 'liga' : 'ligas' }} · {{ cupsCount }} {{ cupsCount === 1 ? 'copa' : 'copas' }}</div>
    </div>
    <div class="stat">
      <div class="stat-figure text-secondary">
        <IconUsersGroup class="size-2" />
      </div>
      <div class="stat-title">Equipes</div>
      <div class="stat-value">{{ world.teamsCount }}</div>
      <div class="stat-desc">{{ tournamentsCount }} campeonatos nesta temporada</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconCalendarStats, IconTrophy, IconUsersGroup } from '@tabler/icons-vue';

const props = defineProps<{
  world: WorldOverview;
}>();

const leaguesCount = computed(() => props.world.competitions.filter(c => c.type === 'league').length);
const cupsCount = computed(() => props.world.competitions.filter(c => c.type === 'cup').length);
const tournamentsCount = computed(() => props.world.competitions.reduce((total, c) => total + c.tournaments.length, 0));
</script>
