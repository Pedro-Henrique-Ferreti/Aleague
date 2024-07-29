<template>
  <div class="counter">
    <span class="counter__label">
      {{ label }}
    </span>
    <div class="counter__controls">
      <AppIconButton
        color="secondary"
        :icon="IconMinus"
        :disabled="(inputValue - step) < min"
        @click="inputValue -= step"
      />
      <span class="counter__value">
        {{ modelValue }}
      </span>
      <AppIconButton
        color="secondary"
        :icon="IconPlus"
        :disabled="!!max && ((inputValue + step) > max)"
        @click="inputValue += step"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import IconPlus from '@/assets/icons/IconPlus.svg';
import IconMinus from '@/assets/icons/IconMinus.svg';
import AppIconButton from './AppIconButton.vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  label: {
    type: String,
    required: true,
  },
  step: {
    type: Number,
    default: 1,
    validator: (value: number) => (value > 0),
  },
  min: {
    type: Number,
    default: 0,
    validator: (value: number) => (value >= 0),
  },
  max: {
    type: Number,
    default: 0,
    validator: (value: number) => (value >= 0),
  },
});

const inputValue = computed({
  get: () => props.modelValue,
  set(value: number) {
    if (value < props.min || (!!props.max && value > props.max)) return;

    emit('update:modelValue', value);
  },
});
</script>

<style lang="scss" scoped>
.counter {
  width: fit-content;
  &__label {
    display: block;
    margin-bottom: 1.5rem;
    color: $color--text-strong;
  }
  &__controls {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__value {
    display: block;
    width: 6rem;
    color: $color--text-strong;
    font-size: 2rem;
    font-weight: $font-weight--medium;
    text-align: center;
  }
}
</style>
