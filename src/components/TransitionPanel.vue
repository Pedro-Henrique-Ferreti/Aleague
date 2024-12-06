<template>
  <Transition name="toggleable-content">
    <slot />
  </Transition>
</template>

<style lang="scss" scoped>
.toggleable-content-enter-from,
.toggleable-content-leave-to {
  max-height: 0;
}
.toggleable-content-enter-to,
.toggleable-content-leave-from {
  max-height: 1000px;
}
.toggleable-content-leave-active {
  overflow: hidden;
  transition: max-height $transition--slowest cubic-bezier(0, 1, 0, 1);
}
.toggleable-content-enter-active {
  overflow: hidden;
  transition: max-height 0.8s ease-in-out;
}
</style>
