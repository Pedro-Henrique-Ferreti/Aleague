<template>
  <header class="container-extra-small">
    <AppLogo class="goodbye__logo" />
  </header>
  <main class="goodbye container-extra-small">
    <h1 class="goodbye__title text-darken">
      Obrigado por utilizar o Aleague!
    </h1>
    <img
      class="goodbye__image"
      src="/images/teamwork.svg"
      alt="Teamwork"
    />
    <p>
      Sua conta foi excluída com sucesso. Esperamos ver você novamente!
    </p>
    <AppButton
      class="goodbye__button"
      :to="{ name: 'landing' }"
    >
      Ir a página principal
    </AppButton>
  </main>
</template>

<script lang="ts" setup>
import AppButton from '@/components/AppButton.vue';
import AppLogo from '@/components/AppLogo.vue';
</script>

<style lang="scss" scoped>
.goodbye {
  text-align: center;
  &__logo {
    margin: 3rem 0;
  }
  &__title {
    font-size: 1.875rem;
    font-weight: $font-weight--semibold;
  }
  &__image {
    max-height: 21.875rem;
    margin: 2rem auto 2.5rem auto;
  }
  &__button {
    width: 100%;
    max-width: 18rem;
    margin-top: 3rem;
  }
}
</style>
