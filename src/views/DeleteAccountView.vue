<template>
  <main class="delete-account container-extra-small">
    <h1 class="delete-account__title text-darken">
      Sentimos muito em ver você partir, {{ userStore.user?.username }}
    </h1>
    <img
      class="delete-account__image"
      src="/images/office-workplace.svg"
      alt="Black man using a laptop"
      draggable="false"
    />
    <p class="p">
      Se você quer apenas alterar seu nome de usuário, você pode fazer isso
      <button
        class="delete-account__username-button"
        aria-label="Editar nome de usuário"
        @click="openUserSettingsModal"
      >
        clicando aqui
      </button>.
    </p>
    <p>
      Lembre-se que a exclusão de conta é um processo final. Você irá permanantemente perder todos os seus campeonatos e equipes. Não haverá como voltar atrás.
    </p>
    <DeleteAccountForm />
  </main>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/userStore';
import { useUserSettingsStore } from '@/stores/userSettingsStore';
import DeleteAccountForm from '@/components/DeleteAccountForm.vue';

const userStore = useUserStore();
const { openModal: openUserSettingsModal } = useUserSettingsStore();
</script>

<style lang="scss" scoped>
.delete-account {
  --container-content-size: 39rem;
  &__title {
    margin-bottom: 2rem;
    font-size: 1.875rem;
    font-weight: $font-weight--semibold;
    text-align: center;
  }
  &__image {
    height: 17rem;
    margin: 0 auto;
    margin-bottom: 2.5rem;
  }
  &__username-button {
    @include focus-ring;
    display: inline;
    color: $color--secondary;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
