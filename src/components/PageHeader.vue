<template>
  <div class="page-header">
    <h1 class="page-header__title">
      <slot name="title" />
    </h1>
    <slot />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.page-header {
  margin-bottom: 2rem;
  &__title {
    margin-bottom: 1rem;
    color: $color--text-darken;
    font-size: 1.5rem;
    font-weight: $font-weight--semibold;
  }
  @include for-desktop-up {
    margin-bottom: 3rem;
    .page-header__title {
      font-size: 1.875rem;
    }
  }
}
</style>
