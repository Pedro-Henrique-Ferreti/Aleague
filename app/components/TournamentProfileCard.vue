<template>
  <div class="flex items-center h-fit gap-1.5">
    <img
      class="w-auto h-6 self-baseline"
      alt="Logo do campeonato"
      :src="tournament?.icon"
    >
    <div class="w-full @container/tournament-profile">
      <div class="tournament-profile__content">
        <h1 class="text-3xl font-medium">{{ tournament?.name }}</h1>
        <div class="tournament-profile__badges | badge-container">
          <div class="badge badge-soft badge-secondary">
            <IconClock class="size-[1em]" />
            {{ formatDate(tournament?.createdAt, 'd MMM yyyy') }}
          </div>
          <div class="badge badge-soft badge-secondary">
            <IconPencil class="size-[1em]" />
            {{ formatDate(tournament?.updatedAt, 'd MMM yyyy') }}
          </div>
        </div>
        <BaseSelect
          v-if="tournament?.collectionId || tournamentOptions.length > 1"
          v-model="tournamentStore.activeTournamentId"
          class="tournament-profile__select"
          :options="tournamentOptions"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconClock, IconPencil } from '@tabler/icons-vue';

const collectionStore = useCollectionStore();
const tournamentStore = useTournamentStore();

const tournament = computed(() => tournamentStore.activeTournament);

const tournamentOptions = computed<SelectOptionList<Tournament['id']>>(() => {
  return tournamentStore.tournamentList.filter(t => t.name === tournament.value?.name).map(t => ({
    label: collectionStore.getCollection(t.collectionId)?.name ?? 'Sem coleção',
    value: t.id,
  }));
});
</script>

<style scoped>
@reference '@/assets/css/main.css';

.tournament-profile__content {
  @apply flex flex-col flex-wrap gap-y-0.5 gap-x-1 @min-[27rem]/tournament-profile:flex-row;
}
.tournament-profile__badges {
  @apply flex-wrap @min-[27rem]/tournament-profile:order-1 @min-[27rem]/tournament-profile:w-full;
}
.tournament-profile__select {
  @apply select-sm max-w-8 @min-[27rem]/tournament-profile:self-center;
}
</style>
