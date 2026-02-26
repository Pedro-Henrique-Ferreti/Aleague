<template>
  <AppModal
    title="Configurar partidas"
    :size="store.step === MatchweekFormStep.SELECT_RULES ? undefined : 'xl'"
    :submit-button-label="store.step === MatchweekFormStep.SELECT_RULES ? 'Próximo' : 'Confirmar'"
    :submit-button-disabled="store.isCreatingMatchweeks"
    @submit="store.onFormSubmit"
    @open="store.onFormOpen"
    @close="store.onFormClose"
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
