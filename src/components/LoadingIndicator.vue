<template>
  <div class="loading-indicator">
    <IconSpinner />
  </div>
</template>

<script lang="ts" setup>
import IconSpinner from './icons/IconSpinner.vue';
</script>

<style lang="scss" scoped>
.loading-indicator {
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
