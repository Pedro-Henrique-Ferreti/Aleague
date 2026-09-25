<template>
  <AppModal
    v-model:is-open="modalIsOpen"
    title="Sortear partidas"
    size="xl"
    submit-button-label="Salvar"
  >
    <DrawPots
      v-model="seedingDraw.pots.value"
      :draw-participants="drawParticipants"
    />
  </AppModal>
</template>

<script lang="ts" setup>
import { getTeamById } from '~/helpers/team';

const modalIsOpen = defineModel<boolean>('is-open');
const round = defineModel<PlayoffRound>('round', { required: true });

const seedingDraw = useSeedingDraw();

const drawParticipants = computed(() => {
  return round.value.slots.flatMap(
    slot => [slot.legs[0].homeTeam.id, slot.legs[0].awayTeam.id],
  ).filter(team => team !== null);
});
</script>
