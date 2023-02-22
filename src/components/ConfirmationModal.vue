<template>
  <AppModal
    role="alertdialog"
    size="small"
    :id="id"
    :title="title"
    :show="show"
    @close="closeModal"
  >
    <div class="text-center">
      <slot name="message" />
    </div>
    <slot name="content" />
    <div class="confirmation-modal__footer">
      <slot name="footer">
        <AppButton
          color="outline"
          @click="closeModal"
        >
          Cancelar
        </AppButton>
        <AppButton
          :disabled="disableConfirmButton"
          :is-loading="isLoading"
          @click="emit('confirm')"
        >
          {{ (confirmButtonText) ? confirmButtonText : 'Confirmar' }}
        </AppButton>
      </slot>
    </div>
  </AppModal>
</template>

<script lang="ts" setup>
import AppModal from './AppModal.vue';

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
  isLoading: {
    type: Boolean,
    default: false,
  },
  disableConfirmButton: {
    type: Boolean,
    default: false,
  },
  confirmButtonText: {
    type: String,
    default: '',
  },
});

// Close modal
function closeModal() {
  if (props.isLoading) return;

  emit('close');
}
</script>

<style lang="scss" scoped>
.confirmation-modal {
  &__footer {
    display: grid;
    gap: 1rem;
    margin-top: 2rem;
    @include for-tablet-portrait-up {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }
  }
}
</style>
