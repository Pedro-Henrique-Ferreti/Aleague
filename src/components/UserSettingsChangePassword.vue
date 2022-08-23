<template>
  <div class="user-settings-password">
    Por favor, digite sua senha atual para alterar a senha.
    <div class="user-settings-password__content">
      <form class="user-settings-password__form">
        <AppTextField
          id="user-settings-password--current"
          type="password"
          label="Senha atual"
        />
        <AppTextField
          id="user-settings-password--new"
          type="password"
          label="Nova senha"
        />
        <AppTextField
          id="user-settings-password--confirm-new"
          type="password"
          label="Confirme a nova senha"
        />
      </form>
      <img
        class="user-settings-password__image"
        src="/images/access-denied.svg"
        alt="Tablet security"
        draggable="false"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppTextField from './AppTextField.vue';
</script>

<style lang="scss" scoped>
.user-settings-password {
  &__content {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid $color--light-gray-1;
  }
  &__form {
    display: grid;
    gap: 1.5rem;
  }
  &__image {
    width: 73%;
    max-width: 18rem;
    margin: 0 auto;
  }
  @include for-tablet-landscape-up {
    .user-settings-password__content {
      flex-direction: row;
      justify-content: space-between;
    }
    .user-settings-password__form {
      width: 45%;
    }
    .user-settings-password__image {
      width: auto;
      max-width: unset;
      height: 100%;
      max-height: 275px;
      margin: 0;
    }
  }
}
</style>
