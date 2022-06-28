<template>
  <div class="text-field">
    <label
      class="text-field__label"
      v-if="label"
      v-text="label"
      :for="id"
    />
    <BaseInput
      :type="type"
      :id="id"
      :aria-label="label ? null : ariaLabel"
      v-model="inputValue"
    />
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
  &__label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    font-weight: $font-weight--semibold;
  }
}
</style>
