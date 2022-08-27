<template>
  <main class="teams container-medium">
    <PageHeader>
      <template #title>
        Minhas equipes
      </template>
      <p>Veja todas as suas equipes. Escolha uma equipe para ver mais informações.</p>
    </PageHeader>
    <AppLargeField placeholder="Pesquise por uma equipe aqui" />
  </main>
</template>

<script lang="ts" setup>
import PageHeader from '@/components/PageHeader.vue';
import AppLargeField from '@/components/AppLargeField.vue';
</script>
