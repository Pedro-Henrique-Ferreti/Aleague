<template>
  <AppTransition name="modal__overlay-fade">
    <div
      v-show="show"
      class="overlay"
      @click.self="$emit('click')"
    >
      <slot />
    </div>
  </AppTransition>
</template>

<script setup>
import AppTransition from './AppTransition.vue';
defineEmits(['click']);

defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.overlay {
  display: grid;
  place-items: start center;
  padding: $spacing--modal-overlay-padding $spacing--screen-vertical-padding;
  background-color: $color--text-darken-50;
  overflow: hidden;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: $z-index--modal-overlay;
  @include for-tablet-portrait-down {
    padding: 0;
  }
}
</style>
