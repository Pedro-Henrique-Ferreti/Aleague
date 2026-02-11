<template>
  <slot
    name="trigger"
    :open="openModal"
    :close="closeModal"
    :toggle="toggleModal"  
  />
  <dialog
    ref="dialogRef"
    class="modal text-left"
    :id="id"
    @close="closeModal"
  >
    <div
      class="modal-box"
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
const id = useId();

const emit = defineEmits<{
  open: [];
  close: [];
  submit: [];
}>();
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

const isOpen = defineModel<boolean>('is-open');
const dialogRef = ref<HTMLDialogElement | null>(null);

function openModal() {
  dialogRef.value?.showModal();

  if (!isOpen.value) {
    isOpen.value = true;
  }

  emit('open');
}

function closeModal() {
  dialogRef.value?.close();

  if (isOpen.value) {
    isOpen.value = false;
  }

  emit('close');
}

function toggleModal() {
  (dialogRef.value?.open) ? dialogRef.value.close() : dialogRef.value?.showModal();
}

watchEffect(() => {
  isOpen.value ? openModal() : closeModal();
});

defineExpose({
  open: openModal,
  close: closeModal,
  toggle: toggleModal
});
</script>
