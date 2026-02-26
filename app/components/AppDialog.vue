<template>
  <AppModal
    v-model:is-open="isOpen"
    submit-button-label="Confirmar"
    :title="title"
    :show-close-icon="false"
    @submit="onSubmit"
  >
    <template #trigger="{ openModal }">
      <slot
        name="trigger"
        :open-modal="openModal"
      />
    </template>
    <div
      v-if="type === 'delete'"
      class="alert-soft alert-error grid place-items-center size-3.5 rounded-full mx-auto mb-1 -mt-0.5"
    >
      <IconAlertTriangle class="size-2" />
    </div>
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
import { IconAlertTriangle } from '@tabler/icons-vue';

interface Props {
  title?: string;
  message?: string;
  type?: 'delete';
}

withDefaults(defineProps<Props>(), {
  title: 'Continuar',
});

const emit = defineEmits<{ confirm: [] }>();

const isOpen = defineModel<boolean>('is-open');

function onSubmit() {
  emit('confirm');

  isOpen.value = false;
}
</script>
