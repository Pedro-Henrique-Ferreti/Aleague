<template>
  <div class="color-picker">
    <label
      v-for="(color, index) in colorOptions"
      class="color-picker__option"
      :for="`${id}-${index}`"
      :key="index"
      :style="`--option-color: ${color}`"
      :data-checked="inputValue === color"
    >
      <IconCheck
        v-show="inputValue === color"
        class="color-picker__option-icon"
      />
      <input
        v-model="inputValue"
        class="color-picker__option-input"
        type="radio"
        :id="`${id}-${index}`"
        :value="color"
      />
    </label>
  </div>
</template>

<script lang="ts" setup>
import { computed, type PropType } from 'vue';
import IconCheck from '@/assets/icons/Check.svg';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  colorOptions: {
    type: Array as PropType<readonly String[]>,
    default: () => ([]),
  },
  id: {
    type: String,
    required: true,
  },
});

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>

<style lang="scss" scoped>
.color-picker {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem 0.25rem;
  &__option {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.25rem;
    height: 2.25rem;
    border: 1px solid transparent;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: border-color $transition--1;
    position: relative;
    &[data-checked="true"] {
      border-color: $color--text-300;
    }
    &::after {
      content: '';
      display: block;
      width: 1.625rem;
      height: 1.625rem;
      border-radius:$radius--full;
      background-color: var(--option-color);
    }
  }
  &__option-icon {
    width: 0.875rem;
    color: $color--white;
    position: absolute;
  }
  &__option-input {
    width: 0;
    height: 0;
    opacity: 0;
    position: absolute;
  }
}
</style>
