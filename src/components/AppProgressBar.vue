<template>
  <div
    class="progress-bar"
    role="progressbar"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-valuenow="value"
  >
    <span
      v-text="`${Math.floor(output)}%`"
      class="progress-bar__value"
    />
    <div class="progress-bar__background">
      <div
        class="progress-bar__tracker"
        :class="{ 'progress-bar__tracker--complete': value === 100 }"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { TransitionPresets, useTransition } from '@vueuse/core';

const props = defineProps({
  value: {
    type: Number,
    default: 0,
    validator: (value: number) => value >= 0 && value <= 100,
  },
});

const source = computed(() => props.value);

const output = useTransition(source, {
  duration: 1000,
  transition: TransitionPresets.easeOutCubic,
});

const progress = computed(() => ({
  value: `${output.value}%`,
  negativeValue: `-${output.value}%`,
}));
</script>

<style lang="scss" scoped>
.progress-bar {
  position: relative;
  &__value {
    display: inline-block;
    font-size: 0.875rem;
    line-height: 1.6;
    position: absolute;
    top: 0;
    left: v-bind('progress.value');
    transform: translate(v-bind('progress.negativeValue'), -100%);
  }
  &__background {
    height: 0.375rem;
    margin-top: 1.25rem;
    background-color: $color--light-gray-1;
    border-radius: 1rem;
  }
  &__tracker {
    width: v-bind('progress.value');
    height: inherit;
    background-color: $color--tertiary;
    border-radius: inherit;
    &--complete {
      background-color: $color--success-darken-2;
    }
  }
}
</style>
