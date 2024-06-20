<template>
  <li class="nav-item">
    <RouterLink
      class="nav-item__link"
      :to="to"
    >
      <span>{{ name }}</span>
    </RouterLink>
  </li>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { RouteLocationRaw } from 'vue-router';

defineProps({
  to: {
    type: [String, Object] as PropType<RouteLocationRaw>,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss" scoped>
.nav-item {
  &__link {
    font-weight: $font-weight--medium;
    position: relative;
    transition: color $transition--fastest ease-in;
      &::after {
      content: '';
      width: 1rem;
      height: 0.1875rem;
      background-color: transparent;
      border-radius: 1rem;
      position: absolute;
      bottom: -0.125rem;
      left: 50%;
      transform: translateX(-50%);
      transition: background-color $transition--fastest ease-in;
    }
    &:hover::after {
      background-color: $color--primary;
    }
    &.router-link-active {
      color: $color--text-strong;
      &::after {
        background-color: $color--primary;
      }
    }
  }
}
</style>
