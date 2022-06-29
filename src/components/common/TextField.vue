<template>
  <div
    class="text-field"
    :class="textFieldClasses"
  >
    <label
      class="text-field__label"
      v-if="label"
      v-text="label"
      :for="id"
    />
    <div class="text-field__input-wrapper">
      <BaseInput
        class="text-field__input"
        :type="type"
        :id="id"
        :aria-label="label ? null : ariaLabel"
        v-model="inputValue"
      />
      <BaseIcon
        class="text-field__icon"
        icon="save"
      />
    </div>
    <small class="text-field__message">
      Por favor, digite seu email
    </small>
  </div>
</template>

<script setup>
import { computed } from 'vue';

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
  type: {
    type: String,
    default: 'text',
  },
  ariaLabel: {
    type: String,
    default: '',
  },
});

const textFieldClasses = computed(() => ({
  'text-field--error': true,
}));

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
.text-field {
  --color: #{$color--text};
  --message-display: none;

  &--error {
    --message-display: block;
    --color: #{$color--danger};
  }
  &__label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    font-weight: $font-weight--semibold;
  }
  &__input-wrapper {
    display: flex;
    align-items: center;
    position: relative;
  }
  &__icon {
    width: 1rem;
    height: 1rem;
    fill: var(--color);
    position: absolute;
    right: 0.75rem;
  }
  &__message {
    display: var(--message-display);
    margin-top: 0.5rem;
    color: var(--color);
    font-size: 0.8125rem;
    font-weight: $font-weight--semibold;
  }
}
</style>
