<template>
  <PageHeader>
    <template #title>
      Criar campeonato
    </template>
    <p>Bem-vindo a criação de campeonatos! Para começar, escolha nome e formato para o seu campeonato.</p>
  </PageHeader>
  <CreateLeagueStepper :current-step="1" />
  <CreateLeagueLayout>
    <CreateLeagueForm>
      <AppLargeField
        placeholder="Digite o nome do campeonato"
        icon="football"
      />
      <div class="league-format-form">
        <h2 class="league-format-form__title">
          Escolha o formato
        </h2>
      </div>
      <template #footer>
        <AppButton color="gray">
          Voltar
        </AppButton>
        <AppButton>Próximo passo</AppButton>
      </template>
    </CreateLeagueForm>
  </CreateLeagueLayout>
</template>

<script lang="ts" setup>
import AppLargeField from './AppLargeField.vue';
import PageHeader from './PageHeader.vue';
import CreateLeagueStepper from './CreateLeagueStepper.vue';
import CreateLeagueForm from './CreateLeagueForm.vue';
import CreateLeagueLayout from './CreateLeagueLayout.vue';
</script>

<style lang="scss" scoped>
.league-format-form {
  margin-top: 2.5rem;
  &__title {
    margin-bottom: 1rem;
    font-size: 1.125rem;
    font-weight: $font-weight--semibold;
  }
  @include for-tablet-landscape-up {
    margin-top: 3.5rem;
  }
}
</style>
