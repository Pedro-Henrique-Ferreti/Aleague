<template>
  <button
    class="menu-button"
    type="button"
    aria-controls="header-nav"
    aria-label="Menu"
    :aria-expanded="menuIsOpen"
  >
    <IconClose
      v-if="menuIsOpen"
      class="menu-button__icon | icon-close"
    />
    <IconMenu
      v-else
      class="menu-button__icon"
    />
  </button>
</template>

<script lang="ts" setup>
import IconMenu from '@/assets/icons/Menu.svg';
import IconClose from '@/assets/icons/Close.svg';

defineProps({
  menuIsOpen: {
    type: Boolean,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.menu-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.25rem;
  height: 2.25rem;
  color: $color--text-strong;
  &[aria-expanded="true"] {
    span {
      opacity: 0;
    }
  }
  @include for-large-tablet-landscape-up {
    display: none;
  }
  &__icon {
    --size: 2rem;
    width: var(--size);
    height: var(--size);
    &.icon-close {
      --size: 1.25rem;
    }
  }
}
</style>
