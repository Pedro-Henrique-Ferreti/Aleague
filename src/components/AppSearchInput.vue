<template>
  <div
    class="search-input"
    :class="$attrs.class"
    :data-size="size"
  >
    <IconSearch class="search-input__icon" />
    <input
      v-model.trim="inputValue"
      v-bind="$attrs"
      ref="inputRef"
      class="search-input__input"
      type="text"
      aria-label="Pesquisar"
      :id="elementId"
    />
  </div>
</template>

<script lang="ts" setup>
import {
  computed, useTemplateRef, type PropType, useId,
} from 'vue';
import IconSearch from '@/assets/icons/Search.svg';

defineOptions({ inheritAttrs: false });
const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  size: {
    type: String as PropType<'small'>,
    default: '',
  },
});

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const elementId = useId();

// Input ref
const inputRef = useTemplateRef('inputRef');

function focus() {
  inputRef.value?.focus();
}

// Exposed values
defineExpose({
  focus,
});
</script>

<style lang="scss" scoped>
.search-input {
  --input-padding: 3.125rem;
  position: relative;
  &[data-size="small"] {
    --input-height: 2.25rem;
    --input-padding: 0.75rem;
    --input-font-size: 0.875rem;
  }
  &__input {
    width: 100%;
    height: var(--input-height, 2.75rem);
    padding: 0 var(--input-padding);
    color: $color--text;
    background-color: $color--neutral-100;
    border: 1px solid transparent;
    border-radius: $radius--full;
    font-size: var(--input-font-size, 1rem);
    transition: border-color $transition--fastest ease-in;
    &:hover {
      border-color: $color--text-300;
    }
    &::placeholder {
      color: $color--text-500;
    }
  }
  &__icon {
    max-width: 1.25rem;
    fill: $color--text-strong;
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
    pointer-events: none;
  }
}
</style>
