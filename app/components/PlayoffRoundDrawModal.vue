<template>
  <AppModal
    v-model:is-open="modalIsOpen"
    title="Sortear partidas"
    size="xl"
    :submit-button-label="seedingDraw.isStepActive.value.POTS ? 'Próximo' : 'Concluir'"
    :submit-button-disabled="submitButtonDisabled"
    @open="seedingDraw.reset"
    @submit="seedingDraw.nextStep"
  >
    <DrawPots
      v-if="seedingDraw.isStepActive.value.POTS"
      v-model="seedingDraw.pots.value"
      :draw-participants="seedingDraw.participants.value"
    />
    <DrawProcedure
      v-else-if="seedingDraw.isStepActive.value.PROCEDURE"
      :seeding-draw="seedingDraw"
    />
  </AppModal>
</template>

<script lang="ts" setup>
const modalIsOpen = defineModel<boolean>('is-open');
const round = defineModel<PlayoffRound>('round', { required: true });

const seedingDraw = useSeedingDraw(
  computed(() => round.value.slots.flatMap(s => [s.legs[0].homeTeam.id, s.legs[0].awayTeam.id]).filter(team => team !== null)),
  round.value,
);

const submitButtonDisabled = computed(() => {
  if (seedingDraw.isStepActive.value.POTS) return !seedingDraw.isPotsStepCompleted.value;
  return false;
});
</script>
