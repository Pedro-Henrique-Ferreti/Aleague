<template>
  <label
    class="app-radio"
    :for="id"
    :data-disabled="disabled"
    :data-size="size"
    :data-checked="isChecked"
  >
    <input
      v-model="inputValue"
      class="app-radio__input"
      type="radio"
      :value="value"
      :id="id"
      :disabled="disabled"
    />
    <slot>
      <span>{{ text }}</span>
    </slot>
  </label>
</template>

<script lang="ts">
enum Sizes {
  small = 'small',
  medium = 'medium',
}
</script>

<script lang="ts" setup>
import { type PropType, computed } from 'vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: '',
  },
  id: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number, Boolean],
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<keyof typeof Sizes>,
    default: Sizes.medium,
  },
});

const inputValue = computed({
  get: () => props.modelValue,
  set(value) {
    emit('update:modelValue', value);
  },
});

const isChecked = computed(() => inputValue.value === props.value);
</script>

<style lang="scss" scoped>
.app-radio {
  display: flex;
  width: fit-content;
  height: fit-content;
  padding: 0.625rem 1rem;
  background-color: $color--white;
  border: 1px solid $color--neutral-300;
  border-radius: 0.625rem;
  color: $color--text;
  font-size: 1rem;
  font-weight: $font-weight--medium;
  position: relative;
  transition: border-color $transition--fastest linear;
  &:not([data-checked="true"], [data-disabled="true"]):hover {
    border-color: $color--text-300;
    cursor: pointer;
  }
  &:has(input:focus-visible) {
    outline: 2px solid $color--focus-ring;
    outline-offset: -2px;
  }
  &[data-size="small"] {
    padding: 0.375rem 0.75rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
  }
  &[data-checked="true"] {
    color: $color--blue-800;
    border-color: $color--blue-800;
    background: linear-gradient(23deg, #FAFAFA, #FFF 100%);
  }
  &[data-disabled="true"] {
    background-color: $color--neutral-300;
    color: $color--text-400;
  }
  &__input {
    width: 0;
    height: 0;
    opacity: 0;
    position: absolute;
  }
}
</style>
