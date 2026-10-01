<template>
  <slot
    name="trigger"
    :open-modal="openModal"
    :close-modal="closeModal"
  />
  <dialog
    ref="dialogRef"
    :id="id"
    class="modal"
    @close="closeModal"
  >
    <div
      class="modal-box"
      :data-size="size"
    >
      <div class="modal-main">
        <div class="modal-content">
          <CloseButton
            v-if="showCloseIcon"
            class="absolute right-1 top-1"
            aria-label="Fechar modal"
            @click="closeModal"
          />
          <h3
            v-if="title"
            v-text="title"
            class="text-lg font-semibold mb-1"
          />
          <slot
            :side-panel-id="sidePanelId"
            :is-side-panel-open="isSidePanelOpen"
            :toggle-side-panel="() => isSidePanelOpen = !isSidePanelOpen"
          />
        </div>
        <div
          v-if="showActions"
          class="modal-action"
        >
          <slot name="actions">
            <AppButton
              class="btn-ghost"
              label="Cancelar"
              @click="closeModal"
            />
            <slot name="submit-button">
              <AppButton
                class="btn-primary min-w-5.5"
                :label="submitButtonLabel"
                :disabled="submitButtonDisabled"
                @click="$emit('submit')"
              />
            </slot>
          </slot>
        </div>
      </div>
      <div
        v-if="$slots['side-panel']"
        :id="sidePanelId"
        class="modal-side-panel"
        :data-open="isSidePanelOpen || null"
      >
        <div class="relative">
          <div class="absolute right-0">
            <AppTooltip
              label="Fechar painel"
              class="tooltip-left"
            >
              <AppButton
                class="btn-square btn-ghost btn-sm"
                aria-label="Fechar painel"
                :aria-controls="sidePanelId"
                :icon-left="IconArrowBarToRight"
                @click="isSidePanelOpen = false"
              />
            </AppTooltip>
          </div>
        </div>
        <slot name="side-panel" />
      </div>
    </div>
  </dialog>
</template>

<script lang="ts" setup>
import { IconArrowBarToRight } from '@tabler/icons-vue';

interface AppModalProps {
  title?: string;
  showCloseIcon?: boolean;
  submitButtonLabel?: string;
  submitButtonDisabled?: boolean;
  size?: 'lg' | 'xl' | 'fullscreen';
  showActions?: boolean;
}

withDefaults(defineProps<AppModalProps>(), {
  showCloseIcon: true,
  submitButtonLabel: 'Salvar',
  showActions: true,
});

const emit = defineEmits<{
  open: [];
  close: [];
  submit: [];
}>();

const id = useId();
const sidePanelId = useId();

const isOpen = defineModel<boolean>('is-open');

const isSidePanelOpen = defineModel<boolean>('is-side-panel-open');

const dialogRef = useTemplateRef('dialogRef');

function openModal() {
  isOpen.value = true;
}

function closeModal() {
  isOpen.value = false;
}

function onModalOpen() {
  dialogRef.value?.showModal();
  emit('open');
}

function onModalClose() {
  dialogRef.value?.close();
  emit('close');
}

watch(isOpen, () => {
  isOpen.value ? onModalOpen() : onModalClose();
}, { immediate: true });
</script>

<style scoped>
@reference '@/assets/css/main.css';

.modal {
  --_p: --spacing(1.5);
  @apply text-left p-(--spacing-screen-padding);
}
.modal-box {
  @apply max-h-full p-0 flex data-[size=lg]:max-w-48 data-[size=xl]:max-w-80 overflow-x-hidden;

  &[data-size="fullscreen"] {
    @apply w-full h-full max-w-[unset];
  }
}
.modal-main {
  @apply flex flex-col h-full bg-inherit relative grow;
}
.modal-content {
  @apply flex-1 p-(--_p);
}
.modal-side-panel {
  @apply hidden opacity-0 translate-x-1/3 shrink-0 p-(--_p) border-l border-base-200 overflow-y-auto sticky top-0 duration-500 ease-in-out;
  @apply [scrollbar-gutter:stable] [scrollbar-width:none] transition-discrete transition-[display,opacity,translate];

  &[data-open] {
    @apply block opacity-100 translate-x-0;
    @starting-style {
      @apply opacity-0 translate-x-1/3;
    }
  }
}
.modal-action {
  @apply px-(--_p) pb-(--_p) sticky bottom-0 bg-inherit mt-auto;
}
</style>
