<template>
  <ConfirmationModal
    id="competition-modal-restart"
    title="Reiniciar campeonato"
    :show="show"
    :is-loading="isLoading"
    @close="emit('close')"
    @confirm="$emit('confirm')"
  >
    <template #message>
      <p>
        Você tem certeza que deseja reiniciar este campeonato? Todos os resultados e estatísticas das partidas serão apagados. As partidas do campeonato serão sorteadas novamente de forma aleatória. Esta ação não poderá ser desfeita.
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
