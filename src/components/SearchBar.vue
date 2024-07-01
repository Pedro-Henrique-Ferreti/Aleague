<template>
  <div class="search-bar">
    <label
      class="search-bar__input"
      for="search-bar-input"
    >
      <IconSearch class="search-bar__input-icon" />
      <input
        v-model.trim="inputValue"
        id="search-bar-input"
        class="search-bar__input-field"
        type="serach"
        placeholder="Pesquisar"
      />
    </label>
    <div
      v-if="$slots.default"
      class="search-bar__controls"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import IconSearch from '@/assets/icons/IconSearch.svg';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});

const inputValue = computed({
  get: () => props.modelValue,
  set(value: string) {
    emit('update:modelValue', value);
  },
});
</script>

<style lang="scss" scoped>
.search-bar {
  display: grid;
  gap: 1.5rem;
  width: 100%;
  padding: 1rem 1.25rem;
  margin-bottom: 2rem;
  background-color: $color--white;
  border-radius: $radius--medium;
  box-shadow: $shadow--card;
  @include for-tablet-landscape-up {
    grid-template-columns: 1fr auto;
    align-items: center;
  }
  &__input {
    display: flex;
    align-items: center;
    height: 2.75rem;
    position: relative;
  }
  &__input-icon {
    width: 1.25rem;
    height: auto;
    position: absolute;
    left: 0;
  }
  &__input-field {
    width: 100%;
    height: inherit;
    padding-left: 2rem;
    border: 0;
    outline: none;
    &:focus::placeholder {
      opacity: 0;
      transition: opacity $transition--fastest linear;
    }
  }
  &__controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem;
  }
}
</style>
