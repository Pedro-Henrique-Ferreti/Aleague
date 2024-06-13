<template>
  <main class="landing | container">
    <h1 class="landing__title">
      Sua plataforma para criar e gerenciar <br />
      <span class="landing__title-callout">
        campeonatos de futebol
      </span>
    </h1>
    <p class="landing__description">
      Com o Alegue, você pode criar campeonatos de futebol de maneira fácil e rápida.
      Escolha entre diversos formatos e opções de regras para ter uma experiência completa.
    </p>
    <AppButton
      class="landing__button"
      :to="{ name: 'login' }"
    >
      Começar agora
    </AppButton>
    <img
      class="landing__image"
      src="/images/soccer-stadium1920_1080.webp"
      alt="Soccer stadium"
    />
  </main>
</template>

<script lang="ts" setup>
import AppButton from '@/components/AppButton.vue';
</script>

<style lang="scss" scoped>
.landing {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__title {
    margin-bottom: 1.5rem;
    color: $color--text-strong;
    font-size: 2rem;
    font-weight: $font-weight--medium;
    text-align: center;
    @include for-desktop-up {
      font-size: 3rem;
    }
  }
  &__title-callout {
    color: $color--primary-800;
  }
  &__description {
    max-width: 38.25rem;
    text-align: center;
    @include for-desktop-up {
      max-width: 57.5rem;
    }
  }
  &__image {
    width: 100%;
    max-width: 37.125rem;
    border-radius: 2rem;
  }
  &__button {
    width: 15.5rem !important;
    margin: 3rem 0;
  }
}
</style>
