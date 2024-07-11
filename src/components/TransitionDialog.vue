<template>
  <Transition
    name="dialog"
    mode="out-in"
  >
    <slot />
  </Transition>
</template>

<style lang="scss" scoped>
.dialog {
  &-enter-from {
    transform: scale(0.85);
    opacity: 0.4;
  }
  &-leave-to {
    transform: scale(0.85);
    opacity: 0.4;
  }
  &-enter-active {
    transition: $transition--fastest ease-out;
  }
  &-leave-active {
    transition: $transition--fastest ease-in;
  }
}
</style>
