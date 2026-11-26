<template>
  <section class="card card-border mb-3">
    <div class="card-body gap-1.5">
      <header class="flex flex-wrap items-center justify-between gap-1">
        <div class="flex items-center gap-1">
          <h2 class="card-title text-xl">Temporada {{ season.label }}</h2>
          <AppBadge
            class="badge-soft badge-sm"
            :class="stateBadge.class"
            :icon="stateBadge.icon"
            :text="stateBadge.label"
          />
        </div>
        <div class="flex items-center gap-0.75">
          <template v-if="season.state === SeasonState.SETUP">
            <AppButton
              class="btn-primary btn-sm"
              label="Configurar temporada"
              :icon-left="IconSettings2"
            />
          </template>
          <template v-else-if="season.state === SeasonState.IN_PLAY">
            <AppButton
              class="btn-soft btn-sm"
              label="Simular restante"
              :icon-left="IconPlayerTrackNext"
            />
          </template>
          <template v-else>
            <AppButton
              class="btn-primary btn-sm"
              :label="`Avançar para ${season.nextLabel}`"
              :disabled="season.blockingIssues > 0"
              :icon-right="IconArrowRight"
            />
          </template>
        </div>
      </header>

      <ul class="steps w-full">
        <li
          v-for="step in steps"
          :key="step.state"
          class="step"
          :class="{ 'step-primary': step.reached }"
          :data-content="step.reached ? '✓' : undefined"
        >
          {{ step.label }}
        </li>
      </ul>

      <div v-if="season.state === SeasonState.SETUP">
        <div class="flex justify-between text-sm mb-0.5">
          <span>Campeonatos prontos para começar</span>
          <span class="font-medium">{{ readyCount }} de {{ tournaments.length }}</span>
        </div>
        <AppProgress
          color="primary"
          :value="percentage(readyCount, tournaments.length)"
        />
        <AppAlert
          class="mt-1.5"
          message="Preencha as equipes e sorteie a primeira fase de cada campeonato. Quando todos estiverem prontos, inicie a temporada."
          soft
        />
      </div>

      <div v-else-if="season.state === SeasonState.IN_PLAY">
        <div class="flex justify-between text-sm mb-0.5">
          <span>Partidas disputadas</span>
          <span class="font-medium">
            {{ formatNumber(playedMatches) }} de {{ formatNumber(totalMatches) }}
            <span class="text-base-content/70">({{ percentage(playedMatches, totalMatches) }}%)</span>
          </span>
        </div>
        <AppProgress
          color="primary"
          :value="percentage(playedMatches, totalMatches)"
        />
        <p class="text-xs text-base-content/70 mt-0.5">
          {{ finishedCount }} de {{ tournaments.length }} campeonatos finalizados.
        </p>
      </div>

      <div v-else>
        <AppAlert
          v-if="season.blockingIssues"
          type="warning"
          soft
        >
          <p>
            {{ season.blockingIssues }} {{ season.blockingIssues === 1 ? 'problema impede' : 'problemas impedem' }}
            o avanço para {{ season.nextLabel }}. Corrija os formatos e vínculos na prévia.
          </p>
          <AppButton
            class="btn-sm btn-ghost"
            label="Ver prévia"
          />
        </AppAlert>
        <AppAlert
          v-else
          type="success"
          message="Todos os campeonatos foram concluídos. Confira os campeões abaixo e avance quando estiver pronto — a temporada será compactada."
          soft
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  IconArrowRight,
  IconCircleCheck,
  IconPlayerPlay,
  IconPlayerTrackNext,
  IconSettings2,
  IconTool,
} from '@tabler/icons-vue';

const props = defineProps<{
  season: WorldSeasonSummary;
  competitions: WorldCompetitionSummary[];
}>();

const STATE_ORDER = [SeasonState.SETUP, SeasonState.IN_PLAY, SeasonState.FINISHED];

const steps = computed(() => {
  const currentIndex = STATE_ORDER.indexOf(props.season.state);
  return [
    { state: SeasonState.SETUP, label: 'Configuração' },
    { state: SeasonState.IN_PLAY, label: 'Em andamento' },
    { state: SeasonState.FINISHED, label: 'Finalizada' },
  ].map((step, index) => ({ ...step, reached: index <= currentIndex }));
});

const stateBadge = computed(() => ({
  [SeasonState.SETUP]: { label: 'Configuração', class: 'badge-warning', icon: IconTool },
  [SeasonState.IN_PLAY]: { label: 'Em andamento', class: 'badge-primary', icon: IconPlayerPlay },
  [SeasonState.FINISHED]: { label: 'Finalizada', class: 'badge-success', icon: IconCircleCheck },
}[props.season.state]));

const tournaments = computed(() => props.competitions.flatMap(c => c.tournaments));
const readyCount = computed(() => tournaments.value.filter(t => t.isReady).length);
const finishedCount = computed(() => tournaments.value.filter(t => t.champion).length);
const playedMatches = computed(() => tournaments.value.reduce((sum, t) => sum + (t.matches?.played ?? 0), 0));
const totalMatches = computed(() => tournaments.value.reduce((sum, t) => sum + (t.matches?.total ?? 0), 0));

function percentage(value: number, total: number) {
  return total ? Math.round((value / total) * 100) : 0;
}

function formatNumber(value: number) {
  return value.toLocaleString('pt-BR');
}
</script>
