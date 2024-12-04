<template>
  <div class="accordion | app-base-card">
    <button
      class="accordion__header"
      type="button"
      @click="isOpen = !isOpen"
    >
      <span class="accordion__title | h3">
        {{ title }}
      </span>
      <IconChevron
        class="accordion__icon"
        :data-rotate="!isOpen"
      />
    </button>
    <div
      v-if="isOpen"
      class="accordion__body"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import IconChevron from '@/assets/icons/IconChevron.svg';

defineProps({
  title: {
    type: String,
    required: true,
  },
});

const isOpen = ref(false);
</script>

<style lang="scss" scoped>
.accordion {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    width: 100%;
  }
  &__icon {
    width: 1rem;
    height: auto;
    color: $color--text-strong;
    transition: transform $transition--1;
    &[data-rotate="true"] {
      transform: rotate(-180deg);
    }
  }
  &__body {
    margin-top: 0.75rem;
    padding-top: 1.5rem;
    border-top: 1px solid $color--neutral-300;
  }
}
</style>
