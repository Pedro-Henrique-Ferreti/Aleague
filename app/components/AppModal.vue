<template>
  <slot
    name="trigger"
    :open-modal="openModal"
    :close-modal="closeModal"
  />
  <dialog
    ref="dialogRef"
    :id="id"
    class="modal text-left"
    @close="closeModal"
  >
    <div
      class="modal-box max-h-[93vh]"
      :class="{ 'max-w-48': size === 'lg', 'max-w-80': size === 'xl' }"
    >
      <CloseButton
        v-if="showCloseIcon"
        class="absolute right-1 top-1"
        aria-label="Close modal"
        @click="closeModal"
      />
      <h3
        v-if="title"
        v-text="title"
        class="text-lg font-semibold mb-1"
      />
      <slot />
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
  </dialog>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  title?: string;
  showCloseIcon?: boolean;
  submitButtonLabel?: string;
  submitButtonDisabled?: boolean;
  size?: 'lg' | 'xl';
  showActions?: boolean;
}>(), {
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

const isOpen = defineModel<boolean>('is-open');

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

watch(isOpen, (value) => {
  value ? onModalOpen() : onModalClose();
});
</script>
