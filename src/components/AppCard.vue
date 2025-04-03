<template>
  <div class="card | app-base-card">
    <div
      v-if="$slots.header"
      class="card__header"
    >
      <slot name="header">
        <h2 class="card__title">
          {{ title }}
        </h2>
      </slot>
    </div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss" scoped>
.card {
  &__header {
    padding-bottom: 0.75rem;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid $color--neutral-300;
  }
  &__title {
    color: $color--text-strong;
    font-size: 1.25rem;
    font-weight: $font-weight--medium;
  }
}
</style>
