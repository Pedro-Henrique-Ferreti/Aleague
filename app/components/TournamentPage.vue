<template>
  <div class="grid gap-1 mb-2 tablet-lg:grid-cols-[2fr_1fr] desktop:grid-cols-2">
    <TournamentProfileCard :tournament="tournament" />
    <TournamentPageControls
      v-if="activeStage"
      :active-stage="activeStage"
    />
  </div>
  <div
    v-if="tournament.stages.length === 0"
    class="max-w-44 min-h-10 mt-4 mx-auto card card-border"
  >
    <div class="card-body text-center">
      <h1 class="text-xl font-semibold mb-0.5">Nenhuma fase</h1>
      <p>Adicione uma fase ao campeonato clicando no botão abaixo.</p>
      <TournamentStageModal v-slot="{ open }">
        <AppButton
          class="btn-primary btn-soft btn-wide mt-2 mx-auto"
          label="Adicionar"
          :icon-left="IconPlus"
          @click="open"
        />
      </TournamentStageModal>
    </div>
  </div>
  <template v-else>
    <TournamentStageControls
      ref="controls"
      :stages="tournament.stages"
    />
    <template v-for="stage, index in tournament.stages">
      <TournamentGroups
        v-if="stage.type === StageType.GROUPS && activeStage?.id === stage.id"
        v-model="(tournament.stages[index] as TournamentGroupsStage)"
      />
      <TournamentPlayoffs
        v-else-if="stage.type === StageType.PLAYOFFS && activeStage?.id === stage.id"
        v-model="(tournament.stages[index] as TournamentPlayoffsStage)"
        :active-round-id="controlsRef?.roundId"
      />
    </template>
  </template>
</template>

<script setup lang="ts">
import { IconPlus } from '@tabler/icons-vue';
import TournamentStageControls from './TournamentStageControls.vue';

const tournament = defineModel<Tournament>({ required: true });

const controlsRef = useTemplateRef<typeof TournamentStageControls>('controls');

const activeStage = computed(() => tournament.value.stages.find((stage) => (
  stage.id === controlsRef.value?.roundId || (
    stage.type === StageType.PLAYOFFS && stage.rounds.find((round) => round.id === controlsRef.value?.roundId)
  )
)));
</script>
