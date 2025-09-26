<template>
  <select
    v-model="model"
    class="select"
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
</template>

<script setup lang="ts" generic="T extends SelectOptionValue">
const id = useId();

defineProps<{
  options: SelectOptionList<T>;
}>();

const model = defineModel<T>();
</script>
