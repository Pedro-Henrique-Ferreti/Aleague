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
  display: grid;
  place-items: center;
  &__icon {
    width: 4.5rem;
    height: 4.5rem;
    stroke: $color--primary;
  }
}
</style>
