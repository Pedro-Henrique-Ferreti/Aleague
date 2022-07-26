<template>
  <h1 class="heading">
    <slot />
  </h1>
</template>

<script setup></script>

<style lang="scss" scoped>
.heading {
  margin-bottom: 1rem;
  color: $color--text-darken;
  font-size: 1.5rem;
  font-weight: $font-weight--semibold;
  @include for-desktop-up {
    font-size: 1.875rem;
  }
}
</style>
