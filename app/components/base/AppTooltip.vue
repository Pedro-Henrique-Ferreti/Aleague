<template>
  <div
    class="tooltip"
    :data-tip="label"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  label: string;
}>();
</script>
