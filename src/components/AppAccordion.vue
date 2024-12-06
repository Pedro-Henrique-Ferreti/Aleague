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
    <TransitionPanel>
      <div v-show="isOpen">
        <div class="accordion__body">
          <hr class="accordion__divider" />
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
  --base-card--padding: 0;
  --accordion--padding: 1.25rem;
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    width: 100%;
    padding: var(--accordion--padding);
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
    padding: var(--accordion--padding);
    padding-top: 0;
  }
  &__divider {
    margin-bottom: 1.5rem;
  }
}
</style>
