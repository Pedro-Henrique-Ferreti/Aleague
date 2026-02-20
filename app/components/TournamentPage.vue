<template>
  <div class="grid gap-1 mb-2 tablet-lg:grid-cols-[2fr_1fr]">
    <TournamentProfileCard />
    <TournamentStageOptions
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
      <StageFormModal v-slot="{ openModal }">
        <AppButton
          class="btn-primary btn-soft btn-wide mt-2 mx-auto"
          label="Adicionar"
          :icon-left="IconPlus"
          @click="openModal"
        />
      </StageFormModal>
    </div>
  </div>
  <template v-else>
    <TournamentStageSelector ref="stage-selector" />
    <template v-for="stage, index in tournament.stages">
      <TournamentGroupStage
        v-if="stage.type === StageType.GROUP && activeStage?.id === stage.id"
        v-model="(tournament.stages[index] as GroupStage)"
        :key="`group-${index}`"
      />
      <TournamentPlayoffStage
        v-else-if="stage.type === StageType.PLAYOFF && activeStage?.id === stage.id"
        v-model="(tournament.stages[index] as PlayoffStage)"
        :key="index"
        :active-round-id="(stageSelector?.selectedStageOrPlayoffRoundId as PlayoffRound['id'])"
      />
    </template>
  </template>
</template>

<script setup lang="ts">
import { IconPlus } from '@tabler/icons-vue';

const tournamentStore = useTournamentStore();

const tournament = computed(() => tournamentStore.activeTournament!);

const stageSelector = useTemplateRef('stage-selector');

const activeStage = computed(() => tournament.value.stages.find((stage) => {
  if (stage.type === StageType.GROUP) {
    return stage.id === stageSelector.value?.selectedStageOrPlayoffRoundId;
  }

  return stage.rounds.some(round => round.id === stageSelector.value?.selectedStageOrPlayoffRoundId);
}));
</script>
