<template>
  <div
    class="modal"
    :class="modalClasses"
  >
    <header class="modal__header">
      <span class="modal__header-title">
        {{ title }}
      </span>
      <button
        v-if="!isSimple"
        class="modal__close-button"
        type="button"
        aria-label="Close modal"
        @click="$emit('close')"
      >
        <BaseIcon
          class="modal__close-button-icon"
          icon="close"
        />
      </button>
    </header>
    <div
      class="modal__body"
      :class="bodyClasses"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

defineEmits(['close']);

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  isSimple: {
    type: Boolean,
    default: false,
  },
  bodyClasses: {
    type: String,
    default: '',
  },
});

const modalClasses = computed(() => ({
  'modal--simple': props.isSimple,
}));
</script>

<style lang="scss" scoped>
.modal {
  --padding-x: 1.5rem;
  --header-font-size: 1.5rem;
  --close-button-size: 2rem;
  &--simple {
    --padding-x: 1rem;
    --header-font-size: 1.25rem;
    .modal__header {
      padding: 0.5rem var(--padding-x);
    }
  }

  display: flex;
  flex-direction: column;
  min-width: 18rem;
  background-color: $color--white;
  border: 1px solid $color--light-gray-1;
  border-radius: 0.5rem;
  &__header {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0.75rem var(--padding-x);
    padding-right: calc(var(--padding-x) + var(--close-button-size) + 0.5rem);
    background-color: $color--light-gray-2;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    position: relative;
  }
  &__header-title {
    color: $color--text-darken;
    font-size: var(--header-font-size);
    font-weight: $font-weight--semibold;
  }
  &__close-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--close-button-size);
    height: var(--close-button-size);
    background-color: $color--white;
    border: 1px solid $color--light-gray-1;
    border-radius: 0.25rem;
    position: absolute;
    right: var(--padding-x);
  }
  &__close-button-icon {
    width: 1rem;
    height: 1rem;
  }
  &__body {
    flex: 1;
    padding: var(--padding-x);
  }
}
</style>
