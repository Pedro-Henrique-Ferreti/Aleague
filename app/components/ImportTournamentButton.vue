<template>
  <AppButton
    class="btn-primary btn-outline"
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
  multiple: true,
});

onChange((files) => {
  if (!files) return;

  for (const file of files) {
    const reader = new FileReader();
  
    reader.onload = () => {
      const tournament = JSON.parse(reader.result as string) as Tournament;
  
      if (tournamentStore.tournaments.find((i) => i.id === tournament.id)) {
        throw new Error('Campeonato já importado');
      }
  
      tournamentStore.tournaments.push(tournament);
      tournamentStore.activeTournamentId = tournament.id;
    };
  
    reader.readAsText(file);
  }
});
</script>
