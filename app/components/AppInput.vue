<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">{{ label }}</legend>
    <input
      v-model="model"
      type="text"
      class="input"
      :class="inputClass"
      :name="name"
    />
  </fieldset>
</template>

<script lang="ts" setup>
defineProps<{
  label: string;
  name: string;
  inputClass?: string;
}>();

const model = defineModel<string>();
</script>