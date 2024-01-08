<template>
  <div class="app-textarea">
    <label
      v-if="label"
      v-text="label"
      class="app-label"
      :for="id"
    />
    <BaseInput
      v-model="inputValue"
      class="app-textarea__input"
      type="textarea"
      :id="id"
      :aria-label="label ? null : ariaLabel"
      :maxlength="maxlength > 0 ? maxlength : null"
    />
    <small
      v-if="maxlength > 0"
      class="app-textarea__characters-count"
    >
      Caracteres: {{ inputValue.length }} / {{ maxlength }}
    </small>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import BaseInput from './common/BaseInput.vue';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  modelValue: {
    type: String,
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
  ariaLabel: {
    type: String,
    default: '',
  },
  maxlength: {
    type: Number,
    default: 0,
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
.app-textarea {
  &__characters-count {
    display: block;
    text-align: right;
    font-size: 0.875rem;
  }
}
</style>
