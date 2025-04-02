<template>
  <label
    class="toggle"
    :for="elementId"
    :data-checked="modelValue"
  >
    <span
      v-if="textLeft"
      v-text="textLeft"
      class="toggle__label"
    />
    <div class="toggle__input-wrapper">
      <input
        v-bind="$attrs"
        v-model="inputValue"
        ref="toggle"
        class="toggle__input"
        type="checkbox"
        :id="elementId"
        :disabled="disabled"
        @keypress.enter="($refs.toggle as HTMLInputElement).click()"
      />
      <div class="toggle__control">
        <span class="toggle__slider">
          <IconSpinner
            v-if="isLoading"
            size="12"
            class="toggle__slider-icon"
          />
          <IconCheck
            v-else-if="showIcon && modelValue"
            class="toggle__slider-icon"
          />
        </span>
      </div>
    </div>
    <span
      v-if="text"
      v-text="text"
      class="toggle__label"
    />
  </label>
</template>

<script lang="ts" setup>
import { useId } from 'vue';
import IconCheck from '@/assets/icons/Check.svg';
import IconSpinner from './IconSpinner.vue';

const elementId = useId();

defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    default: '',
  },
  textLeft: {
    type: String,
    default: '',
  },
  showIcon: {
    type: Boolean,
    default: true,
  },
});

const inputValue = defineModel({ type: Boolean, default: false });
</script>

<style lang="scss" scoped>
.toggle {
  --control-width: 3rem;
  --slider-icon-color: #{$color--primary-800};
  &[data-checked="true"] {
    --bg-color: #{$color--primary-800};
    --slider-translate: calc(var(--control-width) / 2);
  }
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: fit-content;
  &__label {
    color: $color--text-strong;
  }
  &__input-wrapper {
    display: flex;
  }
  &__input {
    width: 0;
    height: 0;
    opacity: 0;
    &:focus-visible {
      + .toggle__control {
        outline: 2px solid $color--focus-ring;
        outline-offset: 0.25rem;
      }
    }
    &:disabled {
      + .toggle__control {
        cursor: default;
      }
    }
  }
  &__control {
    display: flex;
    align-items: center;
    width: var(--control-width);
    height: 1.5rem;
    background-color: var(--bg-color, #{$color--text-200});
    border-radius: $radius--full;
    position: relative;
    cursor: pointer;
  }
  &__slider {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.25rem;
    height: 1.25rem;
    margin: 0 0.125rem;
    background-color: $color--white;
    border-radius: $radius--full;
    box-shadow: 0 0 4px 0 #7e7e7e40;
    position: absolute;
    left: 0;
    transform: translateX(var(--slider-translate));
    transition: $transition--1;
  }
  &__slider-icon {
    --indicator-color: var(--slider-icon-color);
    width: 0.75rem;
    fill: var(--slider-icon-color);
  }
}
</style>
