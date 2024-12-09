<template>
  <div
    class="search-input"
    :data-size="size"
  >
    <IconSearch class="search-input__icon" />
    <input
      v-model.trim="inputValue"
      class="search-input__input"
      type="text"
      placeholder="Pesquisar"
      aria-label="Pesquisar"
      :id="id"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, type PropType } from 'vue';
import IconSearch from '@/assets/icons/Search.svg';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    required: true,
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
</script>

<style lang="scss" scoped>
.search-input {
    --input-padding: 1rem;
    position: relative;
  &[data-size="small"] {
    --input-height: 2.25rem;
    --input-padding: 0.75rem;
    --input-font-size: 0.875rem;
  }
  &__input {
    width: 100%;
    height: var(--input-height, 2.75rem);
    padding: var(--input-padding);
    color: $color--text;
    border: 1px solid $color--neutral-300;
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
    max-width: 1rem;
    fill: $color--text-400;
    position: absolute;
    top: 50%;
    right: var(--input-padding);
    transform: translateY(-50%);
    pointer-events: none;
  }
}
</style>
