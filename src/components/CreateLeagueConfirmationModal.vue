<template>
  <AppModal
    id="create-league-confirmation-modal"
    title="Criar campeonato"
    size="small"
    :show="show"
    @close="$emit('close')"
  >
    <p class="text-center">
      Você tem certeza que deseja criar <b>"Campeonato Brasileiro Série A"</b>? As regras e os participantes não poderão ser alterados após a criação.
    </p>
    <AppWarning
      v-if="participants.length > 0"
      class="confirmation-modal__warning"
    >
      <p>Ao criar o campeonato, as seguintes equipes serão cadastradas:</p>
      <ul class="confirmation-modal__warning-list">
        <li
          v-for="participant in participants"
          :key="participant.id"
          class="confirmation-modal__warning-list-item"
        >
          <span>{{ participant.name }}</span>
        </li>
      </ul>
    </AppWarning>
    <div class="confirmation-modal__footer">
      <AppButton
        color="gray"
        @click="$emit('close')"
      >
        Cancelar
      </AppButton>
      <AppButton @click="$emit('confirm')">
        Confirmar
      </AppButton>
    </div>
  </AppModal>
</template>

<script lang="ts" setup>
import type { LeagueParticipant } from '@/types/League';
import type { PropType } from 'vue';
import AppModal from './AppModal.vue';
import AppWarning from './AppWarning.vue';

defineEmits(['close', 'confirm']);
defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  participants: {
    type: Array as PropType<LeagueParticipant[]>,
    default: () => ([]),
  },
});
</script>

<style lang="scss" scoped>
.confirmation-modal {
  &__warning {
    margin-top: 1.5rem;
  }
  &__warning-list {
    display: grid;
    gap: 0.25rem 0;
    margin-top: 2rem;
  }
  &__footer {
    display: grid;
    gap: 1rem;
    margin-top: 2rem;
  }
}
@include for-tablet-portrait-up {
  .confirmation-modal__warning-list {
    grid-template-columns: repeat(2, 40%);
    gap: 0.25rem 1rem;
  }
  .confirmation-modal__footer {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}
</style>
