<template>
  <div class="phase-header | playoff-phase-grid">
    <slot />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.phase-header {
  place-items: center;
  height: 2.5rem;
  margin-bottom: 2rem;
  background-color: $color--light-gray-2;
  border-radius: 0.5rem;
  font-size: 1.25rem;
  font-weight: $font-weight--semibold;
}
</style>
