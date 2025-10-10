<template>
  <AppModal
    ref="modalRef"
    :title="`Performance: ${getTeamById(entry?.team)?.name}`"
    :show-actions="false"
  >
    <StandingsCardForm
      v-if="entry"
      :form="entry.form"
    />
  </AppModal>
</template>

<script lang="ts" setup>
const { getTeamById } = useTeamStore();

const props = defineProps<{ entry: TableEntry | null }>();
const modalRef = useTemplateRef('modalRef');

watch(() => props.entry, () => {
  if (props.entry) {
    modalRef.value?.open();
  }
});
</script>
