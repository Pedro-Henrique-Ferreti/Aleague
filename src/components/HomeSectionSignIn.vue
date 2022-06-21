<template>
  <section class="sign-in container">
    <div class="sign-in__image-wrapper">
      <img class="sign-in__image"
        src="/images/airplane.svg"
        alt="Airplane"
      />
    </div>
    <div class="sign-in__content">
      <SectionTitle>Comece agora a se divertir</SectionTitle>
      <p class="sign-in__description">
        Cadastre-se no Alegue para criar os seu campeonatos de futubol. Se já possuir uma conta, faça login.
      </p>
      <div class="sign-in__buttons">
        <BaseButton
          class="sign-in__button"
          icon-rounded
          icon-right="ArrowFoward"
        >
          Iniciar o Aleague
        </BaseButton>
        <BaseButton
          class="sign-in__button"
          icon-rounded
          color="gray"
          icon-right="ArrowFoward"
        >
          Acessar conta
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionTitle from '@/components/HomeSectionTitle.vue';
</script>

<style lang="scss" scoped>
.sign-in {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;
  @include for-large-tablet-portrait-up {
    flex-direction: row;
    align-items: flex-start;
    gap: 1.5rem;
  }
  &__image-wrapper {
    @include for-large-tablet-portrait-up {
      width: 100%;
      max-width: 55vw;
      margin-left: calc(var(--container-padding) * -1);
      display: flex;
      padding: 2.5rem 0;
      justify-content: flex-end;
      background-color: $color--light-gray-3;
      clip-path: polygon(0 0, 100% 0, 71% 100%, 0% 100%);
    }
  }
  &__image {
    width: 18.75rem;
    @include for-large-tablet-portrait-up {
      width: 100%;
      max-width: 17rem;
      margin-right: 17%;
    }
    @include for-tablet-landscape-up {
      max-width: 25rem;
      margin-right: 20%;
    }
  }
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
    @include for-large-tablet-portrait-up {
      max-width: 28.5rem;
    }
  }
  &__description {
    margin-top: 1.5rem;
    margin-bottom: 2.5rem;
    text-align: center;
  }
  &__buttons {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    @include for-large-tablet-portrait-up {
      flex-direction: row;
    }
  }
  &__button {
    width: 12rem;
  }
}
</style>
