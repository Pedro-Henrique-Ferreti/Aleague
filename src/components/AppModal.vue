<template>
  <Teleport to="body">
    <TransitionOverlayFade>
      <div
        v-show="show"
        class="modal-overlay"
        :data-format="format"
      >
        <Component
          :is="(format === Format.drawer) ? TransitionDrawer : TransitionDialog"
          :modal-size="size === Sizes.small ? 30 : 45"
        >
          <div
            v-if="show"
            class="modal-card"
            aria-modal="true"
            role="dialog"
            :aria-labelledby="`${id}--title`"
            :data-size="size"
            :data-format="format"
          >
            <header class="modal-card__header">
              <div
                v-if="$slots['header-icon']"
                class="modal-card__icon-wrapper"
              >
                <slot name="header-icon" />
              </div>
              <span
                v-text="title"
                :id="`${id}--title`"
                class="modal-card__title"
              />
              <button
                class="modal-card__close-button"
                type="button"
                aria-label="Close modal"
                @click="$emit('close')"
              >
                <IconClose class="modal-card__close-button-icon" />
              </button>
            </header>
            <div class="modal-card__content">
              <slot />
            </div>
            <div
              v-if="showFooter"
              class="modal-card__footer"
            >
              <slot name="footer">
                <AppButton
                  color="secondary"
                  :block="format === Format.dialog"
                  :outline="format === Format.dialog"
                  @click="$emit('close')"
                >
                  {{ cancelButtonText }}
                </AppButton>
                <AppButton
                  :block="format === Format.dialog"
                  @click="$emit('confirm')"
                >
                  {{ confirmButtonText }}
                </AppButton>
              </slot>
            </div>
          </div>
        </Component>
      </div>
    </TransitionOverlayFade>
  </Teleport>
</template>

<script lang="ts">
enum Sizes {
  small = 'small',
  medium = 'medium',
}
enum Format {
  modal = 'modal',
  drawer = 'drawer',
  dialog = 'dialog',
}
</script>

<script lang="ts" setup>
import { watchEffect, type PropType } from 'vue';
import IconClose from '@/assets/icons/IconClose.svg';
import TransitionOverlayFade from './TransitionOverlayFade.vue';
import TransitionDrawer from './TransitionDrawer.vue';
import TransitionDialog from './TransitionDialog.vue';
import AppButton from './AppButton.vue';

const emit = defineEmits(['close', 'confirm']);
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  size: {
    type: String as PropType<keyof typeof Sizes>,
    default: Sizes.small,
  },
  format: {
    type: String as PropType<keyof typeof Format>,
    default: Format.modal,
  },
  showFooter: {
    type: Boolean,
    default: true,
  },
  confirmButtonText: {
    type: String,
    default: 'Confirmar',
  },
  cancelButtonText: {
    type: String,
    default: 'Cancelar',
  },
});

// Handle modal open and close events
function handleKeyupEvent(event: any) {
  if (event.key === 'Escape') {
    emit('close');
  }
}

function handleOpenModal() {
  document.body.classList.add('modal-open');
  document.body.addEventListener('keyup', handleKeyupEvent);
  document.querySelector('#app')?.setAttribute('inert', '');
}

function handleCloseModal() {
  document.body.classList.remove('modal-open');
  document.body.removeEventListener('keyup', handleKeyupEvent);
  document.querySelector('#app')?.removeAttribute('inert');
}

watchEffect(() => {
  if (props.show) {
    handleOpenModal();
  } else {
    handleCloseModal();
  }
});
</script>

<style lang="scss" scoped>
.modal-overlay {
  display: grid;
  background-color: $color--overlay;
  overflow-y: auto;
  overflow-x: hidden;
  position: fixed;
  inset: 0;
  z-index: $z-index--modal-overlay;
  &[data-format="modal"],
  &[data-format="dialog"] {
    place-items: start center;
    padding: var(--spacing--modal-overlay-padding) var(--spacing--screen-vertical-padding);
  }
  &[data-format="drawer"] {
    place-items: start right;
  }
}
.modal-card {
  &[data-size="small"] {
    --max-width: 30rem;
  }
  &[data-size="medium"] {
    --max-width: 45rem;
  }
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: var(--max-width);
  padding: 1.5rem;
  background-color: $color--white;
  border-radius: 0.75rem;
  box-shadow: $shadow--modal;
  position: relative;
  &__header {
    padding-bottom: 1rem;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid $color--neutral-300;
  }
  &__title {
    display: block;
    color: $color--text-strong;
    font-size: 1.25rem;
    font-weight: $font-weight--medium;
    text-align: var(--title--align, left);
  }
  &__icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
  }
  &__close-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.25rem;
    height: 2.25rem;
    border: 1px solid $color--neutral-300;
    border-radius: $radius--full;
    outline-color: $color--focus-ring;
    position: absolute;
    top: 1rem;
    right: 1rem;
    transition: border-color $transition--fastest linear;
    &:hover {
      border-color: $color--text-300;
    }
  }
  &__close-button-icon {
    width: 0.75rem;
    height: 0.75rem;
  }
  &__content {
    padding-bottom: 2.5rem;
  }
  &__footer {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
}
.modal-card[data-format="modal"] {
  .modal__close-button {
    top: 0.875rem;
    right: 1.375rem;
  }
}
.modal-card[data-format="dialog"] {
  &[data-size="small"] {
    --max-width: 28.25rem;
  }
  .modal-card__header {
    padding-bottom: 0;
    margin-top: 1.5rem;
    margin-bottom: 0.875rem;
    border: 0;
  }
  .modal-card__title {
    text-align: center;
  }
  .modal-card__content {
    text-align: center;
  }
  .modal-card__footer {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
.modal-card[data-format="drawer"] {
  min-height: 100vh;
  border-radius: 0;
  .modal-card__title {
    font-size: 1.5rem;
    text-align: center;
  }
  .modal-card__content {
    padding: 0 0.5rem;
    padding-bottom: 2.5rem;
  }
  .modal-card__footer {
    padding-top: 1.5rem;
    margin-top: auto;
    border-top: 1px solid $color--neutral-300;
  }
}
</style>
