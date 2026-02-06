<template>
  <AppModal
    v-model:is-open="isOpen"
    ref="modalRef"
    submit-button-label="Confirmar"
    :title="title"
    :show-close-icon="false"
    @submit="onSubmit"
  >
    <template #trigger="{ open }">
      <slot
        name="trigger"
        :open="open"
      />
    </template>
    <slot>
      <p>{{ message }}</p>
    </slot>
    <template #submit-button>
      <AppButton
        v-if="type === 'delete'"
        class="btn-error"
        label="Continuar"
        @click="onSubmit"
      />
    </template>
  </AppModal>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
  message?: string;
  type?: 'delete';
}

const emit = defineEmits<{ confirm: [] }>();

withDefaults(defineProps<Props>(), {
  title: 'Continuar',
});

const isOpen = defineModel<boolean>('is-open');

const modal = useTemplateRef('modalRef');

function onSubmit() {
  emit('confirm');

  modal.value?.close();
}
</script>