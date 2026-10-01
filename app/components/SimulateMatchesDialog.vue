<template>
  <AppDialog
    v-model:is-open="isOpen"
    :title="title"
    @confirm="$emit('confirm')"
  >
    <p>{{ message }}</p>
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
</script>
