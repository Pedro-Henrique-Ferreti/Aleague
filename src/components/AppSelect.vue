<template>
  <div class="app-select">
    <label
      v-if="label"
      v-text="label"
      class="app-label"
      :for="id"
    />
    <select
      v-model="inputValue"
      class="app-select__input"
      :id="id"
      :readonly="readonly"
      :aria-label="label ? undefined : ariaLabel"
    >
      <slot>
        <option
          v-for="option in options"
          v-text="option.text"
          :key="option.id"
          :value="option.id"
        />
      </slot>
    </select>
  </div>
</template>

<script lang="ts" setup>
import type { SelectOption } from '@/types/Select';
import { computed, type PropType } from 'vue';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  ariaLabel: {
    type: String,
    default: '',
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array as PropType<SelectOption[]>,
    default: () => ([]),
  },
});

const inputValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>

<style lang="scss" scoped>
.app-select {
  &__input {
    width: 100%;
    min-height: 2.75rem;
    padding: 0 1rem;
    background-color: $color--white;
    color: $color--text-darken;
    border: 1px solid $color--gray-1;
    border-radius: 0.5rem;
    outline: none;
    cursor: pointer;
    &:focus {
      border-color: $color--text-lighten;
    }
  }
}
</style>
