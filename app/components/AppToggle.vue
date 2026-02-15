<template>
  <label class="flex gap-0.5 items-center">
    <input
      v-model="model"
      :id="id"
      type="checkbox"
      class="toggle"
    >
    <span>{{ label }}</span>
  </label>
</template>

<script lang="ts" setup>
defineProps<{ label: string }>();

const id = useId();

const model = defineModel<boolean>();
</script>
