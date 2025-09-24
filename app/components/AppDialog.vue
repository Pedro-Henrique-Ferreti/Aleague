<template>
  <AppModal
    ref="modalRef"
    submit-button-label="Confirmar"
    :title="title"
    :show-close-icon="false"
    @submit="onSubmit"
  >
    <template #trigger="{ open }">
      <slot :open="open" />
    </template>
    <p>{{ message }}</p>
  </AppModal>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'confirm'): void;
}>();
withDefaults(defineProps<{
  title?: string;
  message: string;
}>(), {
  title: 'Continuar',
});

const modal = useTemplateRef('modalRef');

function onSubmit() {
  emit('confirm');

  modal.value?.close();
}
</script>