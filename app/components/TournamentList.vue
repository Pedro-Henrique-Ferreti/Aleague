<template>
  <div role="tablist" class="tabs tabs-lift">
    <template
      v-for="tournament in tournamentStore.tournaments"
      :key="tournament.id"
    >
      <AppTab
        class="flex-1 max-w-16"
        :label="tournament.name"
        :is-active="activeTab === tournament.id"
        @click="activeTab = tournament.id"
      />
      <div
        v-if="activeTab === tournament.id"
        class="tab-content tablet-lg:px-4 pt-4 border-b-0 border-l-0 border-r-0 rounded-none border-base-300"
      >
        {{ tournament.name }}
      </div>
    </template>
    <AppTab
      :icon="IconPlus"
      :is-active="activeTab === null"
      @click="activeTab = null"
    />
    <div class="tab-content tablet-lg:px-4 pt-4 border-b-0 border-l-0 border-r-0 rounded-none border-base-300">
      <div class="flex items-center justify-center gap-2">
        <AppButton
          class="btn-primary btn-wide"
          label="Importar campeonato"
          :icon-left="IconFileArrowLeft"
        />
        <AppButton
          class="btn-secondary btn-wide"
          label="Criar campeonato"
          :icon-left="IconPlus"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconFileArrowLeft, IconPlus } from '@tabler/icons-vue';

const tournamentStore = useTournamentStore();

const activeTab = ref(tournamentStore.tournaments[0]?.id || null);
</script>
