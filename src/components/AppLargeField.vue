<template>
  <div class="large-field">
    <BaseIcon
      class="large-field__icon"
      :icon="icon"
    />
    <BaseInput
      v-model="value"
      class="large-field__input"
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
.large-field {
  --icon-size: 1.25rem;
  --icon-padding: 1rem;

  position: relative;
  .large-field__input {
    --min-height: 3.25rem;
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
