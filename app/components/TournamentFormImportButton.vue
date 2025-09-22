<template>
  <AppButton
    class="btn-primary"
    label="Importar"
    :icon-left="IconFileArrowLeft"
    @click="open"
  />
</template>

<script lang="ts" setup>
import { IconFileArrowLeft } from '@tabler/icons-vue';

const tournamentStore = useTournamentStore();

const { open, onChange } = useFileDialog({
  accept: '.json',
  multiple: false,
});

onChange((files) => {
  if (!files || !files[0]) return;

  const reader = new FileReader();

  reader.onload = () => {
    const tournament = JSON.parse(reader.result as string) as Tournament;

    if (tournamentStore.tournaments.find((i) => i.id === tournament.id)) {
      throw new Error('Campeonato já importado');
    }

    tournamentStore.tournaments.push(tournament);
    tournamentStore.activeTournamentId = tournament.id;
  };

  reader.readAsText(files[0]);
});
</script>
