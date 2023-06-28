<template>
  <main class="teams container-medium">
    <PageHeader>
      <template #title>
        Minhas equipes
      </template>
      <p>Veja todas as suas equipes. Escolha uma equipe para ver mais informações.</p>
    </PageHeader>
    <TeamsList />
  </main>
</template>

<script lang="ts" setup>
import PageHeader from '@/components/PageHeader.vue';
import TeamsList from '@/components/TeamsList.vue';
</script>
