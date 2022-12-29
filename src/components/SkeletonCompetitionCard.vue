<template>
  <div class="skeleton-competition-card">
    <div class="skeleton-competition-card__image | skeleton" />
    <div>
      <div class="skeleton" />
      <div
        class="skeleton"
        style="--width: 75%"
      />
      <div
        class="skeleton"
        style="--width: 50%"
      />
    </div>
    <div class="skeleton-competition-card__bar | skeleton" />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.skeleton-competition-card {
  display: grid;
  grid-template-columns: 4rem 1fr;
  gap: 1rem;
  height: 11rem;
  padding: 1rem;
  border: 1px solid $color--light-gray-1;
  border-radius: 0.5rem;
  box-shadow: $box-shadow--layer-1;
  &__image {
    --height: 4rem;
  }
  &__bar {
    --mb: 0;
    grid-column: 1 / 3;
    align-self: flex-end;
  }
}
</style>
