<template>
  <Dropdown
    theme="popup-menu"
    auto-hide
  >
    <slot />
    <template #popper>
      <div class="menu__header">
        <span class="menu__title">
          {{ title }}
        </span>
        <div
          v-if="$slots['header-controls']"
          class="menu__header-controls"
        >
          <slot name="header-controls" />
        </div>
      </div>
      <div class="menu__content">
        <slot name="content" />
      </div>
      <div class="menu__footer">
        <slot name="footer">
          <AppButton
            :disabled="confirmButtonIsDisabled"
            @click="$emit('confirm')"
          >
            {{ confirmButtonText }}
          </AppButton>
        </slot>
      </div>
    </template>
  </Dropdown>
</template>

<script lang="ts" setup>
import { Dropdown } from 'floating-vue';
import AppButton from './AppButton.vue';

defineEmits(['confirm']);
defineProps({
  title: {
    type: String,
    required: true,
  },
  confirmButtonText: {
    type: String,
    default: 'Salvar',
  },
  confirmButtonIsDisabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.menu {
  &__header {
    display: flex;
    justify-content: space-between;
    gap: 0.25rem;
    min-height: 3.375rem;
    padding: 0.75rem 1rem;
    padding-bottom: 0.5rem;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid $color--neutral-300;
  }
  &__header-controls {
    display: flex;
    gap: 0.5rem;
  }
  &__title {
    color: $color--text-strong;
    font-size: 1.125rem;
    font-weight: $font-weight--medium;
  }
  &__content {
    padding: 0 1rem;
  }
  &__footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-shrink: 0;
    gap: 1.5rem;
    height: 4rem;
    padding: 0 1rem;
    margin-top: auto;
    border-top: 1px solid $color--neutral-300;
  }
}
</style>
