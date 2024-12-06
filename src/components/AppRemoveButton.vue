<template>
  <button
    class="remove-button"
    type="button"
    @click="$emit('click')"
  >
    <IconClose class="remove-button__icon" />
  </button>
</template>

<script lang="ts" setup>
import IconClose from '@/assets/icons/Close.svg';

defineEmits(['click']);
</script>

<style lang="scss" scoped>
.remove-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid $color--neutral-300;
  border-radius: $radius--full;
  color: $color--text;
  outline-color: $color--focus-ring;
  transition: border-color $transition--fastest linear;
  &:hover {
    border-color: $color--text-300;
  }
  &__icon {
    width: 0.75rem;
    height: 0.75rem;
  }
}
</style>
