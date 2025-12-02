<template>
  <div class="tooltip" data-tip="Importar participantes">
    <AppButton
      class="btn-square btn-accent btn-soft"
      aria-label="Fill slots"
      :icon-left="IconFileArrowLeft"
      @click="importTournament"
    />
  </div>
</template>

<script lang="ts" setup>
import { IconFileArrowLeft } from '@tabler/icons-vue';
import type { StageTeamsForm } from './StageTeamsModal.vue';

const props = defineProps<{
  selectedTeams: Array<Team['id']>;
}>();

const groups = defineModel<StageTeamsForm['groups']>({ required: true });

const { start: importTournament } = useImportTournament((data: Tournament[]) => {
  const [tournament] = data;

  if (!tournament) return;

  const teams = tournament.stages.flatMap((stage) => {
    if (stage.type === StageType.GROUPS) {
      return stage.groups.flatMap((g) => g.standings.map((s) => s.team));
    }

    return stage.rounds.flatMap((r) => (
      r.slots.flatMap((s) => s.legs.flatMap((l) => [l.homeTeam.id, l.awayTeam.id]))
    ));
  });

  const uniqueTeams = Array.from(
    new Set(teams.filter((t) => !!t && !props.selectedTeams.includes(t))),
  );

  for (const group of groups.value) {
    for (let index in group.teams) {
      if (group.teams[index] === null) {
        group.teams[index] = uniqueTeams.shift() ?? null;
      }
    }
  }
});
</script>
