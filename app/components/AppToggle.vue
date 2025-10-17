<template>
  <label class="flex gap-0.5 items-center">
    <input
      v-model="model"
      type="checkbox"
      class="toggle"
      :id="id"
    />
    <span>{{ label }}</span>
  </label>
</template>

<script lang="ts" setup>
const id = useId();

defineProps<{ label: string }>();

const model = defineModel<boolean>();
</script>
