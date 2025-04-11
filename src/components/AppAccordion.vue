<template>
  <div class="accordion">
    <button
      class="accordion__header"
      type="button"
      @click="isOpen = !isOpen"
    >
      <span class="accordion__title">
        {{ title }}
      </span>
      <IconChevron
        class="accordion__icon"
        :data-rotate="!isOpen"
      />
    </button>
    <TransitionPanel>
      <div v-show="isOpen">
        <div class="accordion__body">
          <slot />
        </div>
      </div>
    </TransitionPanel>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import IconChevron from '@/assets/icons/Chevron.svg';
import TransitionPanel from './TransitionPanel.vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  initialOpen: {
    type: Boolean,
    default: false,
  },
});

const isOpen = ref(props.initialOpen);
</script>

<style lang="scss" scoped>
.accordion {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    width: 100%;
    padding: 0.875rem 1.25rem;
    background-color: $color--white;
    border: 1px solid $color--neutral-300;
    border-radius: $radius--large;
  }
  &__title {
    color: $color--text-strong;
    font-weight: $font-weight--medium;
  }
  &__icon {
    width: 1rem;
    height: auto;
    color: $color--text-strong;
    &[data-rotate="true"] {
      transform: rotate(180deg);
    }
  }
  &__body {
    padding-top: 1rem;
  }
}
</style>
