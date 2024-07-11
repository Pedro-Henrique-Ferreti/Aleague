<template>
  <Transition
    name="drawer"
    mode="out-in"
  >
    <slot />
  </Transition>
</template>

<script lang="ts" setup>
defineProps({
  modalSize: {
    type: Number,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.drawer {
  &-enter-from {
    right: calc(v-bind(modalSize) * -1rem);
  }
  &-enter-to {
    right: 0;
  }
  &-leave-from {
    right: 0;
  }
  &-leave-to {
    right: calc(v-bind(modalSize) * -1rem);
  }
  &-enter-active {
    transition: right $transition--1;
  }
  &-leave-active {
    transition: right $transition--1;
  }
}
</style>
