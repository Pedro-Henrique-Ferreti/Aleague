<template>
  <div class="search-field">
    <BaseIcon
      class="search-field__icon"
      :icon="icon"
    />
    <BaseInput
      v-model="value"
      class="search-field__input"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      @focus="$attrs.onFocus"
      @blur="$attrs.onBlur"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import BaseInput from './common/BaseInput.vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: 'search',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>

<style lang="scss" scoped>
.search-field {
  --icon-size: 1rem;
  --icon-padding: 1rem;

  position: relative;
  .search-field__input {
    padding-left: calc(var(--icon-size) + (var(--icon-padding) * 2));
    &::placeholder {
      transition: opacity $transition--fastest ease-out;
    }
    &:focus::placeholder {
      opacity: 0;
    }
  }
  &__icon {
    width: var(--icon-size);
    height: var(--icon-size);
    position: absolute;
    top: 50%;
    left: var(--icon-padding);
    transform: translateY(-50%);
  }
}
</style>
