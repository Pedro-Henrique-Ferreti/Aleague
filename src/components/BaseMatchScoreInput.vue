<template>
  <BaseInput
    v-model.lazy="inputValue"
    class="score-input"
    headless
    id=""
    :mask="Number"
    :mask-options="MASK_OPTIONS"
  />
</template>

<script lang="ts" setup>
import { computed, type PropType } from 'vue';
import BaseInput from './BaseInput.vue';

const MASK_OPTIONS = { min: 0, max: 99, scale: 0 } as const;

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: Number as PropType<number | null>,
    default: null,
  },
});

const inputValue = computed({
  get: () => (
    (typeof props.modelValue === 'number') ? String(props.modelValue) : ''
  ),
  set: (value: string) => emit('update:modelValue', (value === '') ? null : +value),
});
</script>

<style lang="scss" scoped>
.score-input {
  width: 2rem;
  height: 2rem;
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: inherit;
  font-weight: $font-weight--medium;
  text-align: center;
  transition: border-color $transition--fastest linear;
  &::placeholder {
    color: $color--text-400;
  }
  &:hover,
  &:focus {
    border-color: $color--text-400;
    outline: none;
  }
  &:focus::placeholder {
    opacity: 0;
  }
  &:first-child {
    order: -1;
  }
}
</style>
