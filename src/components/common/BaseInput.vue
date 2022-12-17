<template>
  <textarea
    v-if="type === 'textarea'"
    class="base-input base-input--textarea"
    @change="$emit('change', $event)"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
  <input
    v-else
    class="base-input"
    :type="type"
    :readonly="readonly"
    :value="modelValue"
    @change="$emit('change', $event)"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>

<script lang="ts" setup>
defineEmits(['change', 'update:modelValue']);
defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'text',
  },
});
</script>

<style lang="scss" scoped>
.base-input {
  --min-height: 2.75rem;
  --border-color: #{$color--gray-1};

  width: 100%;
  padding: 0;
  color: $color--text-darken;
  outline: none;
  border: 0;
  &:-webkit-autofill,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-text-fill-color: $color--text-darken;
    box-shadow: 0 0 0 30px $color--white inset !important;
  }
  &::placeholder {
    color: $color--text-lighten;
  }
  &:not([readonly]) {
    min-height: var(--min-height);
    padding: 0 1rem;
    border: 1px solid var(--border-color);
    border-radius: 0.5rem;
    transition:
      border-color $transition--fastest ease-in-out,
      box-shadow $transition--fastest ease-in-out;
    &:hover {
    --border-color: #{$color--text-lighten};
    }
    &:focus {
      --border-color: #{$color--primary};
      box-shadow: 0 0 0 0.2rem get-hexadecimal-transparency($color--primary, 25);
    }
  }
  &[readonly] {
    cursor: default;
  }
  &[type="password"] {
    font-family: Verdana, sans-serif;
    letter-spacing: 0.125em;
  }
  &.base-input--textarea {
    --min-height: 7rem;
    padding: 0.5rem 1rem;
  }
}
</style>
