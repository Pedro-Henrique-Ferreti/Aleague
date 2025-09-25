<template>
  <header class="grid gap-1 mb-2 tablet-lg:grid-cols-[2fr_1fr] desktop:grid-cols-2">
    <TournamentProfileCard :tournament="tournament" />
    <div
      v-if="tournament.stages.length > 0 && roundId !== undefined"
      class="flex justify-end gap-1"
    >
      <TournamentStageModal :tournament="tournament" />
      <DeleteStageButton :stage-id="roundId" />
    </div>
  </header>
  <div
    v-if="tournament.stages.length === 0"
    class="flex flex-col items-center justify-center min-h-10 pt-4"
  >
    <h1 class="text-xl font-semibold mb-0.5">Nenhuma fase</h1>
    <p>Adicione uma fase ao campeonato clicando no botão abaixo.</p>
    <TournamentStageModal
      class="btn-wide mt-2"
      :tournament="tournament"
    />
  </div>
  <template v-else>
    <TournamentStageControls
      v-if="showStageControls"
      v-model="roundId"
      :stages="tournament.stages"
    />
    <template v-for="stage in tournament.stages">
      <TournamentGroups
        v-if="stage.type === TournamentStageType.GROUPS && stage.id === roundId"
        :model-value="stage"
      />
      <TournamentPlayoffs
        v-else-if="stage.type === TournamentStageType.PLAYOFFS && stage.id === roundId"
        :model-value="stage"
      />
    </template>
  </template>
</template>

<script setup lang="ts">
const props = defineProps<{
  tournament: Tournament;
}>();

const roundId = ref(props.tournament.stages[0]?.id);

watch(() => props.tournament.stages.length, (length) => {
  if (length === 0) {
    roundId.value = undefined;
    return;
  }

  roundId.value = props.tournament.stages[props.tournament.stages.length - 1]?.id;
});

const showStageControls = computed(() => (
  props.tournament.stages.length > 1 || props.tournament.stages[0]?.type === TournamentStageType.PLAYOFFS
));
</script>
