<template>
  <Teleport to="body">
    <ModalOverlay :show="show">
      <AppTransition name="modal__fade">
        <BaseModal
          v-show="show"
          class="success-modal"
          content-wrapper-classes="success-modal__content-wrapper"
        >
          <img
            src="/images/awards.svg"
            alt="Trophy and medals"
            class="success-modal__image"
          />
          <span class="success-modal__title">
            Muito bem, {{ userStore.user?.username }}
          </span>
          <p class="success-modal__message">
            Seu campeonato foi criado com sucesso.
          </p>
          <AppButton
            class="success-modal__button"
            :to="{ name: 'view-league', params: { id: leagueId }}"
          >
            Visualizar o campeonato
          </AppButton>
        </BaseModal>
      </AppTransition>
    </ModalOverlay>
  </Teleport>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/userStore'; 
import BaseModal from './common/BaseModal.vue';
import AppTransition from './AppTransition.vue';
import ModalOverlay from './ModalOverlay.vue';

const userStore = useUserStore();

defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  leagueId: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.success-modal {
  :deep(.success-modal__content-wrapper) {
    text-align: center;
    @include for-tablet-portrait-up {
      width: 25rem;
    }
  }
  &__image {
    display: block;
    width: auto;
    height: 15.625rem;
    margin: auto;
  }
  &__title {
    display: block;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    color: $color--text-darken;
    font-size: 1.5rem;
    font-weight: $font-weight--bold;
  }
  &__button {
    width: 100%;
    margin-top: 2.5rem;
  }
}
</style>
