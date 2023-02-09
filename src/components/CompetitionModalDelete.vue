<template>
  <ConfirmationModal
    id="competition-modal-delete"
    title="Excluir campeonato"
    :show="show"
    :is-loading="isLoading"
    :disable-confirm-button="askForConfirmation && !confirmationValueIsValid"
    :confirm-button-text="askForConfirmation ? 'Confirmar e excluir' : ''"
    @close="emit('close')"
    @confirm="$emit('confirm')"
  >
    <template #message>
      <p>
        Você tem certeza que deseja excluir este campeonato? Esta ação não poderá ser desfeita.
        <template v-if="askForConfirmation">
          As estatísticas das suas equipes serão alteradas.
        </template>
      </p>
    </template>
    <template #content>
      <div
        v-if="askForConfirmation"
        class="modal-delete__input-wrapper"
      >
        <p>
          Por favor, digite <span class="modal-delete__league-name">{{ competitionName }}</span> para confirmar.
        </p>
        <BaseInput
          v-model.trim="confirmationValue"
          class="modal-delete__input"
        />
      </div>
    </template>
  </ConfirmationModal>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import BaseInput from './common/BaseInput.vue';
import ConfirmationModal from './ConfirmationModal.vue';

const emit = defineEmits(['close', 'confirm']);
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  askForConfirmation: {
    type: Boolean,
    default: false,
  },
  competitionName: {
    type: String,
    default: '',
  },
});

// Confirmation value
const confirmationValue = ref('');

const confirmationValueIsValid = computed(() => {
  return confirmationValue.value.toLowerCase() === props.competitionName.toLowerCase();
});

watch(() => props.show, () => {
  if (props.show) {
    confirmationValue.value = '';
  }
});
</script>

<style lang="scss" scoped>
.modal-delete {
  &__input-wrapper {
    margin-top: 2rem;
  }
  &__league-name {
    color: $color--text-darken;
    font-weight: $font-weight--semibold;
  }
  &__input {
    margin-top: 0.5rem;
  }
}
</style>
