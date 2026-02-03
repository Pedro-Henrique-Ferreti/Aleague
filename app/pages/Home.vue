<template>
  <NuxtLayout :name="tournamentStore.tournaments.length > 0 ? 'tournaments' : 'default'">
    <template
      v-if="tournamentStore.tournaments.length > 0"
      #header
    >
      <HomeHeader />
    </template>
    <div
      v-if="tournamentStore.tournaments.length === 0"
      class="flex flex-col items-center pt-3"
    >
      <h1 class="text-3xl font-semibold mb-0.5">Bem-vindo ao Alegue</h1>
      <p>Para começar, importe um campeonato ou crie um novo.</p>
      <div class="flex mt-2 w-full items-center justify-center">
        <OpenFileButton class="w-full max-w-12" />
        <div class="divider divider-horizontal h-5!">ou</div>
        <CreateTournamentMenu
          button-label="Criar"
          class="w-full max-w-12 btn-outline"
          dropdown-class="w-full max-w-12"
        />
      </div>
    </div>
    <TournamentPage
      v-else-if="activeTournament"
      v-model="activeTournament"
      :key="String(tournamentStore.activeTournamentId)"
    />
  </NuxtLayout>
</template>

<script setup lang="ts">
const tournamentStore = useTournamentStore();

const activeTournament = computed({
  get: () => tournamentStore.activeTournament,
  set: (tournament) => {
    const index = tournamentStore.tournaments.findIndex(t => t.id === tournament?.id);
    
    if (index > -1 && tournament) {
      tournamentStore.tournaments[index] = tournament;
    }
  },
});

definePageMeta({
  layout: false,
});
</script>
