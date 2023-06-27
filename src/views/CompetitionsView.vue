<template>
  <main class="container-medium">
    <PageHeader>
      <template #title>
        Meus campeonatos
      </template>
      <p>Você pode ver todos os seus campeonatos aqui. Escolha um campeonato para editar.</p>
    </PageHeader>
    <CompetitionsList />
  </main>
</template>

<script lang="ts" setup>
import PageHeader from '@/components/PageHeader.vue';
import CompetitionsList from '@/components/CompetitionsList.vue';
</script>
