<template>
  <AppFieldset :label="label">
    <BaseInput
      v-model="model"
      :name="name"
    />
  </AppFieldset>
</template>

<script lang="ts" setup>
import type { BaseInputModel } from './BaseInput.vue';

defineProps<{
  label: string;
  name: string;
}>();

const model = defineModel<BaseInputModel>();
</script>