<template>
  <CollectionProfileCard />
  <section class="mt-2">
    <div class="flex justify-between mb-1">
      <h2 class="font-medium text-xl">Campeonatos</h2>
      <TournamentFormModal :submit-fn="handleCreateTournament">
        <template #trigger="{ openModal }">
          <AppButton
            label="Criar campeonato"
            class="btn-primary btn-sm"
            :icon-left="IconPlus"
            @click="openModal"
          />
        </template>
      </TournamentFormModal>
    </div>
    <CollectionTournamentsTable v-if="Object.values(collectionStore.activeCollection?.data.tournaments ?? {}).length" />
    <div
      v-else
      class="flex flex-col items-center text-center max-w-1/3 m-auto"
    >
      <IconFile class="size-4 opacity-60 mb-1" />
      <div class="textarea-xl font-medium mb-0.5">
        Nenhum campeonato ainda
      </div>
      <p>Essa coleção ainda não possui nenhum campeonato. Os campeonatos que você cria aparecerão aqui.</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { IconPlus } from '@tabler/icons-vue';
import IconFile from '@/assets/icons/File.svg';
import { newTournament } from '~/helpers/tournament';

const collectionStore = useCollectionStore();

function handleCreateTournament(form: TournamentForm) {
  if (collectionStore.activeCollection) {
    collectionStore.addTournamentToCollection(collectionStore.activeCollection.id, newTournament(form));
  }
}
</script>
