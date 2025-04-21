<template>
  <Dropdown
    v-model:shown="menuIsOpen"
    theme="app-dropdown"
    auto-hide
    auto-size="min"
    :disabled="disabled"
    :triggers="['click']"
    @apply-show="setScrollPosition"
  >
    <div
      class="app-dropdown"
      :data-disabled="disabled"
      :data-size="size"
      :data-valid="showValidState"
      :data-invalid="showInvalidState"
      :data-float-label="floatLabel"
    >
      <span
        v-if="label"
        v-text="label"
        class="app-dropdown__label"
      />
      <slot>
        <div
          :id="elementId"
          ref="input"
          class="app-dropdown__input"
          tabindex="0"
          :data-rounded="rounded"
          @keypress.enter.prevent="menuIsOpen ? closeMenu() : openMenu()"
          @keydown.tab="closeMenu"
        >
          <img
            v-if="selectedOption?.icon"
            class="app-dropdown__input-icon"
            alt="Option icon"
            :src="selectedOption.icon"
          />
          <span
            v-text="selectedOption?.text || ''"
            role="combobox"
            aria-haspopup="listbox"
            :aria-expanded="menuIsOpen"
            :aria-disabled="disabled"
            :aria-controls="`${elementId}-list`"
            :aria-label="selectedOption?.text || ''"
          />
          <IconChevron class="app-dropdown__arrow-icon" />
        </div>
      </slot>
      <small
        v-if="validationMessage"
        v-text="validationMessage"
        class="app-dropdown__validation-message"
      />
      <div class="app-dropdown__support-text">
        <slot name="support-text" />
      </div>
    </div>
    <template #popper>
      <ul
        :id="`${elementId}-list`"
        class="app-dropdown__list"
        role="listbox"
        ref="dropdownList"
      >
        <li
          v-for="opt in options"
          class="app-dropdown__option"
          role="option"
          tabindex="-1"
          ref="dropdownOptions"
          :key="opt.id"
          :aria-selected="selectedOption?.id === opt.id"
          @click="onSelectOption(opt)"
          @keypress.enter.prevent="onSelectOption(opt)"
        >
          <img
            v-if="opt.icon"
            class="app-dropdown__input-icon"
            alt="Option icon"
            :src="(selectedOption?.id === opt.id && opt.iconSelected) ? opt.iconSelected : opt.icon"
          />
          <span>{{ opt.text }}</span>
        </li>
      </ul>
    </template>
  </Dropdown>
</template>

<script lang="ts" setup>
import type { DropdownOption } from '@/types/Dropdown';
import {
  computed, ref, useId, type PropType, type Ref,
} from 'vue';
import { Dropdown } from 'floating-vue';
import IconChevron from '@/assets/icons/Chevron.svg';

const elementId = useId();

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: [String, Number] as PropType<number | string | null>,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  ariaLabel: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  successMessage: {
    type: String,
    default: '',
  },
  errorMessage: {
    type: String as PropType<string | Ref<string>>,
    default: '',
  },
  dirty: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array as PropType<DropdownOption[]>,
    default: () => ([]),
  },
  floatLabel: {
    type: Boolean,
    default: false,
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<'small'>,
    default: null,
  },
});

const inputValue = computed({
  get: () => props.modelValue,
  set(value) {
    emit('update:modelValue', value);
  },
});

// Template refs
const input = ref<HTMLInputElement | null>(null);
const dropdownList = ref<HTMLDivElement | null>();

// Selected option
const selectedOption = computed(() => (
  props.options.find((option) => option.id === props.modelValue)
));

// Show/hide menu
const menuIsOpen = ref(false);

function openMenu() {
  menuIsOpen.value = true;
}

function closeMenu() {
  menuIsOpen.value = false;
}

function setScrollPosition() {
  dropdownList.value?.querySelector('[aria-selected="true"]')?.scrollIntoView({
    block: 'nearest',
    behavior: 'instant',
  });
}

function onSelectOption(option: DropdownOption) {
  inputValue.value = option.id;
  closeMenu();
  input.value?.focus();
}

// Validation state
const showValidState = computed(() => (
  props.dirty
  && !props.errorMessage
  && !!props.successMessage
));
const showInvalidState = computed(() => (props.dirty && !!props.errorMessage));
const validationMessage = computed(() => {
  if (showInvalidState.value) return props.errorMessage;
  if (showValidState.value) return props.successMessage;
  return '';
});
</script>

<style lang="scss" scoped>
.app-dropdown {
  --success-color: #{$color--success-600};
  --invalid-color: #{$color--danger};
  &[data-size="small"] {
    --min-height: 2.25rem;
    --border-radius: #{$radius--medium};
    font-size: 0.875rem;
  }
  // &[data-disabled="true"] {
  //   --label-color: #{$color--fds-neutral-600};
  //   --icon-color: #{$color--fds-neutral-600};
  // }
  // &[data-valid="true"] {
  //   --validation-message-color: var(--success-color);
  //   .app-dropdown__input:not(:focus) {
  //     --border-width: 0.125rem;
  //     --border-color: var(--success-color);
  //   }
  // }
  // &[data-invalid="true"] {
  //   --validation-message-color: var(--invalid-color);
  //   .app-dropdown__input:not(:focus) {
  //     --border-width: 0.125rem;
  //     --border-color: var(--invalid-color);
  //   }
  // }
  &[data-float-label="true"] {
    position: relative;
    .app-dropdown__label {
      position: absolute;
      bottom: 100%;
    }
  }
  &__label {
    display: block;
    margin-bottom: 0.375rem;
    color: $color--text-strong;
    font-size: 0.875rem;
  }
  &__input {
    display: flex;
    place-items: center start;
    gap: 0.5rem;
    width: 100%;
    min-height: var(--min-height, 2.75rem);
    padding-left: 0.75rem;
    padding-right: 2.25rem;
    background-color: $color--white;
    color: $color--text;
    border: 1px solid $color--neutral-300;
    border-radius: var(--border-radius, #{$radius--large});
    position: relative;
    cursor: pointer;
    transition: border-color $transition--fastest ease-in;
    &:hover {
      border-color: $color--text-300;
    }
    &[data-rounded="true"] {
      border-radius: $radius--full;
    }
  }
  &__input-icon {
    width: auto;
    height: 1.25rem;
  }
  &__list {
    display: grid;
    gap: 0.25rem;
    padding: 0.25rem;
  }
  &__option {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 8rem;
    height: 1.875rem;
    padding: 0 0.5rem;
    border-radius: 0.25rem;
    color: $color--text;
    cursor: pointer;
    transition:
      background-color $transition--fastest linear,
      color $transition--fastest linear;
    &:hover {
      background-color: $color--neutral-200;
      color: $color--text-strong;
    }
    &[aria-selected="true"] {
      background-color: $color--blue-1100;
      color: $color--white;
    }
  }
  &__arrow-icon {
    width: 0.75rem;
    height: auto;
    position: absolute;
    right: 0.75rem;
    pointer-events: none;
  }
  // &__input {
  //   border: var(--border-width, 1px) solid var(--border-color, #{$color--fds-neutral-600});
  //   &:disabled {
  //     background-color: var(--disabled-bg-color, #{$color--fds-neutral-300});
  //     border-color: var(--disabled-border-color, var(--border-color));
  //   }
  //   &:focus {
  //     outline: 0.125rem solid var(--outline-color, var(--rt-outlineColor));
  //   }
  // }
  &__validation-message,
  &__support-text {
    margin-top: 0.25rem;
    font-size: 0.75rem;
  }
  &__validation-message {
    color: var(--validation-message-color);
  }
  &__support-text:empty {
    display: none;
  }
}
</style>
