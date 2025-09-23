<template>
  <fieldset class="fieldset">
    <legend
      v-if="label"
      v-text="label"
      class="fieldset-legend"
    />
    <select
      v-model="model"
      class="select"
      :class="inputClass"
    >
      <option
        v-for="option in options"
        v-text="option.label"
        :key="JSON.stringify(option.value)"
        :value="option.value"
        :disabled="option.disabled"
      />
    </select>
  </fieldset>
</template>

<script setup lang="ts" generic="T extends SelectOptionValue">
defineProps<{
  label?: string;
  options: SelectOptionList<T>;
  inputClass?: string;
}>();

const model = defineModel<T>();
</script>
