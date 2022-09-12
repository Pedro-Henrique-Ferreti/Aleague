<template>
  <main class="leagues container-medium">
    <PageHeader>
      <template #title>
        Meus campeonatos
      </template>
      <p>Você pode ver todos os seus campeonatos aqui. Escolha um campeonato para editar.</p>
    </PageHeader>
    <LeaguesSearchBar />
    <LeaguesList />
  </main>
</template>

<script lang="ts" setup>
import PageHeader from '@/components/PageHeader.vue';
import LeaguesList from '@/components/LeaguesList.vue';
import LeaguesSearchBar from '@/components/LeaguesSearchBar.vue';
</script>
