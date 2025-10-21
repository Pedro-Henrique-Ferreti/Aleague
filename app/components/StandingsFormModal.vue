<template>
  <AppModal
    ref="modalRef"
    :title="`Performance: ${getTeamById(entry?.team)?.name}`"
    :show-actions="false"
  >
    <div class="flex items-center gap-0.5 flex-wrap">
      <div
        v-for="form in entry?.form"
        class="flex flex-col items-center"
        :key="form.match.id"
      >
        <TeamForm
          tooltip-disabled
          :form="form"
        />
        <span class="font-semibold">{{ form.week }}</span>
      </div>
    </div>
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
