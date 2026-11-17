<template>
  <section class="card card-border overflow-hidden">
    <div class="card-body gap-0 p-1.5 tablet:p-2">
      <p class="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
        Como funciona
      </p>
      <h2 class="mt-0.5 text-2xl font-semibold tracking-tight tablet:text-3xl">
        Três passos para começar
      </h2>
      <ol class="mt-1.5 grid gap-1.5 tablet-md:grid-cols-3 tablet-md:gap-2">
        <li
          v-for="(step, index) in STEPS"
          :key="step.title"
          class="flex gap-0.75"
        >
          <span class="flex size-2 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-content">
            {{ index + 1 }}
          </span>
          <div>
            <h3 class="text-base font-semibold">
              {{ step.title }}
            </h3>
            <p class="mt-0.25 text-sm leading-relaxed text-base-content/70">
              {{ step.description }}
            </p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Step {
  title: string;
  description: string;
}

const STEPS: ReadonlyArray<Readonly<Step>> = [
  {
    title: 'Importe ou crie',
    description: 'Abra um arquivo do Alegue ou crie um campeonato com nome e logo.',
  },
  {
    title: 'Monte as fases',
    description: 'Adicione as equipes, faça o sorteio por pote e defina rodadas, turnos e o formato da disputa.',
  },
  {
    title: 'Simule e acompanhe',
    description: 'Simule os resultados das partidas ou preencha manualmente e veja a tabela atualizar em tempo real.',
  },
];
</script>
