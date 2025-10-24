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
  >
    <div
      class="modal-box"
      :class="{ 'max-w-48': size === 'lg', 'max-w-80': size === 'xl' }"
    >
      <button
        v-if="showCloseIcon"
        v-text="'✕'"
        type="button"
        class="btn btn-sm btn-circle btn-ghost absolute right-1 top-1"
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
          <AppButton
            class="btn-primary"
            :label="submitButtonLabel"
            :disabled="submitButtonDisabled"
            @click="$emit('submit')"
          />
        </slot>
      </div>
    </div>
  </dialog>
</template>

<script lang="ts" setup>
const id = useId();

const emit = defineEmits<{
  (e: 'open'): void;
  (e: 'close'): void;
  (e: 'submit'): void;
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
  emit('open');
}

function closeModal() {
  dialogRef.value?.close();
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
