<template>
  <main class="teams container-medium">
    <PageHeader>
      <template #title>
        Minhas equipes
      </template>
      <p>Veja todas as suas equipes. Escolha uma equipe para ver mais informações.</p>
    </PageHeader>
    <TeamsSearchBar />
    <TeamsSectionCards />
  </main>
</template>

<script lang="ts" setup>
import PageHeader from '@/components/PageHeader.vue';
import TeamsSearchBar from '@/components/TeamsSearchBar.vue';
import TeamsSectionCards from '@/components/TeamsSectionCards.vue';
</script>
