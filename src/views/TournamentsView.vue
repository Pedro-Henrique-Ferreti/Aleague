<template>
  <main class="teams">
    <PageHeader title="Campeonatos">
      <AppButton
        :icon-left="IconPlus"
        :to="{ name: 'new-tournament' }"
      >
        Novo campeonato
      </AppButton>
    </PageHeader>
  </main>
</template>

<script lang="ts" setup>
import IconPlus from '@/assets/icons/IconPlus.svg';
import AppButton from '@/components/AppButton.vue';
import PageHeader from '@/components/PageHeader.vue';
</script>
