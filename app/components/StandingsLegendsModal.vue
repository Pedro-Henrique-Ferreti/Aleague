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
      <AppTab
        class="basis-1/3"
        label="Edição múltipla"
        :is-active="activeTab === ModalTabs.MULTIPLE_EDIT"
        @click="activeTab = ModalTabs.MULTIPLE_EDIT"
      />
    </AppTablist>
    <StandingsLegendsModalDescription
      v-if="ModalTabs.DESCRIPTION === activeTab"
      ref="legends-description"
    />
    <StandingsLegendsModalEdit
      v-if="ModalTabs.MULTIPLE_EDIT === activeTab"
      ref="multiple-edit"
    />
  </AppModal>
</template>

<script lang="ts" setup>
enum ModalTabs {
  DESCRIPTION,
  MULTIPLE_EDIT,
}

const stageStore = useStageStore();

const activeTab = ref<ModalTabs>(ModalTabs.DESCRIPTION);

const legendsDescriptionTab = useTemplateRef('legends-description');
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
