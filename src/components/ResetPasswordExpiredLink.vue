<template>
  <div class="expired-link">
    <AuthHeading>Link expirado</AuthHeading>
    <div class="expired-link__image-wrapper">
      <img
        class="expired-link__image"
        src="/images/exclamation-mark.svg"
        alt="Woman looking at a big exclamation mark"
      />
    </div>
    <p class="text-darken">
      Ops! Parece que o seu link para recuperar a senha expirou. Por favor, solicite um novo link.
    </p>
    <div class="expired-link__buttons">
      <AppButton :to="{ name: 'password-recovery' }">
        Solicitar novo link
      </AppButton>
      <AppButton
        color="gray"
        :to="{ name: 'login' }"
      >
        Voltar ao login
      </AppButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AuthHeading from './AuthHeading.vue';
</script>

<style lang="scss" scoped>
.expired-link {
  &__image-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 2rem;
  }
  &__image {
    width: auto;
    height: 9.5rem;
  }
  &__buttons {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    margin-top: 2rem;
  }
}
</style>
