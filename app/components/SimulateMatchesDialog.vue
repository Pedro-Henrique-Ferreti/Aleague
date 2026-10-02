<template>
  <AppDialog
    v-model:is-open="isOpen"
    :title="title"
    @confirm="$emit('confirm')"
    @open="preserveScore !== undefined ? preserveScore = false : undefined"
  >
    <p>{{ message }}</p>
    <AppCheckbox
      v-if="preserveScore !== undefined"
      v-model="preserveScore"
      class="mt-1.5 font-medium"
      label="Manter resultados existentes"
    />
  </AppDialog>
</template>

<script lang="ts" setup>
import type { AppDialogProps } from './AppDialog.vue';

defineProps<{
  title: AppDialogProps['title'];
  message: AppDialogProps['message'];
}>();

defineEmits<{
  confirm: [];
}>();

const isOpen = defineModel<boolean>('is-open');
const preserveScore = defineModel<boolean>('preserve-score', { default: undefined });
</script>
