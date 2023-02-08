<template>
  <main class="not-found | container">
    <img
      class="not-found__image"
      src="/images/exclamation-warning.svg"
      alt="Exclamation mark"
    />
    <div class="not-found__container">
      <span class="not-found__subtitle">
        Erro 404
      </span>
      <h1 class="not-found__title">
        Página não encontrada
      </h1>
      <p class="not-found__message">
        Desculpe, mas a página que você está procurando não existe ou foi removida. Por favor, verifique o endereço digitado ou retorne a página inicial.
      </p>
      <AppButton
        color="outline"
        icon-left="arrow-backwards"
        :to="{ name: 'home' }"
      >
        Voltar para página inicial
      </AppButton>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  @include for-large-tablet-portrait-up {
    flex-direction: row-reverse;
    justify-content: space-between;
    max-width: calc(var(--container-padding) * 2 + 50.125rem);
  }
  @include for-large-tablet-landscape-up {
    gap: 5rem;
  }
  &__subtitle {
    display: block;
    margin-bottom: 0.25rem;
    color: $color--primary;
    font-size: 1.25rem;
    font-weight: $font-weight--bold;
  }
  &__title {
    margin-bottom: 0.5rem;
    color: $color--text-darken;
    font-size: 1.875rem;
    font-weight: $font-weight--bold;
  }
  &__message {
    margin-bottom: 1.25rem;
    font-size: 1.125rem;
  }
  &__image {
    width: 12rem;
    height: 12rem;
  }
}
</style>
