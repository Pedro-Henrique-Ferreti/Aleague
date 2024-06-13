<template>
  <div
    class="app-input"
    :data-disabled="disabled"
    :data-valid="showValidState"
    :data-invalid="showInvalidState"
    :data-float-label="floatLabel"
    :data-password-reveal="renderPasswordRevealButton"
  >
    <label
      v-if="label"
      v-text="label"
      class="app-input__label"
      :for="id"
    />
    <div class="app-input__content">
      <BaseInput
        v-model="inputValue"
        v-bind="$attrs"
        ref="input"
        class="app-input__input"
        :id="id"
        :type="inputType"
        :disabled="disabled"
        :aria-label="label ? null : ariaLabel"
        :model-modifiers="modelModifiers"
        :maxlength="maxCharacters || null"
      />
      <button
        v-if="renderPasswordRevealButton"
        class="app-input__password-button"
        type="button"
        :title="passwordIsVisible ? 'Hide password' : 'Show password'"
        @click="passwordIsVisible = !passwordIsVisible"
      >
        <!-- <IconEyeOpen
          v-if="passwordIsVisible"
          class="app-input__password-icon"
        />
        <IconEyeClosed
          v-else
          class="app-input__password-icon"
        /> -->
      </button>
    </div>
    <small
      v-if="validationMessage"
      v-text="validationMessage"
      class="app-input__validation-message"
    />
    <div class="app-input__support-text">
      <slot name="support-text">
        <span
          v-if="typeof inputValue === 'string' && maxCharacters > 0"
          class="app-input__remaining-characters"
        >
          Characters remaining: {{ maxCharacters - inputValue.length }}
        </span>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  type Ref,
  type PropType,
  ref,
  computed,
} from 'vue';
// import IconEyeClosed from './icons/IconEyeClosed.vue';
// import IconEyeOpen from './icons/IconEyeOpen.vue';
import BaseInput from './BaseInput.vue';

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
  type: {
    type: String,
    default: 'text',
  },
  label: {
    type: String,
    default: '',
  },
  ariaLabel: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  successMessage: {
    type: String,
    default: '',
  },
  errorMessage: {
    type: String as PropType<string | Ref<string>>,
    default: '',
  },
  dirty: {
    type: Boolean,
    default: false,
  },
  allowPasswordReveal: {
    type: Boolean,
    default: false,
  },
  floatLabel: {
    type: Boolean,
    default: false,
  },
  maxCharacters: {
    type: Number,
    default: 0,
  },
});

const inputValue = computed({
  get: () => props.modelValue,
  set(value) {
    emit('update:modelValue', value);
  },
});

// Validation state
const showValidState = computed(() => (
  props.dirty
  && !props.errorMessage
  && !!props.successMessage
));
const showInvalidState = computed(() => (props.dirty && !!props.errorMessage));
const validationMessage = computed(() => {
  if (showInvalidState.value) return props.errorMessage;
  if (showValidState.value) return props.successMessage;
  return '';
});

// Password reveal
const passwordIsVisible = ref(false);
const renderPasswordRevealButton = computed(() => (
  props.type === 'password' && props.allowPasswordReveal
));

// Input type
const inputType = computed(() => {
  if (!renderPasswordRevealButton.value) {
    return props.type;
  }

  return (passwordIsVisible.value) ? 'text' : 'password';
});
</script>

<style lang="scss" scoped>
.app-input {
  --success-color: #{$color--success-600};
  --invalid-color: #{$color--danger};
  &[data-valid="true"] {
    --validation-message-text-color: var(--success-color);
    .app-input__input:not(:focus) {
      --outline-color: var(--success-color);
    }
  }
  &[data-invalid="true"] {
    --validation-message-text-color: var(--invalid-color);
    .app-input__input:not(:focus) {
      --outline-color: var(--invalid-color);
    }
  }
  &[data-float-label="true"] {
    position: relative;
    .app-input__label {
      position: absolute;
      bottom: 100%;
    }
  }
  &[data-password-reveal="true"] {
    .app-input__input {
      padding-right: 2.5rem;
    }
  }
  &[data-valid="true"], &[data-invalid="true"] {
    --password-button-height: calc(100% - 0.25rem);
    --password-button-right: 0.125rem;
  }
  &__content {
    position: relative;
  }
  &__password-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: var(--password-button-height, calc(100% - 0.125rem));
    border-top-right-radius: $radius--medium;
    border-bottom-right-radius: $radius--medium;
    outline-color: var(--rt-outlineColor);
    transition: background-color $transition--fastest ease-in;
    position: absolute;
    top: 50%;
    right: var(--password-button-right, 1px);
    transform: translateY(-50%);
    &:hover {
      background-color: $color--neutral-300;
    }
  }
  &__password-icon {
    width: 1.25rem;
    fill: var(--icon-color, #{$color--text});
  }
  &__label {
    display: block;
    margin-bottom: 0.375rem;
    color: $color--text-strong;
    font-size: 0.875rem;
  }
  &__validation-message,
  &__support-text {
    margin-top: 0.25rem;
    font-size: 0.75rem;
  }
  &__validation-message {
    color: var(--validation-message-text-color);
  }
  &__support-text:empty {
    display: none;
  }
}
</style>
