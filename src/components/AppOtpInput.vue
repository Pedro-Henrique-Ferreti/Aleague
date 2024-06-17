<template>
  <div class="otp-input">
    <div
      v-for="n in 6"
      class="otp-input__field"
      :key="n"
    >
      <input
        class="otp-input__field-input"
        ref="inputList"
        type="text"
        maxlength="1"
        :id="`otp-input-digit-${n}`"
        :aria-label="`Digito ${n}`"
        :value="inputValues[n - 1] || ''"
        :data-value="inputValues[n - 1] || null"
        @keyup="handleInput($event, n - 1)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});

const inputValues = computed(() => props.modelValue.split(''));

const inputList = ref<HTMLInputElement[]>([]);

function handleInput(event: KeyboardEvent, index: number) {
  const typedValue = (event.target as HTMLInputElement).value;
  const values = [...inputValues.value];

  values[index] = typedValue;

  const newValue = values.join('');

  emit('update:modelValue', newValue);

  const element = inputList.value[(typedValue) ? newValue.length : index - 1];

  element?.focus();
  element?.select();
}
</script>

<style lang="scss" scoped>
.otp-input {
  display: flex;
  width: 100%;
  &__field {
    display: flex;
    justify-content: center;
    align-items: center;
    width: inherit;
    position: relative;
    &:first-child .otp-input__field-input {
      border-top-left-radius: 0.75rem;
      border-bottom-left-radius: 0.75rem;
      border-left-width: 1px;
    }
    &:last-child .otp-input__field-input {
      border-top-right-radius: 0.75rem;
      border-bottom-right-radius: 0.75rem;
      border-right-width: 1px;
    }
    @supports selector(:has(a, b)) {
      &:hover {
        --after-bg-color: #{$color--text-400};
      }
      &:has(input:focus)::after,
      &:has(input[data-value])::after {
        display: none;
      }
      &::after {
        content: '';
        display: block;
        width: 0.5rem;
        aspect-ratio: 1 / 1;
        background-color: var(--after-bg-color, #{$color--text-300});
        border-radius: $radius--full;
        position: absolute;
        pointer-events: none;
        transition: background-color $transition--fast ease-in;
      }
    }
  }
  &__field-input {
    width: inherit;
    height: 3.5rem;
    border: 1px solid $color--neutral-300;
    border-left-width: 0;
    border-right-width: 0;
    text-align: center;
    font-size: 1.75rem;
    outline-color: transparent;
    outline-offset: -2px;
    transition: outline-color $transition--fast;
    &:focus {
      outline: 2px solid $color--focus-ring;
    }
  }
}
</style>
