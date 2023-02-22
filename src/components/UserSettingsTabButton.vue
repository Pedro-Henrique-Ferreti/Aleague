<template>
  <button
    class="user-settings-tab-button"
    type="button"
    :data-active="isActive"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
defineEmits(['click']);

defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.user-settings-tab-button {
  @include focus-ring;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.5rem;
  padding: 0 1rem;
  border-radius: 0.375rem;
  font-size: 1.125rem;
  font-weight: $font-weight--semibold;
  white-space: nowrap;
  transition: all $transition--fastest ease-in;
  &[data-active="true"] {
    color: $color--secondary;
    background-color: $color--light-gray-2;
  }
}
</style>
