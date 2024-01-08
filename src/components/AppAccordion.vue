<template>
  <div class="accordion">
    <component :is="heading">
      <button
        class="accordion__trigger"
        type="button"
        :aria-controls="id"
        :aria-expanded="isOpen"
        @click="isOpen = !isOpen"
      >
        <span class="accordion__title">
          {{ title }}
        </span>
        <BaseIcon
          class="accordion__arrow"
          icon="chevron"
          :class="{ 'accordion__arrow--rotate': isOpen }"
        />
      </button>
    </component>
    <div
      v-show="isOpen"
      class="accordion__panel"
      :id="id"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import BaseIcon from './common/BaseIcon.vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  heading: {
    type: String,
    default: 'h2',
  },
});

const isOpen = ref(false);
</script>

<style lang="scss" scoped>
.accordion {
  &__trigger {
    @include focus-ring;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    min-height: 2.5rem;
    padding: 0.5rem 1rem;
    background-color: $color--light-gray-2;
    border-radius: 0.5rem;
  }
  &__title {
    font-weight: $font-weight--semibold;
  }
  &__arrow {
    height: 1rem;
    transform: rotate(90deg);
    transition: transform $transition--fastest ease-in;
    &--rotate {
      transform: rotate(-90deg);
    }
  }
  &__panel {
    padding: 1rem;
  }
}
</style>
