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
        :is-active="activeTab === ModalTabs.DESCRIPTION"
        @click="activeTab = ModalTabs.DESCRIPTION"
      />
    </AppTablist>
    <StandingsLegendsModalDescription
      v-if="ModalTabs.DESCRIPTION === activeTab"
      ref="legends-description"
    />
  </AppModal>
</template>

<script lang="ts" setup>
enum ModalTabs {
  DESCRIPTION,
}

const stageStore = useStageStore();

const activeTab = ref<ModalTabs>(ModalTabs.DESCRIPTION);

const legendsDescriptionTab = useTemplateRef('legends-description');

function handleModalOpen() {
  legendsDescriptionTab.value?.resetForm();
}

function handleSubmit() {
  legendsDescriptionTab.value?.submitForm();
  stageStore.legendsModalIsOpen = false;
}
</script>
