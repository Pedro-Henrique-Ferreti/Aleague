<template>
  <section class="flex justify-center">
    <div class="animate-fade text-center">
      <h1 class="text-4xl leading-[1.1] font-semibold tracking-tight tablet:text-5xl">
        Bem-vindo ao <span class="text-primary">Aleague</span>
      </h1>
      <p class="mt-1 max-w-xs text-base leading-relaxed text-base-content/70">
        Com o Aleague, você controla todas as etapas de seu campeonato: monte as fases,
        sorteie os confrontos, simule as rodadas e acompanhe a classificação
        atualizando a cada partida. Tudo pelo navegador, sem depender de planilha ou papel.
      </p>
      <div class="grid gap-0.75 mt-1.75 max-w-xs tablet:grid-cols-2">
        <CreateFileModal class="btn-primary" />
        <ImportFileButton
          class="btn-outline border-gray-300"
          :show-not-imported-files-dialog="false"
        />
      </div>
      <ul class="mt-1.5 flex flex-wrap justify-center gap-x-1.25 gap-y-0.5 text-xs font-medium text-base-content/60">
        <li class="flex items-center gap-0.25">
          <IconCheck class="size-1.25 text-success" />
          Não é necessário cadastro
        </li>
        <li class="flex items-center gap-0.25">
          <IconCheck class="size-1.25 text-success" />
          Funciona offline
        </li>
        <li class="flex items-center gap-0.25">
          <IconCheck class="size-1.25 text-success" />
          Seus dados ficam com você
        </li>
      </ul>
      <div class="mt-1.5 flex items-center justify-center gap-0.75">
        <div class="flex -space-x-0.5">
          <img
            v-for="flag in COUNTRY_FLAGS"
            :key="flag"
            class="size-1.5 rounded-full border-2 border-base-100"
            alt=""
            :src="flag"
          >
        </div>
        <p class="text-xs text-base-content/60">
          Equipes de <span class="font-medium text-base-content">37 países</span> para escolher
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { IconCheck } from '@tabler/icons-vue';
import { NATIONAL_TEAMS } from '~/features/teams/constants/team-lists/national';

const COUNTRY_FLAGS = [
  NATIONAL_TEAMS.BRAZIL.badge,
  NATIONAL_TEAMS.ARGENTINA.badge,
  NATIONAL_TEAMS.SPAIN.badge,
  NATIONAL_TEAMS.GERMANY.badge,
  NATIONAL_TEAMS.FRANCE.badge,
  NATIONAL_TEAMS.ITALY.badge,
  NATIONAL_TEAMS.PORTUGAL.badge,
  NATIONAL_TEAMS.ENGLAND.badge,
  NATIONAL_TEAMS.URUGUAY.badge,
] as const;
</script>
