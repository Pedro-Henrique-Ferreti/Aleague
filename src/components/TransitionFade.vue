<template>
  <Transition
    name="fade"
    mode="out-in"
  >
    <slot />
  </Transition>
</template>

<style lang="scss" scoped>
.fade {
  &-enter-from {
    opacity: 0.4;
  }
  &-enter-active {
    transition: opacity $transition--1;
  }
}
</style>
