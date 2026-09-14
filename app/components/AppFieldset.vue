<template>
  <fieldset class="fieldset py-0">
    <legend class="fieldset-legend pt-0">{{ label }}</legend>
    <slot />
  </fieldset>
</template>

<script lang="ts" setup>
defineProps<{
  label: string;
}>();
</script>
