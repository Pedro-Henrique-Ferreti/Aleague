<template>
  <h1 class="auth-heading">
    <slot />
  </h1>
</template>

<script setup></script>

<style lang="scss" scoped>
.auth-heading {
  margin-bottom: 1.5rem;
  color: $color--text-darken;
  font-size: 1.875rem;
  font-weight: $font-weight--semibold;
}
</style>
