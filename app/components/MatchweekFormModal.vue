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
    <MatchweekFormModalReview v-else-if="step === FormStep.REVIEW_MATCHWEEKS" />
  </AppModal>
</template>

<script lang="ts">
enum FormStep {
  SELECT_RULES,
  REVIEW_MATCHWEEKS,
}
</script>

<script lang="ts" setup>
import type { RulesForm } from './MatchweekFormModalRules.vue';

const step = ref<FormStep>(FormStep.SELECT_RULES);

const form = ref<RulesForm>({
  format: GroupStageFormat.SAME_GROUP_ROUND_ROBIN,
  roundRobins: StageConstants.MIN_ROUNDS,
});

function onFormSubmit() {
  if (step.value === FormStep.SELECT_RULES) {
    step.value = FormStep.REVIEW_MATCHWEEKS;
  }
}
</script>
