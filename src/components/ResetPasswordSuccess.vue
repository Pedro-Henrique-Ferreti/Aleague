<template>
  <div class="reset-success">
    <AuthHeading>Redefina sua senha</AuthHeading>
    <div class="reset-success__image-wrapper">
      <img
        class="reset-success__image"
        src="/images/smartphone-verified.svg"
        alt="Girl next to smartphone with check sign"
        draggable="false"
      />
    </div>
    <p class="text-darken">
      Sua senha foi redefinida com sucesso!
    </p>
    <AppButton
      class="reset-success__button"
      :to="{ name: 'login' }"
    >
      Acessar minha conta
    </AppButton>
  </div>
</template>

<script lang="ts" setup>
import AuthHeading from './AuthHeading.vue';
</script>

<style lang="scss" scoped>
.reset-success {
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
