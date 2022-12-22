<template>
  <AppModal
    id="competition-actions-modal-delete"
    title="Excluir campeonato"
    size="small"
    :show="show"
    @close="closeModal"
  >
    <p class="text-center">
      Você tem certeza que deseja excluir este campeonato? Esta ação não poderá ser desfeita. As estatísticas das suas equipes serão alteradas.
    </p>
    <div class="modal-delete__input-wrapper">
      <p>
        Por favor, digite <span class="modal-delete__league-name">{{ competition?.name }}</span> para confirmar.
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
        :disabled="!confirmationValueIsValid"
        :is-loading="isDeletingLeague"
        @click="deleteLeague"
      >
        Confirmar e excluir
      </AppButton>
    </div>
  </AppModal>
</template>

<script lang="ts" setup>
import { computed, inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useNotificationStore } from '@/stores/notificationStore';
import { KEY_COMPETITION_DETAILS, KEY_DELETE_COMPETITION } from '@/constants/injectionKeys';
import BaseInput from './common/BaseInput.vue';
import AppModal from './AppModal.vue';

const router = useRouter();
const { openSnackbarNotification } = useNotificationStore();

const emit = defineEmits(['close']);
defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});

// Injected values
const competition = inject(KEY_COMPETITION_DETAILS);
const deleteCompetition = inject(KEY_DELETE_COMPETITION);

// Close modal
function closeModal() {
  emit('close');
}

// Delete league
const isDeletingLeague = ref(false);
const confirmationValue = ref('');

const confirmationValueIsValid = computed(() => {
  return confirmationValue.value.toLowerCase() === competition?.value.name.toLowerCase();
});

async function deleteLeague() {
  if (!deleteCompetition) return;

  isDeletingLeague.value = true;

  try {
    await deleteCompetition();

    closeModal();

    openSnackbarNotification({
      message: 'Campeonato excluído com sucesso.',
    });

    router.push({ name: 'leagues' });
  } catch (error: any) {
    openSnackbarNotification({
      type: 'error',
      message: error.message,
    });
  } finally {
    isDeletingLeague.value = false;
  }
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
