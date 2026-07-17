<template>
  <button
    class="tab"
    type="button"
    role="tab"
    :class="{ 'tab-active': isActive }"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
defineProps<{
  isActive?: boolean;
  label: string;
}>();
</script>
