<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">{{ label }}</legend>
    <slot />
  </fieldset>
</template>

<script lang="ts" setup>
defineProps<{
  label: string;
}>();
</script>
