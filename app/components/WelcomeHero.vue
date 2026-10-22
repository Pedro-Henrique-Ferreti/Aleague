<template>
  <section class="grid items-center gap-4 tablet-lg:grid-cols-2 tablet-lg:gap-8">
    <div class="animate-fade">
      <span class="badge badge-primary badge-soft text-xs font-medium">
        <IconSparkles class="size-1.25" />
        Simulador de campeonatos
      </span>
      <h1 class="mt-1 text-4xl leading-[1.1] font-semibold tracking-tight tablet:text-5xl">
        Bem-vindo ao <span class="text-primary">Aleague</span>
      </h1>
      <p class="mt-0.75 text-xl font-medium text-balance text-base-content/80 tablet:text-2xl">
        Do sorteio das equipes ao campeão, em um só lugar.
      </p>
      <p class="mt-1 max-w-xs text-base leading-relaxed text-base-content/70">
        Com o Aleague, você controla seu campeonato de ponta a ponta: monte as fases,
        sorteie os confrontos, simule as rodadas e acompanhe a classificação
        atualizando a cada partida. Tudo apenas no navegador, sem depender de planilha ou papel.
      </p>
      <div class="grid gap-0.75 mt-1.75 max-w-xs tablet:grid-cols-2">
        <OpenFileButton />
        <CreateFileMenu
          class="btn-outline"
          dropdown-class="w-14"
        />
      </div>
      <p class="mt-0.75 flex gap-0.25 text-xs text-base-content/60">
        <IconInfoCircle class="mt-px size-1 shrink-0" />
        “Abrir” importa um arquivo exportado pelo Alegue. “Criar” começa um novo campeonato ou coleção.
      </p>
      <ul class="mt-1.5 flex flex-wrap gap-x-1.25 gap-y-0.5 text-xs font-medium text-base-content/60">
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
      <div class="mt-1.5 flex items-center gap-0.75">
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
    <WelcomeHeroCard />
  </section>
</template>

<script setup lang="ts">
import { IconCheck, IconInfoCircle, IconSparkles } from '@tabler/icons-vue';
import { NATIONAL_TEAMS } from '~/constants/teams/national';

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
