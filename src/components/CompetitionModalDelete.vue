<template>
  <AppModal
    id="competition-modal-delete"
    title="Excluir campeonato"
    size="small"
    :show="show"
    @close="closeModal"
  >
    <p class="text-center">
      Você tem certeza que deseja excluir este campeonato? Esta ação não poderá ser desfeita.
      <template v-if="askForConfirmation">
        As estatísticas das suas equipes serão alteradas.
      </template>
    </p>
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
    <div class="modal-delete__footer">
      <AppButton
        color="gray"
        @click="closeModal"
      >
        Cancelar
      </AppButton>
      <AppButton
        :disabled="askForConfirmation && !confirmationValueIsValid"
        :is-loading="isLoading"
        @click="emit('confirm')"
      >
        {{ askForConfirmation ? 'Confirmar e excluir' : 'Confirmar' }}
      </AppButton>
    </div>
  </AppModal>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import BaseInput from './common/BaseInput.vue';
import AppModal from './AppModal.vue';

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

// Close modal
function closeModal() {
  if (props.isLoading) return;

  emit('close');
}
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
