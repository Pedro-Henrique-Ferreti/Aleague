<template>
  <div
    class="switch"
    :data-checked="inputValue"
  >
    <span
      v-if="showLabels"
      class="switch__label"
      aria-hidden="true"
    >
      Não
    </span>
    <div class="switch__control">
      <input
        v-model="inputValue"
        class="switch__input"
        type="checkbox"
        role="switch"
        :aria-checked="inputValue"
        :aria-labelledby="labelledBy"
      />
      <div class="switch__control-track" />
    </div>
    <span
      v-if="showLabels"
      class="switch__label"
      aria-hidden="true"
    >
      Sim
    </span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  showLabels: {
    type: Boolean,
    default: false,
  },
  labelledBy: {
    type: String,
    required: true,
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
.switch {
  --control-bg: #{$color--text-lighten};
  --track-translate: 0;
  &[data-checked="true"] {
    --control-bg: #{$color--secondary};
    --track-translate: 1.75rem;
  }

  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  &__label {
    color: $color--text-darken;
  }
  &__control {
    width: 3.25rem;
    height: 1.5rem;
    background-color: var(--control-bg);
    border-radius: 2rem;
    position: relative;
    transition: background-color $transition--fastest ease-in;
  }
  &__control-track {
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    background-color: $color--white;
    box-shadow: 0 0 4px 0 rgba(51, 51, 51, 0.25);
    position: absolute;
    top: 0.125rem;
    left: 0.125rem;
    transform: translateX(var(--track-translate));
    transition: transform $transition--fastest linear;
  }
  &__input {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0;
    z-index: 1;
    cursor: pointer;
  }
}
</style>
