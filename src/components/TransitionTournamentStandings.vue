<template>
  <TransitionGroup
    name="tournament-standings"
    :tag="tag"
  >
    <slot />
  </TransitionGroup>
</template>

<script lang="ts" setup>
defineProps({
  tag: {
    type: String,
    default: 'div',
  },
});
</script>

<style lang="scss">
.tournament-standings {
  &-move,
  &-enter-active,
  &-leave-active {
    transition: all 0.8s cubic-bezier(.16,1,.3,1);
  }
  &-enter-from,
  &-leave-to {
    transform: translateX(2rem);
  }
  &-leave-active {
    position: absolute;
  }
}
</style>
