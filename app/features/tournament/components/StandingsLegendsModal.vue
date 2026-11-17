<template>
  <AppModal
    v-model:is-open="stageStore.legendsModalIsOpen"
    title="Editar legendas"
    @open="handleModalOpen"
    @submit="handleSubmit"
  >
    <AppTablist class="mb-1.5">
      <AppTab
        class="basis-1/3"
        label="Descrição"
      />
      <AppTab
        class="basis-1/3"
        label="Edição múltipla"
      />
      <template #tabpanels>
        <StandingsLegendsModalDescription ref="description" />
        <StandingsLegendsModalEdit ref="multiple-edit" />
      </template>
    </AppTablist>
  </AppModal>
</template>

<script lang="ts" setup>
const stageStore = useStageStore();

const legendsDescriptionTab = useTemplateRef('description');
const multipleEditTab = useTemplateRef('multiple-edit');

function handleModalOpen() {
  legendsDescriptionTab.value?.resetForm();
  multipleEditTab.value?.resetForm();
}

function handleSubmit() {
  legendsDescriptionTab.value?.submitForm();
  multipleEditTab.value?.submitForm();
  stageStore.legendsModalIsOpen = false;
}
</script>
