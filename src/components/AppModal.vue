<template>
  <Teleport to="body">
    <ModalOverlay
      :show="show"
      @click="$emit('close', $event)"
    >
      <transition
        name="modal__fade"
        mode="out-in"
      >
        <BaseModal
          v-show="show"
          class="app-modal"
          content-wrapper-classes="app-modal__content-wrapper"
          :class="modalClasses"
          :title="title"
          @close="$emit('close', $event)"
        >
          <div
            v-if="modalHasTabPanel"
            class="app-modal__tab-panel"
          >
            <slot name="tabPanel" />
          </div>
          <slot />
          <div
            v-if="modalHasFooter"
            ref="modalFooter"
            class="app-modal__footer"
          >
            <slot name="footer">
              <div class="app-modal__footer-buttons">
                <AppButton
                  color="gray"
                  @click="$emit('cancel-action')"
                >
                  Cancelar
                </AppButton>
                <AppButton
                  :is-loading="isLoading"
                  :disabled="disableSaveButton"
                  @click="$emit('save-action')"
                >
                  Salvar
                </AppButton>
              </div>
            </slot>
          </div>
        </BaseModal>
      </transition>
    </ModalOverlay>
  </Teleport>
</template>

<script lang="ts">
const validSizes = {
  medium: 'medium',
  large: 'large',
};
</script>

<script lang="ts" setup>
import { computed, watch, useSlots } from 'vue';
import BaseModal from './common/BaseModal.vue';
import ModalOverlay from './ModalOverlay.vue';

defineEmits(['close', 'cancel-action', 'save-action']);

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
  title: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: validSizes.medium,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  disableSaveButton: {
    type: Boolean,
    default: false,
  },
});

const modalHasFooter = computed(() => props.renderFooter || slots.footer);
const modalHasTabPanel = computed(() => slots.tabPanel);

const modalClasses = computed(() => ({
  'app-modal--medium': props.size === validSizes.medium,
  'app-modal--large': props.size === validSizes.large,
  'app-modal--has-footer': modalHasFooter.value,
  'app-modal--has-tab-panel': modalHasTabPanel.value,
}));

watch(() => props.show, (show) => {
  if (show) {
    document.body.classList.add('hide-overflow-y');
  } else {
    document.body.classList.remove('hide-overflow-y');
  }
});
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
    height: calc(100vh - (#{$spacing--modal-overlay-padding} * 2));
    :deep(.app-modal__content-wrapper) {
      margin-bottom: 6.75rem;
    }
  }
  width: 100%;
  max-height: calc(100vh - (#{$spacing--modal-overlay-padding} * 2));
  position: relative;
  :deep(.app-modal__content-wrapper) {
    @include scrollbar;
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
