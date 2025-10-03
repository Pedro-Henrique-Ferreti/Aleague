<template>
  <select
    v-model="model"
    class="select"
    :id="id"
    :disabled="disabled"
  >
    <option
      v-for="option in options"
      v-text="option.label"
      :key="JSON.stringify(option.value)"
      :value="option.value"
      :disabled="option.disabled"
    />
  </select>
</template>

<script lang="ts">
export interface BaseSelectProps<T extends SelectOptionValue> {
  options: SelectOptionList<T>;
  disabled?: boolean;
}
</script>

<script setup lang="ts" generic="T extends SelectOptionValue">
const id = useId();

defineProps<BaseSelectProps<T>>();

const model = defineModel<T>();
</script>
