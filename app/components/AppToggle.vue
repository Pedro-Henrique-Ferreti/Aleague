<template>
  <label class="flex gap-0.5 items-center">
    <input
      v-model="model"
      :id="id"
      type="checkbox"
      class="toggle"
      :class="{
        'toggle-sm': size === 'sm',
        'toggle-md': size === 'md',
        'toggle-lg': size === 'lg',
      }"
    >
    <span>{{ label }}</span>
  </label>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  label: string
  size?: 'sm' | 'md' | 'lg';
}>(), {
  size: 'md',
});

const id = useId();

const model = defineModel<boolean>();
</script>
