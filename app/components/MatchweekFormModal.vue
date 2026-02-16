<template>
  <AppModal
    title="Gerar partidas"
    :size="step === FormStep.SELECT_RULES ? undefined : 'xl'"
    :submit-button-label="step === FormStep.SELECT_RULES ? 'Próximo' : 'Confirmar'"
    @submit="onFormSubmit"
    @open="step = FormStep.SELECT_RULES"
  >
    <template #trigger="{ openModal }">
      <slot :open-modal="openModal" />
    </template>
    <MatchweekFormModalRules
      v-if="step === FormStep.SELECT_RULES"
      v-model:format="form.format"
      v-model:round-robins="form.roundRobins"
    />
    <MatchweekFormModalPreview
      v-else-if="step === FormStep.PREVIEW_MATCHWEEKS"
      ref="preview"
      :rules="form"
      :groups="stage.groups"
      @show-previous="step = FormStep.SELECT_RULES"
    />
  </AppModal>
</template>

<script lang="ts">
enum FormStep {
  SELECT_RULES,
  PREVIEW_MATCHWEEKS,
}
</script>

<script lang="ts" setup>
import type { RulesForm } from './MatchweekFormModalRules.vue';

const props = defineProps<{
  stage: GroupStage;
}>();

const tournamentStore = useTournamentStore();

const previewRef = useTemplateRef('preview');

const step = ref<FormStep>(FormStep.SELECT_RULES);

const form = ref<RulesForm>({
  format: GroupStageFormat.SAME_GROUP_ROUND_ROBIN,
  roundRobins: StageConstants.MIN_ROUNDS,
});

function onFormSubmit() {
  if (step.value === FormStep.SELECT_RULES) {
    step.value = FormStep.PREVIEW_MATCHWEEKS;
    return;
  }

  tournamentStore.addMatchweeksToStage(tournamentStore.activeTournamentId!, props.stage.id, previewRef.value!.matchweeks);
}
</script>
