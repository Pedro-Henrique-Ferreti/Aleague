<template>
  <AppFieldset :label="label">
    <BaseSelect
      v-model="model"
      class="w-full"
      :options="options"
    />
  </AppFieldset>
</template>

<script setup lang="ts" generic="T extends SelectOptionValue">
defineProps<{
  label: string;
  options: SelectOptionList<T>;
}>();

const model = defineModel<T>();
</script>
