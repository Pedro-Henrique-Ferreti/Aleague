<template>
  <AuthHeading>E-mail enviado</AuthHeading>
  <div class="recovery-success__image-wrapper">
    <img
      class="recovery-success__image"
      src="/images/mail-sent.svg"
      alt="Email sent successfully"
    />
  </div>
  <p class="text-darken">
    Verifique em sua caixa de entrada por um link para recuperar sua senha.
  </p>
  <BaseButton
    class="recovery-success__button"
    color="gray"
    :to="{ name: 'login' }"
  >
    Voltar ao login
  </BaseButton>
</template>

<script setup>
import AuthHeading from './AuthHeading.vue';
</script>

<style lang="scss" scoped>
.recovery-success {
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
  &__button{
    width: 100%;
    margin-top: 2rem;
  }
}
</style>