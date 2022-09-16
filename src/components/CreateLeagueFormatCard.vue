<template>
  <label
    class="league-format-card"
    :class="{ 'league-format-card--checked': isChecked }"
    :for="id"
  >
    <input
      v-model="inputValue"
      class="league-format-card__input"
      type="radio"
      :value="value"
      :id="id"
    />
    <div class="league-format-card__control">
      <IconRadioControl
        class="league-format-card__control-icon"
        :checked="isChecked"
      />
    </div>
    <img
      class="league-format-card__image"
      alt="Format icon"
      :src="image"
    />
    <slot>
      <span class="league-format-card__label">
        {{ label }}
      </span>
    </slot>
  </label>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import IconRadioControl from './icons/IconRadioControl.vue';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  id: {
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

const isChecked = computed(() => inputValue.value === props.value);
</script>

<style lang="scss" scoped>
.league-format-card {
  --background-color: #{$color--white};
  --border-color: #{$color--light-gray-1};
  &--checked {
    --background-color: #{$color--light-gray-2};
    --border-color: #{$color--tertiary};
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1rem;
  background-color: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  transition: background-color $transition--fastest ease-in;
  position: relative;
  cursor: pointer;
  &:hover {
    background-color: $color--light-gray-2;
  }
  &__image {
    width: 4rem;
    height: 4rem;
    margin-bottom: 0.5rem;
  }
  &__label {
    color: $color--text-darken;
    font-weight: $font-weight--semibold;
  }
  &__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }
  &__control {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
  &__control-icon {
    width: 1rem;
    height: 1rem;
  }
}
</style>
