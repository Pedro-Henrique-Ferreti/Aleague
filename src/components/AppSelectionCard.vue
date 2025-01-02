<template>
  <label
    class="selection-card"
    tabindex="0"
    :for="elementId"
    :data-checked="inputValue === value"
    @keypress.enter="inputValue = value"
  >
    <div class="selection-card__icon-wrapper">
      <Component
        class="selection-card__icon"
        :is="icon"
      />
    </div>
    <input
      v-model="inputValue"
      class="selection-card__input"
      type="radio"
      tabindex="-1"
      :id="elementId"
      :value="value"
    />
    {{ text }}
  </label>
</template>

<script lang="ts" setup>
import { useId } from 'vue';

const elementId = useId();

defineProps({
  value: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
  icon: {
    type: null,
    required: true,
  },
});

const inputValue = defineModel('modelValue', { type: String, default: '' });
</script>

<style lang="scss" scoped>
.selection-card {
  --border-color: #{$color--neutral-300};
  --icon-color: #{$color--text};
  &[data-checked="true"] {
    --border-color: #{$color--primary-800};
    --icon-color: #{$color--primary-800};
  }
  width: 10.5rem;
  height: fit-content;
  padding: 0.5rem;
  background-color: $color--neutral-50;
  border: 1px solid var(--border-color);
  border-radius: 0.625rem;
  color: $color--text-strong;
  cursor: pointer;
  transition: border-color $transition--fastest linear;
  &:hover:not([data-checked="true"]) {
    border-color: $color--text-300;
  }
  &__icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.5rem;
    width: 2.25rem;
    height: 2.25rem;
    background-color: $color--white;
    border: 1px solid $color--neutral-100;
    border-radius: 0.375rem;
  }
  &__icon {
    width: 100%;
    height: 100%;
    max-width: 1.5rem;
    max-height: 1.5rem;
    color: var(--icon-color);
    transition: color $transition--fastest linear;
  }
  &__input {
    width: 0;
    height: 0;
    opacity: 0;
    position: absolute;
  }
}
</style>
