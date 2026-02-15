<template>
  <AppModal
    title="Gerar partidas"
    :size="step === FormStep.SELECT_RULES ? undefined : 'xl'"
    :submit-button-label="step === FormStep.SELECT_RULES ? 'Próximo' : 'Confirmar'"
  >
    <template #trigger="{ openModal }">
      <slot :open-modal="openModal" />
    </template>
    <MatchweekFormModalRules v-if="step === FormStep.SELECT_RULES" />
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
const step = ref<FormStep>(FormStep.SELECT_RULES);
</script>
