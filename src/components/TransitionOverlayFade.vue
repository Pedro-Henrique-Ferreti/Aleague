<template>
  <Transition
    name="modal-overlay-fade"
    mode="out-in"
  >
    <slot />
  </Transition>
</template>

<style lang="scss" scoped>
.modal-overlay-fade {
  &-enter-from {
    opacity: 0.4;
  }
  &-leave-to {
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
