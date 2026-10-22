<template>
  <div class="relative mx-auto w-full max-w-24 rounded-2xl border border-base-300 bg-base-100 p-1 shadow-xl">
    <div class="badge badge-lg absolute top-0 -left-1 translate-y-[-50%] rounded-xl shadow-lg animate-float">
      <IconTrophy class="size-1 text-primary" />
      <span class="text-xs font-medium">Campeão definido</span>
    </div>
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-0.25">
        <span class="size-0.5 rounded-full bg-error/60" />
        <span class="size-0.5 rounded-full bg-warning/60" />
        <span class="size-0.5 rounded-full bg-success/60" />
      </div>
      <span class="badge badge-ghost badge-sm gap-0.25">
        <IconTrophy class="size-0.75" />
        Copa do Mundo
      </span>
    </div>
    <div class="mt-1 flex items-baseline justify-between">
      <p class="text-sm font-semibold">
        Fase de grupos · Geral
      </p>
      <span class="text-xs text-base-content/60">Rodada 5 de 6</span>
    </div>
    <ul class="mt-0.5 space-y-0.25">
      <li
        v-for="row, index in DECORATIVE_TABLE_ROWS"
        :key="row.name"
        class="flex items-center gap-0.5 rounded-xl border border-base-200 px-0.5 py-0.25 text-xs"
      >
        <span class="w-0.75 text-center font-semibold text-base-content/60">
          {{ index + 1 }}
        </span>
        <img
          class="size-1 shrink-0"
          :src="row.flag"
          :alt="row.name"
        >
        <span class="flex-1 font-medium">{{ row.name }}</span>
        <span class="text-right font-semibold tabular-nums">{{ row.points }}</span>
      </li>
    </ul>
    <div class="mt-0.75 flex items-center justify-between rounded-lg bg-base-200/70 px-0.75 py-0.5 text-xs">
      <span class="flex items-center gap-0.5 text-base-content/60">
        <IconWand class="size-1.25 text-primary" />
        Rodada simulada
      </span>
      <span class="font-medium">Próxima: Rodada 6</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconTrophy, IconWand } from '@tabler/icons-vue';
import { NATIONAL_TEAMS } from '~/constants/teams/national';

const DECORATIVE_TABLE_ROWS: ReadonlyArray<Readonly<{
  name: TeamDetails['name'];
  flag: TeamDetails['badge'];
  points: number;
}>> = [
  { name: NATIONAL_TEAMS.BRAZIL.name, flag: NATIONAL_TEAMS.BRAZIL.badge, points: 15 },
  { name: NATIONAL_TEAMS.FRANCE.name, flag: NATIONAL_TEAMS.FRANCE.badge, points: 13 },
  { name: NATIONAL_TEAMS.ARGENTINA.name, flag: NATIONAL_TEAMS.ARGENTINA.badge, points: 12 },
  { name: NATIONAL_TEAMS.SPAIN.name, flag: NATIONAL_TEAMS.SPAIN.badge, points: 11 },
  { name: NATIONAL_TEAMS.GERMANY.name, flag: NATIONAL_TEAMS.GERMANY.badge, points: 9 },
];
</script>
