<template>
  <AppModal
    v-model:is-open="modalIsOpen"
    :show-close-icon="false"
    :show-actions="false"
  >
    <div
      class="alert-soft grid place-items-center size-4 rounded-full mx-auto mb-1"
      :class="DIALOG_TYPES[type].class"
    >
      <component
        :is="DIALOG_TYPES[type].icon"
        stroke="1.5"
        class="size-7/12"
      />
    </div>
    <div class="font-semibold text-lg text-center mb-0.5">{{ title }}</div>
    <div class="text-center">
      <slot />
    </div>
    <AppButton
      class="btn-primary btn-block mt-1.5"
      label="Entendi"
      @click="modalIsOpen = false"
    />
  </AppModal>
</template>

<script lang="ts" setup>
import { type Icon, IconAlertCircle, IconAlertTriangle, IconCircleCheck } from '@tabler/icons-vue';

interface FeedbackDialogProps {
  title: string;
  type?: 'success' | 'warning' | 'error';
}

withDefaults(defineProps<FeedbackDialogProps>(), {
  type: 'success',
});

const DIALOG_TYPES: Record<NonNullable<FeedbackDialogProps['type']>, { class: string; icon: Icon }> = {
  success: { class: 'alert-success', icon: IconCircleCheck },
  warning: { class: 'alert-warning', icon: IconAlertTriangle },
  error: { class: 'alert-error', icon: IconAlertCircle },
} as const;

const modalIsOpen = defineModel<boolean>('is-open');
</script>
