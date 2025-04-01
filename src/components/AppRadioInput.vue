<template>
  <label
    class="app-radio"
    :for="elementId"
    :data-disabled="disabled"
    :data-size="size"
    :data-checked="isChecked"
  >
    <input
      v-model="inputValue"
      class="app-radio__input"
      ref="input"
      :id="elementId"
      :type="type"
      :value="value"
      :disabled="disabled"
      @keypress.enter="($refs.input as HTMLInputElement).click()"
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
import { type PropType, computed, useId } from 'vue';

const elementId = useId();

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean, Array],
    default: '',
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
  type: {
    type: String as PropType<'checkbox' | 'radio'>,
    default: 'radio',
  },
});

const inputValue = computed({
  get: () => props.modelValue,
  set(value) {
    emit('update:modelValue', value);
  },
});

const isChecked = computed(() => (
  (typeof inputValue.value === 'object')
    ? inputValue.value.includes(props.value)
    : inputValue.value === props.value
));
</script>

<style lang="scss" scoped>
.app-radio {
  display: flex;
  width: fit-content;
  height: fit-content;
  padding: 0.625rem 1rem;
  background-color: $color--white;
  border: 1px solid $color--neutral-300;
  border-radius: $radius--full;
  color: $color--text;
  font-size: 1rem;
  font-weight: $font-weight--medium;
  position: relative;
  &:not([data-checked="true"], [data-disabled="true"]):hover {
    border-color: $color--text-300;
    transition: border-color $transition--fastest linear;
    cursor: pointer;
  }
  &:has(input[type="checkbox"]) {
    cursor: pointer;
  }
  &:has(input:focus-visible) {
    outline: 2px solid $color--focus-ring;
    outline-offset: -2px;
  }
  &[data-size="small"] {
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
  }
  &[data-checked="true"] {
    color: $color--blue-800;
    border-color: $color--blue-800;
    background: linear-gradient(23deg, #FAFAFA, #FFF 100%);
    transition: border-color $transition--fastest linear;
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
