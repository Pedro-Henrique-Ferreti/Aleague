<template>
  <section>
    <header class="max-w-xs">
      <p class="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
        Recursos
      </p>
      <h2 class="mt-0.5 text-3xl font-semibold tracking-tight tablet:text-4xl">
        Tudo o que um campeonato precisa
      </h2>
      <p class="mt-0.75 text-base leading-relaxed text-base-content/70">
        Cada detalhe existe para você controlar e compartilhar seus campeonatos do modo que desejar — sem depender de planilha ou papel.
      </p>
    </header>
    <div class="mt-2.5 grid gap-1 tablet:grid-cols-2 tablet-lg:grid-cols-3">
      <article
        v-for="feature, index in APP_FEATURES"
        :key="index"
        class="card card-border transition-shadow hover:border-primary/60 hover:shadow-lg"
      >
        <div class="card-body gap-0 p-1.25">
          <span class="flex size-2.5 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <component
              :is="feature.icon"
              class="size-1.25"
            />
          </span>
          <h3 class="mt-0.75 text-base font-semibold">
            {{ feature.title }}
          </h3>
          <p class="mt-0.25 text-sm leading-relaxed text-base-content/70">
            {{ feature.description }}
          </p>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { type Icon, IconBowl, IconFolder, IconTable, IconTournament, IconWand, IconWorld } from '@tabler/icons-vue';

interface AppFeature {
  icon: Icon;
  title: string;
  description: string;
}

const APP_FEATURES: ReadonlyArray<Readonly<AppFeature>> = [
  {
    icon: IconTournament,
    title: 'Fase de grupos e eliminatórias',
    description: 'Organize seu campeonato livremente com fase de grupos ou eliminatórias.',
  },
  {
    icon: IconBowl,
    title: 'Sorteio por pote',
    description: 'O sorteio distribui as equipes na hora — ou preencha cada grupo e partida manualmente, como quiser.',
  },
  {
    icon: IconWand,
    title: 'Simulação instantânea',
    description: 'Simule partidas, rodadas, ou até mesmo campeonatos inteiros: resultados e classificação se atualizam automaticamente.',
  },
  {
    icon: IconTable,
    title: 'Classificação completa',
    description: 'Pontos, vitórias, empates, saldo de gols e a forma recente de cada equipe, com legendas customizáveis.',
  },
  {
    icon: IconFolder,
    title: 'Coleções e arquivos',
    description: 'Organize seus campeonatos em coleções, salve-os em seu computador ou compartilhe-os com amigos.',
  },
  {
    icon: IconWorld,
    title: 'Equipes do mundo inteiro',
    description: 'Times de dezenas de ligas e seleções, com escudo e bandeira de cada país.',
  },
];
</script>
