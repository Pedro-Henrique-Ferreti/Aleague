<template>
  <AppModal
    v-model:is-open="modalIsOpen"
    title="Sortear partidas"
    size="xl"
    :submit-button-label="seedingDraw.isStepActive.value.POTS ? 'Próximo' : 'Concluir'"
    :submit-button-disabled="submitButtonDisabled"
    @open="seedingDraw.reset"
    @submit="handleSubmit"
  >
    <AppAlert
      v-if="!isRoundSeeded"
      class="mb-2"
      message="Esta rodada possui vagas em aberto. Preencha todas as vagas antes de realizar o sorteio."
      type="warning"
    />
    <DrawPots
      v-if="seedingDraw.isStepActive.value.POTS"
      v-model="seedingDraw.pots.value"
      :seeding-draw="seedingDraw"
      :disabled="!isRoundSeeded"
    />
    <DrawProcedure
      v-else-if="seedingDraw.isStepActive.value.PROCEDURE"
      :seeding-draw="seedingDraw"
    />
  </AppModal>
</template>

<script lang="ts" setup>
import { isPlayoffRoundSeeded, replacePlayoffRoundTeams } from '~/helpers/playoff-round';

const stageStore = useStageStore();

const modalIsOpen = defineModel<boolean>('is-open');
const round = defineModel<PlayoffRound>('round', { required: true });

const isRoundSeeded = computed(() => isPlayoffRoundSeeded(round.value));

const roundTeams = computed(() => {
  return round.value.slots.flatMap(s => [s.legs[0].homeTeam.id, s.legs[0].awayTeam.id]).filter(team => team !== null);
});

const seedingDraw = useSeedingDraw(roundTeams, round.value);

const submitButtonDisabled = computed(() => (
  !isRoundSeeded.value
  || (seedingDraw.isStepActive.value.POTS && !seedingDraw.isPotsStepCompleted.value)
  || (seedingDraw.isStepActive.value.PROCEDURE && !seedingDraw.isProcedureStepCompleted.value)
));

function handleSubmit() {
  if (seedingDraw.isStepActive.value.POTS) {
    seedingDraw.nextStep();
  } else {
    replacePlayoffRoundTeams(
      round.value,
      { groups: Object.values(seedingDraw.procedureForm.value.groups) },
      stageStore.activePlayoffStage,
    );

    modalIsOpen.value = false;
  }
}
</script>
