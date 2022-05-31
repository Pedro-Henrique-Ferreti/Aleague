<template>
  <component
    class="icon"
    :is="icon"
  />
</template>

<script setup>
import { computed } from 'vue';
import Save from '@/components/icons/IconSave.vue';

const icon = computed(() => {
  return Save;
});
</script>

<style lang="scss" scoped>
.icon {
  fill: currentColor;
}
</style>
