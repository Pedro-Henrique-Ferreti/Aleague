<template>
  <div
    class="team-slot"
    :data-small="small"
  >
    <div class="team-slot__icon-wrapper">
      <BaseIcon
        class="team-slot__icon"
        icon="team-shield"
      />
    </div>
    <span class="team-slot__text">
      <slot />
    </span>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  small: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.team-slot {
  --card-height: 3.5rem;
  --icon-wrapper-size: 2rem;
  --color: #{$color--tertiary-400};
  &[data-small="true"] {
    --card-height: 1.5rem;
    --icon-wrapper-size: auto;
    --color: #{$color--text-lighten};
  }
  &[data-small="false"] {
    justify-content: center;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23B0CDFAFF' stroke-width='2' stroke-dasharray='8%2c8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
    font-weight: $font-weight--semibold;
  }

  display: flex;
  align-items: center;
  gap: 1rem;
  height: var(--card-height);
  color: var(--color);
  &__icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--icon-wrapper-size);
    height: var(--icon-wrapper-size);
    background-color: $color--tertiary-50;
    border-radius: 50%;
  }
  &__icon {
    width: 1rem;
    height: 1rem;
    fill: $color--tertiary-400;
  }
}
</style>
