<template>
  <fieldset class="fieldset pb-0">
    <legend class="fieldset-legend">{{ label }}</legend>
    <slot />
  </fieldset>
</template>

<script lang="ts" setup>
defineProps<{
  label: string;
}>();
</script>
