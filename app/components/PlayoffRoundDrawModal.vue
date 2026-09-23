<template>
  <AppModal
    v-model:is-open="modalIsOpen"
    title="Sortear partidas"
    size="xl"
    submit-button-label="Salvar"
  >
    <DrawPots :draw-participants="drawParticipants" />
  </AppModal>
</template>

<script lang="ts" setup>
import { getTeamById } from '~/helpers/team';

const modalIsOpen = defineModel<boolean>('is-open');
const round = defineModel<PlayoffRound>('round', { required: true });

const drawParticipants = computed(() => {
  return round.value.slots.flatMap(
    slot => slot.legs.flatMap(m => [getTeamById(m.homeTeam.id), getTeamById(m.awayTeam.id)]),
  ).filter(team => !!team);
});
</script>
