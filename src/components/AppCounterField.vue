<template>
  <div class="counter-field">
    <button
      class="counter-field__button counter-field__button--decrement"
      type="button"
      aria-label="Decrease value by one"
      @click="inputValue--"
    >
      <BaseIcon
        class="counter-field__button-icon"
        icon="minus"
      />
    </button>
    <input
      v-model="inputValue"
      class="counter-field__input"
      type="number"
      :min="min"
      :max="max || undefined"
      :aria-labelledby="labelledBy"
    />
    <button
      class="counter-field__button counter-field__button--increment"
      type="button"
      aria-label="Increase value by one"
      @click="inputValue++"
    >
      <BaseIcon
        class="counter-field__button-icon"
        icon="plus"
      />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import BaseIcon from './common/BaseIcon.vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 0,
  },
  labelledBy: {
    type: String,
    required: true,
  },
});

const inputValue = computed({
  get () {
    return props.modelValue;
  },
  set(value) {
    if (value < props.min || (props.max !== 0 && value > props.max)) return;

    emit('update:modelValue', Number(value));
  },
});
</script>

<style lang="scss" scoped>
.counter-field {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  &__button {
    --color: transparent;
    &--decrement {
      --color: #{$color--danger};
    }
    &--increment {
      --color: #{$color--success-500};
    }

    @include focus-ring;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    background-color: transparent;
    border: 1px solid var(--color);
    border-radius: 50%;
    transition: background-color $transition--fastest ease-in;
    &:hover {
      background-color: $color--light-gray-1;
    }
  }
  &__button-icon {
    width: 0.75rem;
    height: 0.75rem;
    fill: var(--color);
  }
  &__input {
    width: 1.5rem;
    border: 0;
    background-color: transparent;
    color: $color--text-darken;
    font-size: 1.125rem;
    font-weight: $font-weight--semibold;
    text-align: center;
    outline: none;
  }
}
</style>
