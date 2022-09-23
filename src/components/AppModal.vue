<template>
  <Teleport to="body">
    <ModalOverlay
      :show="show"
      @click="$emit('close')"
    >
      <AppTransition name="modal__fade">
        <BaseModal
          v-show="show"
          class="app-modal"
          content-wrapper-classes="app-modal__content-wrapper"
          role="dialog"
          aria-modal="true"
          :class="modalClasses"
          :title="title"
          :aria-labelledby="modalLabelledById"
          :title-id="modalLabelledById"
          @close="$emit('close')"
        >
          <div
            v-if="modalHasTabPanel"
            class="app-modal__tab-panel"
          >
            <slot name="tabPanel" />
          </div>
          <slot />
          <div
            v-if="renderFooter"
            ref="modalFooter"
            class="app-modal__footer"
          >
            <slot name="footer">
              <div class="app-modal__footer-buttons">
                <AppButton
                  color="gray"
                  @click="$emit('cancel')"
                >
                  Cancelar
                </AppButton>
                <AppButton
                  :is-loading="isLoading"
                  :disabled="disableSaveButton"
                  @click="$emit('save')"
                >
                  Salvar
                </AppButton>
              </div>
            </slot>
          </div>
        </BaseModal>
      </AppTransition>
    </ModalOverlay>
  </Teleport>
</template>

<script lang="ts">
enum Sizes {
  medium = 'medium',
  large = 'large',
}
</script>

<script lang="ts" setup>
import type { PropType } from 'vue';
import { computed, watch, useSlots } from 'vue';
import BaseModal from './common/BaseModal.vue';
import AppTransition from './AppTransition.vue';
import ModalOverlay from './ModalOverlay.vue';

const emit = defineEmits(['close', 'cancel', 'save']);

const slots = useSlots();

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  renderFooter: {
    type: Boolean,
    default: false,
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
    default: Sizes.medium,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  disableSaveButton: {
    type: Boolean,
    default: false,
  },
  useMaxHeight: {
    type: Boolean,
    default: false,
  },
});

const modalHasTabPanel = computed(() => slots.tabPanel);

const modalClasses = computed(() => ({
  'app-modal--medium': props.size === Sizes.medium,
  'app-modal--large': props.size === Sizes.large,
  'app-modal--has-footer': props.renderFooter,
  'app-modal--use-max-height': props.useMaxHeight || props.renderFooter,
  'app-modal--has-tab-panel': modalHasTabPanel.value,
}));

const modalLabelledById = computed(() => `${props.id}-title`);

// Handle modal open and close events
watch(() => props.show, (show) => {
  (show) ? handleOpenModal() : handleCloseModal();
});

function handleOpenModal() {
  document.body.classList.add('no-scroll');
  document.body.addEventListener('keyup', handleKeyupEvent);
  document.querySelector('#app')?.setAttribute('inert', '');
}

function handleCloseModal() {
  document.body.classList.remove('no-scroll');
  document.body.removeEventListener('keyup', handleKeyupEvent);
  document.querySelector('#app')?.removeAttribute('inert');
}

function handleKeyupEvent(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    emit('close');
  }
}
</script>

<style lang="scss" scoped>
.app-modal {
  &--medium {
    max-width: 45rem; // 720px
  }
  &--large {
    max-width: 62rem; // 992px
  }
  &--has-tab-panel {
    :deep(.app-modal__content-wrapper) {
      margin-top: 6.75rem;
    }
  }
  &--has-footer {
    :deep(.app-modal__content-wrapper) {
      margin-bottom: 6.75rem;
    }
  }
  &--use-max-height {
    height: calc(100vh - (#{$spacing--modal-overlay-padding} * 2));
  }
  width: 100%;
  max-height: calc(100vh - (#{$spacing--modal-overlay-padding} * 2));
  position: relative;
  :deep(.app-modal__content-wrapper) {
    @include scrollbar;
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: auto;
  }
  &__tab-panel {
    padding: 0 var(--content-spacing);
    position: absolute;
    top: 5rem;
    left: 0;
    right: 0;
  }
  &__footer {
    display: flex;
    padding: var(--content-spacing);
    padding-top: 1.5rem;
    background-color: $color--white;
    border-top: 1px solid $color--light-gray-1;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
  &__footer-buttons {
    display: grid;
    grid-template-columns: repeat(2, 8rem);
    gap: 1.5rem;
    width: 100%;
  }
  @include for-tablet-portrait-down {
    --content-spacing: #{$spacing--screen-vertical-padding};
    height: 100vh;
    max-height: unset;
    border: 0;
    border-radius: 0;
    &--has-tab-panel {
    :deep(.app-modal__content-wrapper) {
      margin-top: 5.75rem;
    }
  }
    .app-modal__footer-buttons {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
</style>
