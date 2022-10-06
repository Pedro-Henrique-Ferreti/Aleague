<template>
  <div class="loading-indicator">
    <BaseIcon
      class="loading-indicator__icon"
      icon="loading"
    />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.loading-indicator {
  --size: 4.5rem;
  display: grid;
  place-items: center;
  &__icon {
    width: var(--size);
    height: var(--size);
    stroke: $color--primary;
  }
}
</style>
