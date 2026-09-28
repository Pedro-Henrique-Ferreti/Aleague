<template>
  <AppModal
    v-model:is-open="modalIsOpen"
    title="Sortear partidas"
    size="xl"
    submit-button-label="Salvar"
    :submit-button-disabled="submitButtonDisabled"
  >
    <DrawPots
      v-model="seedingDraw.pots.value"
      :draw-participants="seedingDraw.participants.value"
    />
  </AppModal>
</template>

<script lang="ts" setup>
import { getTeamById } from '~/helpers/team';

const modalIsOpen = defineModel<boolean>('is-open');
const round = defineModel<PlayoffRound>('round', { required: true });

const seedingDraw = useSeedingDraw(
  computed(() => round.value.slots.flatMap(s => [s.legs[0].homeTeam.id, s.legs[0].awayTeam.id]).filter(team => team !== null)),
);

const submitButtonDisabled = computed(() => {
  if (seedingDraw.step.value === DrawStep.POTS) return !seedingDraw.isPotsStepCompleted.value;
  return false;
});
</script>
