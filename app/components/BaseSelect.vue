<template>
  <select
    v-model="model"
    :id="id"
    class="select"
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
  options: SelectOptionList<T> | Readonly<SelectOptionList<T>>;
  disabled?: boolean;
}
</script>

<script setup lang="ts" generic="T extends SelectOptionValue">
defineProps<BaseSelectProps<T>>();

const id = useId();

const model = defineModel<T>();
</script>
