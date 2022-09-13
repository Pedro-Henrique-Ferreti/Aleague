<template>
  <PageHeader>
    <template #title>
      Criar campeonato
    </template>
    <p>Bem-vindo a criação de campeonatos! Para começar, escolha nome e formato para o seu campeonato.</p>
  </PageHeader>
  <CreateLeagueStepper :current-step="1" />
</template>

<script lang="ts" setup>
import PageHeader from './PageHeader.vue';
import CreateLeagueStepper from './CreateLeagueStepper.vue';
</script>
