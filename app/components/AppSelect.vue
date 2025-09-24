<template>
  <AppFieldset :label="label">
    <select
      v-model="model"
      class="select w-full"
      :id="id"
    >
      <option
        v-for="option in options"
        v-text="option.label"
        :key="JSON.stringify(option.value)"
        :value="option.value"
        :disabled="option.disabled"
      />
    </select>
  </AppFieldset>
</template>

<script setup lang="ts" generic="T extends SelectOptionValue">
const id = useId();

defineProps<{
  label: string;
  options: SelectOptionList<T>;
}>();

const model = defineModel<T>();
</script>
