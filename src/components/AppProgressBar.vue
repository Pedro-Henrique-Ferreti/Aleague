<template>
  <div
    class="progress-bar"
    role="progressbar"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-valuenow="value"
  >
    <div class="progress-bar__content">
      <span>Progresso</span>
      <span
        v-text="text || `${value}%`"
        class="progress-bar__value"
      />
    </div>
    <div class="progress-bar__background">
      <div
        class="progress-bar__tracker"
        :data-complete="value === 100"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  computed, onMounted, ref, watch,
} from 'vue';
import { TransitionPresets, useTransition } from '@vueuse/core';

const props = defineProps({
  value: {
    type: Number,
    default: 0,
    validator: (value: number) => value >= 0 && value <= 100,
  },
  text: {
    type: String,
    default: '',
  },
});

// Source
const source = ref(0);

function setSource() {
  source.value = props.value;
}

onMounted(setSource);
watch(() => props.value, setSource);

// Output
const output = useTransition(source, {
  duration: 1500,
  transition: TransitionPresets.easeOutCubic,
});

const progress = computed(() => ({
  value: `${output.value}%`,
  negativeValue: `-${output.value}%`,
}));
</script>

<style lang="scss" scoped>
.progress-bar {
  &__content {
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
    font-weight: $font-weight--medium;
  }
  &__value {
    color: $color--text-strong;
  }
  &__background {
    height: 0.375rem;
    margin-top: 0.5rem;
    background-color: $color--neutral-300;
    border-radius: $radius--full;
  }
  &__tracker {
    width: v-bind('progress.value');
    height: inherit;
    background-color: $color--primary-800;
    border-radius: inherit;
    &[data-complete="true"] {
      background-color: $color--success;
    }
  }
}
</style>
