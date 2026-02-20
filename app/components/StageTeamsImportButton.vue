<template>
  <AppTooltip label="Importar participantes">
    <AppButton
      class="btn-square btn-accent btn-soft"
      aria-label="Fill slots"
      :icon-left="IconFileArrowLeft"
      @click="openFileExplorer"
    />
  </AppTooltip>
</template>

<script lang="ts" setup>
import { IconFileArrowLeft } from '@tabler/icons-vue';

const props = defineProps<{
  selectedTeams: Array<Team['id']>;
}>();

const groups = defineModel<StageTeamsForm['groups']>({ required: true });

function onFileImported(files: UseImportSourceFilesHandlerParams) {
  const [tournamentFile] = files.tournamentFiles;
  const [collectionFile] = files.collectionFiles;

  const tournament = tournamentFile?.data || collectionFile?.data.tournaments[0];

  if (!tournament) return;

  const teams = tournament.stages.flatMap((stage) => {
    if (stage.type === StageType.GROUP) {
      return stage.groups.flatMap(g => g.standings.map(s => s.team));
    }

    return stage.rounds.flatMap(r => (
      r.slots.flatMap(s => s.legs.flatMap(l => [l.homeTeam.id, l.awayTeam.id]))
    ));
  });

  const uniqueTeams = Array.from(
    new Set(teams.filter(t => !!t && !props.selectedTeams.includes(t))),
  );

  for (const group of groups.value) {
    for (const index in group.teams) {
      if (group.teams[index] === null) {
        group.teams[index] = uniqueTeams.shift() ?? null;
      }
    }
  }
}

const { openFileExplorer } = useImportSourceFiles(onFileImported);
</script>
