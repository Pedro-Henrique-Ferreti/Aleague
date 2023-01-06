<template>
  <div
    class="modal"
    :class="modalClasses"
  >
    <header
      v-if="title"
      class="modal__header"
    >
      <span
        class="modal__header-title"
        :id="titleId || undefined"
      >
        {{ title }}
      </span>
      <button
        v-if="!hideCloseButton"
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
      class="modal__content-wrapper"
      :class="contentWrapperClasses"
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
    default: '',
  },
  titleId: {
    type: String,
    default: '',
  },
  hideCloseButton: {
    type: Boolean,
    default: false,
  },
  contentWrapperClasses: {
    type: String,
    default: '',
  },
});

const modalClasses = computed(() => ({
  'modal--no-close-button': props.hideCloseButton,
}));
</script>

<style lang="scss" scoped>
.modal {
  --content-spacing: 1.5rem;
  --header-font-size: 1.5rem;
  --close-button-size: 2rem;
  &--no-close-button {
    --content-spacing: 1rem;
    --header-font-size: 1.25rem;
    .modal__header {
      padding: 0.5rem var(--content-spacing);
    }
  }

  display: flex;
  flex-direction: column;
  min-width: 18rem;
  background-color: $color--white;
  border: 1px solid $color--light-gray-1;
  border-radius: 0.75rem;
  &__header {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0.75rem var(--content-spacing);
    padding-right: calc(var(--content-spacing) + var(--close-button-size) + 0.5rem);
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
    @include focus-ring($apply-position: false);
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--close-button-size);
    height: var(--close-button-size);
    border-radius: 0.5rem;
    position: absolute;
    right: calc(var(--content-spacing) - 0.625rem);
    transition: background-color $transition--fastest ease-in;
    &:hover {
      background-color: $color--white;
    }
  }
  &__close-button-icon {
    width: 0.75rem;
    height: 0.75rem;
    fill: $color--text-darken;
  }
  &__content-wrapper {
    flex: 1;
    margin: 1.5rem 0;
    padding: 0 var(--content-spacing);
  }
}
</style>
