<template>
  <NuxtLayout name="default">
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
        <ImportTournamentButton class="w-full max-w-12" />
        <div class="divider divider-horizontal h-5!">ou</div>
        <CreateTournamentButton class="w-full max-w-12" />
      </div>
    </div>
    <TournamentList v-else />
  </NuxtLayout>
</template>

<script setup lang="ts">
const tournamentStore = useTournamentStore();

definePageMeta({
  layout: false,
});
</script>
