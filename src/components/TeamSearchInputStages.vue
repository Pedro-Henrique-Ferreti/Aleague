<template>
  <div class="stage-list">
    <div
      v-for="stage in displayedStages"
      class="stage-list__item"
      :key="stage.id"
    >
      <b class="stage-list__name">
        {{ stage.name }}
      </b>
      <div
        v-for="group in stage.groups.filter((group) => group.teams.length > 0)"
        class="stage-list__group"
        :key="group.name"
      >
        <AppChip
          class="stage-list__group-name"
          color="blue"
          size="small"
          :text="group.name"
        />
        <slot :teams="group.teams" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
interface StagePreviewGroup {
  name: string;
  teams: MatchTeam[];
}

interface StagePreview {
  id: string;
  name: string;
  groups: StagePreviewGroup[];
}
</script>

<script lang="ts" setup>
import type { MatchTeam } from '@/types/Match';
import { TournamentStageType, type TournamentStage } from '@/types/Tournament';
import { computed, type PropType } from 'vue';
import AppChip from './AppChip.vue';

const props = defineProps({
  stages: {
    type: Array as PropType<TournamentStage[]>,
    required: true,
  },
});

const displayedStages = computed<StagePreview[]>(() => ([...props.stages].reverse().map((stage) => {
  let groups: StagePreviewGroup[] = [];

  if (stage.type === TournamentStageType.GROUPS) {
    groups = stage.groups.map((group) => ({
      name: `Grupo ${group.number}`,
      teams: group.standings.map(({ team }) => team).filter((team) => team.id !== null),
    }));
  } else {
    const round = stage.rounds[stage.rounds.length - 1];

    groups = round.matchups.filter(
      (matchup) => (matchup.firstTeam && matchup.secondTeam),
    ).map((matchup, index) => ({
      name: `${round.name} - Partida ${index + 1}`,
      teams: [matchup.firstTeam, matchup.secondTeam] as MatchTeam[],
    }));
  }

  return { id: stage.id, name: stage.name || '', groups };
})).filter((stage) => stage.groups.some((group) => group.teams.length > 0)));
</script>

<style lang="scss" scoped>
.stage-list {
  display: grid;
  gap: 0.5rem;
  padding: 0 0.5rem;
  &__name {
    color: $color--text-strong;
    font-size: 0.875rem;
    font-weight: $font-weight--semibold;
  }
  &__group {
    padding: 0 0.5rem;
    margin-top: 0.5rem;
  }
  &__group-name {
    margin-bottom: 0.25rem;
  }
}
</style>
