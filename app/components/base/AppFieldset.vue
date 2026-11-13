<template>
  <fieldset class="fieldset py-0">
    <legend
      v-if="label"
      class="fieldset-legend pt-0"
    >
      {{ label }}
    </legend>
    <slot />
  </fieldset>
</template>

<script lang="ts" setup>
export interface AppFieldsetProps {
  label?: string;
}

defineProps<AppFieldsetProps>();
</script>
