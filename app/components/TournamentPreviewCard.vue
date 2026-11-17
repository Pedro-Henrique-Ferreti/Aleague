<template>
  <BaseButton
    class="card card-border p-1 hover:shadow-sm hover:border-base-300 transition-colors duration-200 ease-in-out"
    :to="{ name: 'editor', params: { fileId, tournamentId: tournament.id } }"
  >
    <div class="flex justify-between">
      <img
        class="w-auto h-2"
        alt="Logo do campeonato"
        :src="tournament.icon"
      >
      <div class="flex gap-0.25">
        <AppBadge
          v-for="tag, index in tournament.tags"
          :key="index"
          class="badge-sm badge-soft"
          :text="tag"
        />
      </div>
    </div>
    <h2 class="mt-1 font-medium text-base">{{ tournament.name }}</h2>
    <span class="text-base-content/70 text-xs">Criado em: {{ formatDate(tournament.createdAt, 'dd/MM/yyyy') }}</span>
    <span
      v-if="winner"
      class="text-base-content/70 text-xs flex gap-0.5"
    >
      Vencedor:
      <TeamDetails
        size="xs"
        :team="winner"
      />
    </span>
  </BaseButton>
</template>

<script lang="ts" setup>
import { getTournamentWinner } from '~/helpers/tournament';

const props = defineProps<{
  tournament: Tournament;
  fileId: SourceFile['id'];
}>();

const winner = computed(() => getTournamentWinner(props.tournament));
</script>
