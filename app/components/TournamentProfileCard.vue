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
          v-if="isCollectionTournament && tournamentOptions.length > 1"
          class="tournament-profile__select"
          :model-value="tournamentStore.activeTournament?.id"
          :options="tournamentOptions"
          @update:model-value="handleSelectTournament"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconClock, IconPencil } from '@tabler/icons-vue';
import { isCollectionFile } from '~/helpers/file';

const router = useRouter();
const fileStore = useFileStore();
const tournamentStore = useTournamentStore();

const tournament = computed(() => tournamentStore.activeTournament);

const isCollectionTournament = computed(() => {
  return !!(tournament.value && fileStore.getCollectionFileByTournament(tournament.value));
});

const tournamentOptions = computed(() => {
  return Object.values(fileStore.files).flatMap<SelectOption<Tournament['id']>>((file) => {
    if (!isCollectionFile(file)) return [];

    return Object.values(file.data.tournaments).filter(t => t.name === tournament.value?.name).map(t => ({
      label: file.data.name,
      value: t.id,
    }));
  });
});

function handleSelectTournament(id?: Tournament['id']) {
  if (!id) return;

  const file = Object.values(fileStore.files).find((file) => {
    return isCollectionFile(file) ? file.data.tournaments[id] : file.data.id === id;
  });

  if (file) {
    router.push({ name: 'editor', params: { fileId: file.id } });
  }
}
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
