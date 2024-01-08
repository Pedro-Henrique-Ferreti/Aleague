<template>
  <div
    class="text-field"
    :class="textFieldClasses"
  >
    <label
      v-if="label"
      v-text="label"
      class="app-label"
      :for="id"
    />
    <div class="text-field__input-wrapper">
      <BaseInput
        v-model="inputValue"
        class="text-field__input"
        :type="type"
        :id="id"
        :readonly="readonly"
        :aria-label="label ? null : ariaLabel"
        @change="handleChange"
      />
      <BaseIcon
        class="text-field__icon text-field__icon--valid"
        icon="check"
      />
      <BaseIcon
        class="text-field__icon text-field__icon--invalid"
        icon="error-circle"
      />
    </div>
    <small class="text-field__message">{{ errorMessage }}</small>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import BaseInput from './common/BaseInput.vue';
import BaseIcon from './common/BaseIcon.vue';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  modelModifiers: {
    type: Object,
    default: () => ({}),
  },
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  ariaLabel: {
    type: String,
    default: '',
  },
  dirty: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: '',
  },
});

const textFieldClasses = computed(() => ({
  'text-field--valid': props.dirty && !props.errorMessage,
  'text-field--invalid': props.dirty && props.errorMessage,
}));

const inputValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    if (!props.modelModifiers.lazy) {
      emit('update:modelValue', value);
    }
  },
});

function handleChange(event: Event) {
  if (props.modelModifiers.lazy) {
    emit('update:modelValue', (event.target as HTMLInputElement).value);
  }
}
</script>

<style lang="scss" scoped>
.text-field {
  --message-display: none;
  --icon-valid-display: none;
  --icon-invalid-display: none;
  &--valid {
    --icon-valid-display: block;
  }
  &--invalid {
    --message-display: block;
    --icon-invalid-display: block;
  }
  &--valid,
  &--invalid {
    .text-field__input {
      padding-right: 2.25rem;
    }
  }
  &__input-wrapper {
    display: flex;
    align-items: center;
    position: relative;
  }
  &__icon {
    width: 1rem;
    height: 1rem;
    position: absolute;
    right: 0.75rem;
    &--valid {
      display: var(--icon-valid-display);
      fill: $color--success-500;
    }
    &--invalid {
      display: var(--icon-invalid-display);
      fill: $color--danger;
    }
  }
  &__message {
    display: var(--message-display);
    margin-top: 0.5rem;
    color: $color--danger;
    font-size: 0.8125rem;
    font-weight: $font-weight--semibold;
  }
}
</style>
