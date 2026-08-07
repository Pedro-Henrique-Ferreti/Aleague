<template>
  <NuxtLayout>
    <template #header>
      <FileToolbar v-if="tournamentStore.activeTournament || collectionStore.activeCollection" />
    </template>
    <TournamentPage
      v-if="tournamentStore.activeTournamentId"
      :key="String(tournamentStore.activeTournamentId)"
    />
    <CollectionPage
      v-else-if="collectionStore.activeCollection?.id"
      :key="String(collectionStore.activeCollection?.id)"
    />
    <WelcomeMessage
      v-else
      class="mt-10"
      title="Bem-vindo ao Alegue"
      message="Para começar, abra uma coleção ou um campeonato. Você também pode criar um novo."
    >
      <div class="divider divider-horizontal h-5!">ou</div>
      <CreateFileMenu
        class="w-full max-w-12 btn-outline"
        dropdown-class="w-full max-w-12"
      />
    </WelcomeMessage>
  </NuxtLayout>
</template>

<script setup lang="ts">
import FileToolbar from '~/components/FileToolbar.vue';

const collectionStore = useCollectionStore();
const tournamentStore = useTournamentStore();
</script>
