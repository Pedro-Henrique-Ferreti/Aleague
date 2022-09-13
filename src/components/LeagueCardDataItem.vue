<template>
  <li
    class="league-card-data-item"
    :class="{ 'league-card-data-item--warning': warning }"
  >
    <BaseIcon
      class="league-card-data-item__icon"
      :icon="icon"
    />
    <span class="league-card-data-item__label">
      <slot />
    </span>
  </li>
</template>

<script lang="ts" setup>
defineProps({
  icon: {
    type: String,
    required: true,
  },
  warning: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.league-card-data-item {
  --color: #{$color--text};
  &--warning {
    --color: #{$color--primary};
  }
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.25rem;
  align-items: center;
  &__icon {
    width: 0.75rem;
    height: 0.75rem;
    fill: var(--color);
  }
  &__label {
    color: var(--color);
    font-size: 0.875rem;
  }
}
</style>
