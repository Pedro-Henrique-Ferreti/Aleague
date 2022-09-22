<template>
  <div
    class="add-participants-field"
    :class="{ 'add-participants-field--list-open': showAutocompleteList }"
  >
    <AppLargeField
      v-bind="$attrs"
      v-model.trim="inputValue"
      @focus="inputIsFocused = true"
      @blur="handleBlur"
    />
    <AppButton
      class="add-participants-field__button"
      :disabled="inputValue === ''"
      :size="showSmallButton ? 'small' : null"
      @click="addTeam"
    >
      Adicionar
    </AppButton>
    <AppTransition name="fade">
      <div
        v-if="showAutocompleteList"
        class="add-participants-field__autocomplete-list"
      >
        <div
          v-for="option in autocompleteList.slice(0, 8)"
          class="add-participants-field__autocomplete-list-item"
          :key="option"
          @click="selectOption(option)"
        >
          {{ option }}
        </div>
      </div>
    </AppTransition>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, type PropType } from 'vue';
import { useMediaQuery } from '@vueuse/core';
import AppLargeField from './AppLargeField.vue';
import AppTransition from './AppTransition.vue';

const emit = defineEmits(['update:modelValue', 'add-team']);
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  autocompleteOptions: {
    type: Array as PropType<string[]>,
    default: () => ([]),
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
const inputIsFocused = ref(false);

const showSmallButton = useMediaQuery('(min-width: 600px)');

// Autocomplete list
const showAutocompleteList = computed(() => {
  return props.autocompleteOptions.length > 0
    && inputIsFocused.value
    && inputValue.value.length > 0
    && autocompleteList.value.length > 0;
});

const autocompleteList = computed(() => props.autocompleteOptions.filter(
  (option) => option.toLowerCase().includes(inputValue.value.toLowerCase()),
));

function handleBlur() {
  setTimeout(() => inputIsFocused.value = false, 300);
}

function selectOption(option: string) {
  inputValue.value = option;
  addTeam();
}

function addTeam() {
  emit('add-team');
}
</script>

<style lang="scss" scoped>
.add-participants-field {
  position: relative;
  &--list-open {
    :deep(.base-input) {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      box-shadow: 0 15px 40px 0 rgba(74, 84, 114, 0.1);
    }
  }
  &__button {
    @include for-tablet-portrait-down {
      width: 100%;
      margin-top: 1rem;
    }
    @include for-tablet-portrait-up {
      position: absolute !important;
      top: 50%;
      right: 1rem;
      transform: translateY(-50%);
    }
  }
  &__autocomplete-list {
    @include hide-shadow($top: true);
    width: 100%;
    background-color: $color--white;
    border: 1px solid $color--light-gray-1;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    box-shadow: 0 15px 40px 0 rgba(74, 84, 114, 0.1);
    position: absolute;
    top: calc(100% - 1px);
  }
  &__autocomplete-list-item {
    display: flex;
    align-items: center;
    min-height: 2.5rem;
    padding: 0 1rem;
    transition: all $transition--fastest ease-in;
    cursor: pointer;
    &:hover {
      background-color: $color--light-gray-2;
      color: $color--text-darken;
    }
  }
}
</style>
