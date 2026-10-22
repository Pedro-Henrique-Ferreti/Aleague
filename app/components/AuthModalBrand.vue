<template>
  <aside class="auth-brand">
    <AppLogo />
    <div>
      <p class="text-2xl font-semibold tracking-tight text-balance">
        Seu campeonato, do sorteio ao campeão.
      </p>
      <p class="mt-0.5 text-sm leading-relaxed text-base-content/70">
        Monte as fases, sorteie os confrontos, simule as rodadas e acompanhe a classificação
        atualizando a cada partida.
      </p>
    </div>
    <div class="rounded-xl border border-base-300 bg-base-100 p-0.75 shadow-sm">
      <div class="flex items-center justify-between">
        <span class="text-xs font-semibold">Grupo A</span>
        <span class="badge badge-ghost badge-xs">Rodada 12</span>
      </div>
      <ul class="mt-0.5 space-y-0.25">
        <li
          v-for="row, index in DECORATIVE_TABLE_ROWS"
          :key="row.name"
          class="flex items-center gap-0.5 rounded-lg bg-base-200/70 px-0.5 py-0.25 text-xs"
        >
          <span class="w-0.75 text-center font-semibold text-base-content/50">
            {{ index + 1 }}
          </span>
          <img
            class="size-1 shrink-0 rounded-sm"
            :src="row.flag"
            :alt="row.name"
          >
          <span class="flex-1 truncate font-medium">{{ row.name }}</span>
          <span class="font-semibold tabular-nums">{{ row.points }}</span>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { NATIONAL_TEAMS } from '~/constants/teams/national';

const DECORATIVE_TABLE_ROWS: ReadonlyArray<Readonly<{
  name: TeamDetails['name'];
  flag: TeamDetails['badge'];
  points: number;
}>> = [
  { name: NATIONAL_TEAMS.BRAZIL.name, flag: NATIONAL_TEAMS.BRAZIL.badge, points: 30 },
  { name: NATIONAL_TEAMS.ITALY.name, flag: NATIONAL_TEAMS.ITALY.badge, points: 25 },
  { name: NATIONAL_TEAMS.NORWAY.name, flag: NATIONAL_TEAMS.NORWAY.badge, points: 23 },
  { name: NATIONAL_TEAMS.URUGUAY.name, flag: NATIONAL_TEAMS.URUGUAY.badge, points: 20 },
  { name: NATIONAL_TEAMS.PORTUGAL.name, flag: NATIONAL_TEAMS.PORTUGAL.badge, points: 19 },
];
</script>

<style scoped>
@reference '@/assets/css/main.css';

.auth-brand {
  @apply hidden flex-col justify-between gap-1.5 border-base-300 bg-primary/5 p-2.5 tablet-lg:flex tablet-lg:border-r;

  background-image: radial-gradient(ellipse 120% 80% at 0% 0%, color-mix(in oklab, var(--color-primary) 12%, transparent), transparent 70%);
}
</style>
