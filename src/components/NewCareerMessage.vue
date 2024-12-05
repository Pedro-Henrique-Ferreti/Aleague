<template>
  <div class="new-career">
    <h1 class="new-career__title | h1">
      Nova carreira
    </h1>
    <p>Bem-vindo a criação da sua nova carreira!</p>
    <div class="new-career__card | app-base-card">
      <p>Nós iremos te guiar por esses passos para começar:</p>
      <ul class="new-career__list">
        <li class="new-career__list-item">
          <IconSuccess class="new-career__list-icon" />
          Criar campeonatos
        </li>
        <li class="new-career__list-item">
          <IconSuccess class="new-career__list-icon" />
          Configurar regras de classificação
        </li>
        <li class="new-career__list-item">
          <IconSuccess class="new-career__list-icon" />
          Configurar calendário de temporada
        </li>
      </ul>
    </div>
    <AppButton
      class="new-career__button"
    >
      Continuar
    </AppButton>
  </div>
</template>

<script lang="ts" setup>
import IconSuccess from '@/assets/icons/Success.svg';
import AppButton from './AppButton.vue';
</script>

<style lang="scss" scoped>
.new-career {
  text-align: center;
  &__title {
    margin-bottom: 0.75rem;
  }
  &__card {
    margin: 3.5rem 0;
    text-align: left;
  }
  &__list {
    margin-top: 1.5rem;
    background-color: $color--neutral-50;
    border: 1px solid $color--neutral-300;
    border-radius: $radius--medium;
  }
  &__list-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    color: $color--text-strong;
    &:not(:last-child) {
      border-bottom: 1px solid $color--neutral-300;
    }
  }
  &__list-icon {
    flex: 0 0 auto;
    width: 1.25rem;
    height: 1.25rem;
    color: $color--success-600;
  }
  &__button {
    width: 13.75rem;
  }
}
</style>
