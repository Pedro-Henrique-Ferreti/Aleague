<template>
  <label class="inline-flex gap-0.5" :for="id">
    <input
      v-model="model"
      :id="id"
      type="radio"
      class="radio"
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
defineProps<{
  name: string;
  value: T;
  label?: string;
  disabled?: boolean;
}>();

const id = useId();

const model = defineModel<T>();
</script>
