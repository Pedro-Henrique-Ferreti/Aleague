<template>
  <main class="new-tournament | container-small">
    <PageHeader
      title="Novo campeonato"
      :breadcrumb-items="BREADCRUMB_ITEMS"
    />
    <form @submit.prevent>
      <AppCard>
      </AppCard>
      <div class="new-tournament__controls">
        <AppButton>
          Continuar
        </AppButton>
      </div>
    </form>
  </main>
</template>

<script lang="ts" setup>
import type { Breadcrumb } from '@/types/Breadcrumb';
import { ref } from 'vue';
import AppButton from '@/components/AppButton.vue';
import AppCard from '@/components/AppCard.vue';
import PageHeader from '@/components/PageHeader.vue';

// Breadcrumb
const BREADCRUMB_ITEMS: Breadcrumb[] = [
  { title: 'Campeonatos', to: { name: 'tournaments' } },
  'Novo',
];

// Form
const form = ref({
  tournamentName: '',
});
</script>

<style lang="scss" scoped>
.new-tournament {
  &__controls {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
  }
}
</style>
