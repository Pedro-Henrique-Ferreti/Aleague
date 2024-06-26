<template>
  <textarea
    v-if="type === 'textarea'"
    v-model="inputValue"
    class="base-input base-input--textarea"
    :id="id"
    :disabled="disabled"
    @change="handleChange(($event.target as HTMLInputElement).value)"
  />
  <input
    v-else-if="mask"
    class="base-input"
    :id="id"
    ref="input"
    type="text"
    :disabled="disabled"
    @blur="handleChange(imaskInstance?.unmaskedValue || '')"
  />
  <input
    v-else
    v-model="inputValue"
    class="base-input"
    :id="id"
    :type="type"
    :disabled="disabled"
    @change="handleChange(($event.target as HTMLInputElement).value)"
  />
</template>

<script lang="ts" setup>
import {
  type PropType,
  ref,
  watch,
  onMounted,
  computed,
} from 'vue';
import IMask, { type InputMask } from 'imask';

const emit = defineEmits(['change', 'update:modelValue']);
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'text',
  },
  id: {
    type: String,
    required: true,
  },
  mask: {
    type: [String, RegExp, Function],
    default: '',
  },
  maskOptions: {
    type: Object,
    default: () => ({}),
  },
  modelModifiers: {
    type: Object as PropType<{ lazy?: boolean }>,
    default: () => ({}),
  },
});

const inputValue = computed({
  get: () => props.modelValue,
  set(value: string | number) {
    if (!props.modelModifiers.lazy) {
      emit('update:modelValue', value);
    }
  },
});

function handleChange(value: string) {
  if (props.modelModifiers.lazy) {
    emit('update:modelValue', value);
  }
}

// IMask setup
const input = ref<HTMLInputElement | null>(null);
let imaskInstance: InputMask<{ mask: string }> | null = null;

function setupIMask() {
  if (!props.mask || !input.value) return;

  imaskInstance = IMask(input.value, {
    mask: props.mask as string,
    ...props.maskOptions,
  });

  imaskInstance.value = props.modelValue as string;

  if (!props.modelModifiers.lazy) {
    imaskInstance.on('accept', () => {
      emit('update:modelValue', imaskInstance?.unmaskedValue);
    });
  }
}

onMounted(setupIMask);

// Update IMask value when prop modelValue changes
function resetImaskValue() {
  if (imaskInstance) {
    imaskInstance.unmaskedValue = props.modelValue as string;
  }
}

watch(() => props.modelValue, resetImaskValue);

// Update IMask options when mask changes
watch(() => props.mask, () => {
  if (!imaskInstance) return;
  imaskInstance.updateOptions({ mask: props.mask as string });
  resetImaskValue();
});
</script>

<style lang="scss" scoped>
.base-input {
  --outline-color: transparent;
  width: 100%;
  min-height: 2.75rem;
  padding: 0 1rem;
  background-color: $color--white;
  color: $color--text;
  border: 1px solid $color--neutral-300;
  border-radius: $radius--large;
  outline: 2px solid var(--outline-color);
  outline-offset: -1px;
  transition:
    outline-color $transition--fastest ease-in,
    border-color $transition--fastest ease-in;
  &--textarea {
    padding: 0.5rem 1rem;
    min-height: 4rem;
  }
  &:-webkit-autofill,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-text-fill-color: $color--text;
    box-shadow: 0 0 0 30px $color--white inset !important;
  }
  &:disabled {
    background-color: $color--neutral-100;
  }
  &:hover {
    border-color: $color--text-300;
  }
  &:focus {
    --outline-color: #{$color--primary-800};
  }
  &[type="password"] {
    font-family: Verdana, sans-serif;
    letter-spacing: 0.125em;
  }
}
</style>
