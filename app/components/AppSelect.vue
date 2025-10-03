<template>
  <AppFieldset :label="label">
    <BaseSelect
      v-model="model"
      class="w-full"
      :options="options"
      :disabled="disabled"
    />
  </AppFieldset>
</template>

<script setup lang="ts" generic="T extends SelectOptionValue">
import type { BaseSelectProps } from './BaseSelect.vue';

defineProps<BaseSelectProps<T> & {
  label: string;
}>();

const model = defineModel<T>();
</script>
