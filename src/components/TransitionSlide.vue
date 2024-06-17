<template>
  <Transition
    :name="`slide-${direction}`"
    mode="out-in"
  >
    <slot />
  </Transition>
</template>

<script lang="ts">
enum Directions {
  left = 'left',
  right = 'right',
}
</script>

<script lang="ts" setup>
import type { PropType } from 'vue';

defineProps({
  direction: {
    type: String as PropType<keyof typeof Directions>,
    default: Directions.left,
  },
});
</script>

<style lang="scss" scoped>
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all $transition--fastest;
}
.slide-right-enter-to,
.slide-right-leave-from,
.slide-left-enter-to,
.slide-left-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-2rem);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(2rem);
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(2rem);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-2rem);
}
</style>
