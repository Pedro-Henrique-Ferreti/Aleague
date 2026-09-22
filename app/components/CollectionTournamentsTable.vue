<template>
  <div class="overflow-x-auto">
    <table class="table table-empty-cell-content">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Categoria</th>
          <th>Vencedor</th>
          <th>Última modificação</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="tournament in tournaments"
          :key="tournament.id"
          class="hover:bg-base-content/10 transition-colors cursor-pointer"
          tabindex="0"
          @click="tournamentStore.activeTournamentId = tournament.id"
        >
          <td>
            <div class="flex items-center gap-1">
              <img
                class="w-auto max-w-2 h-2"
                alt="Logo do campeonato"
                :src="tournament.icon"
              >
              {{ tournament.name }}
            </div>
          </td>
          <td>
            <span
              v-for="tag, index in tournament.tags"
              :key="index"
              class="badge badge-ghost badge-sm"
            >{{ tag }}</span>
          </td>
          <td>
            <TeamDetails
              v-if="winners[tournament.id]"
              :team="winners[tournament.id]!"
              :show-country="tournament.showCountry"
            />
          </td>
          <td>{{ formatDate(tournament?.updatedAt, 'd MMM, yyyy') }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { getTournamentWinner } from '~/helpers/tournament';

const collectionStore = useCollectionStore();
const tournamentStore = useTournamentStore();

const tournaments = computed(() => {
  return tournamentStore.tournamentList.filter(t => t.collectionId === collectionStore.activeCollection?.id);
});

const winners = computed<Record<Tournament['id'], TournamentWinner>>(() => {
  return Object.fromEntries(tournaments.value.map(t => [t.id, getTournamentWinner(t)]));
});
</script>
