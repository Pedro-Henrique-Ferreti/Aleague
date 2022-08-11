<template>
  <input
    class="base-input"
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
});
</script>

<style lang="scss" scoped>
.base-input {
  --border-color: #{$color--gray-1};

  width: 100%;
  min-height: 2.75rem;
  padding: 0 1rem;
  color: $color--text-darken;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  outline: none;
  transition: border-color $transition--fast ease-in-out;
  &:-webkit-autofill,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-text-fill-color: $color--text-darken;
    box-shadow: 0 0 0 30px $color--white inset !important;
  }
  &:hover {
    --border-color: #{$color--text-lighten};
  }
  &:focus {
    --border-color: #{$color--primary};
  }
  &::placeholder {
    color: $color--text-lighten;
  }
  &[type="password"] {
    font-family: Verdana, sans-serif;
    letter-spacing: 0.125em;
  }
}
</style>
