<template>
  <h1 class="auth-heading">
    <slot />
  </h1>
  <span
    v-if="subtitle"
    class="auth-heading__subtitle"
  >
    {{ subtitle }}
  </span>
</template>

<script lang="ts" setup>
defineProps({
  subtitle: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss" scoped>
.auth-heading {
  margin-bottom: 1.5rem;
  color: $color--text-darken;
  font-size: 1.875rem;
  font-weight: $font-weight--semibold;
  &__subtitle {
    display: flex;
    margin-top: -1rem;
    margin-bottom: 1.5rem;
  }
}
</style>
