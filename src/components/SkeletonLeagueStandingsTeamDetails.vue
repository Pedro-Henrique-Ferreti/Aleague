<template>
  <div class="skeleton-team-details">
    <div
      class="skeleton"
      style="--mb: 0.5rem"
    />
    <div
      class="skeleton"
      style="--mb: 1.5rem"
    />
    <div
      class="skeleton"
      style="--width: 50%; --mb: 0.5rem"
    />
    <div
      class="skeleton"
      style="--mb: 0"
    />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.skeleton-team-details {
  @include for-tablet-portrait-up {
    width: 50%;
  }
}
</style>
