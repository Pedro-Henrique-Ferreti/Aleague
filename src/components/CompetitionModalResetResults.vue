<template>
  <ConfirmationModal
    id="competition-modal-reset-results"
    title="Apagar resultados"
    :show="show"
    :is-loading="isLoading"
    @close="emit('close')"
    @confirm="$emit('confirm')"
  >
    <template #message>
      <p>
        Você tem certeza que deseja apagar os resultados de todas as partidas do campeonato? As estatísticas também serão apagadas. Esta ação não poderá ser desfeita.
      </p>
    </template>
  </ConfirmationModal>
</template>

<script lang="ts" setup>
import ConfirmationModal from './ConfirmationModal.vue';

const emit = defineEmits(['close', 'confirm']);
defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});
</script>
