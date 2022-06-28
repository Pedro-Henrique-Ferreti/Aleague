<template>
  <div class="base-input">
    <label
      class="base-input__label"
      :for="id"
    >{{ label }}</label>
    <input
      class="base-input__input"
      type="text"
      :id="id"
      :aria-label="label ? null : ariaLabel"
    />
  </div>
</template>

<script setup>
defineProps({
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
});
</script>

<style lang="scss" scoped>
.base-input {
  --border-color: #{$color--gray-1};

  &__label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    font-weight: $font-weight--semibold;
  }
  &__input {
    width: 100%;
    min-height: 2.75rem;
    padding: 0 1rem;
    color: $color--text-darken;
    border: 1px solid var(--border-color);
    border-radius: 0.5rem;
    outline: none;
    transition: border-color $transition--fast ease-in-out;
    &:hover{
      --border-color: #{$color--text-lighten};
    }
    &:focus {
      --border-color: #{$color--primary};
    }
  }
}
</style>
