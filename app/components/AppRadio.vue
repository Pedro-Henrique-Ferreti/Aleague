<template>
  <label class="inline-flex gap-0.5" :for="id">
    <input
      v-model="model"
      type="radio"
      class="radio"
      :id="id"
      :name="name"
      :value="value"
      :disabled="disabled"
    >
    <span class="text-sm">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script lang="ts" setup generic="T extends string | number">
const id = useId();

defineProps<{
  name: string;
  value: T;
  label?: string;
  disabled?: boolean;
}>();

const model = defineModel<T>();
</script>
