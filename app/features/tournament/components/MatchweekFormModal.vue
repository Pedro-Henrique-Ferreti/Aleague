<template>
  <AppModal
    title="Configurar partidas"
    :size="store.step === MatchweekFormStep.SELECT_RULES ? undefined : 'xl'"
    :submit-button-label="store.step === MatchweekFormStep.SELECT_RULES ? 'Próximo' : 'Confirmar'"
    :submit-button-disabled="store.isCreatingMatchweeks"
    :show-back-button="store.step === MatchweekFormStep.PREVIEW_MATCHWEEKS"
    @submit="store.onFormSubmit"
    @open="store.onFormOpen"
    @close="store.onFormClose"
    @back-button-click="store.showFormStep(MatchweekFormStep.SELECT_RULES)"
  >
    <template #trigger="{ openModal }">
      <slot :open-modal="openModal" />
    </template>
    <MatchweekFormModalRules v-if="store.step === MatchweekFormStep.SELECT_RULES" />
    <MatchweekFormModalPreview v-else-if="store.step === MatchweekFormStep.PREVIEW_MATCHWEEKS" />
  </AppModal>
</template>

<script lang="ts" setup>
const store = useMatchweekFormStore();
</script>
