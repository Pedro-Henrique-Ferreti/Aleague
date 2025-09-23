<template>
  <slot
    name="trigger"
    :open="openModal"
    :close="closeModal"
    :toggle="toggleModal"  
  />
  <dialog
    ref="dialogRef"
    class="modal"
    :id="id"
  >
    <div class="modal-box">
      <button
        v-text="'✕'"
        type="button"
        class="btn btn-sm btn-circle btn-ghost absolute right-1 top-1"
        @click="closeModal"
      />
      <h3
        v-if="title"
        v-text="title"
        class="text-lg font-semibold mb-1"
      />
      <slot />
      <div class="modal-action">
        <AppButton
          class="btn-ghost"
          label="Cancelar"
          @click="closeModal"
        />
        <slot name="actions" />
      </div>
    </div>
  </dialog>
</template>

<script lang="ts" setup>
const id = useId();

const emit = defineEmits<{
  (e: 'open'): void;
  (e: 'close'): void;
}>();
defineProps<{
  title?: string;
}>();

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

defineExpose({
  open: openModal,
  close: closeModal,
  toggle: toggleModal
});
</script>
