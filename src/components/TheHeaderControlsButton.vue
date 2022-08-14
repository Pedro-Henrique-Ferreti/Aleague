<template>
  <button
    class="header-button"
    :class="buttonClasses"
    @click="$emit('click')"
  >
    <BaseIcon
      class="header-button__icon"
      :icon="icon"
    />
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

defineEmits(['click']);

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

const buttonClasses = computed(() => ({
  'header-button--active': props.isActive,
}));
</script>

<style lang="scss" scoped>
.header-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  background-color: $color--white;
  border: 1px solid $color--light-gray-1;
  border-radius: 0.25rem;
  transition: background-color $transition--fastest ease-in-out;
  @include focus-ring;
  &:hover,
  &--active {
    background-color: $color--light-gray-2;
  }
  &__icon {
    width: 1.25rem;
    height: 1.25rem;
    fill: $color--text-lighten;
  }
}
</style>
