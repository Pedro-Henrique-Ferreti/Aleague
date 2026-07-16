<template>
  <div class="w-22 max-h-[76vh] overflow-y-auto pl-1 border-l border-base-200 sticky top-3">
    <div class="mb-0.5">
      <AppTooltip label="Fechar painel">
        <AppButton
          class="btn-square btn-ghost btn-sm -ml-0.5"
          aria-label="Fechar painel"
          :icon-left="IconLayoutSidebarLeftExpand"
          @click="$emit('closePanel')"
        />
      </AppTooltip>
    </div>
    <BaseSelect
      v-model="selectedStage"
      class="mb-1.5"
      :options="stageOptions"
    />
    <template v-if="selectedStage?.type === StageType.GROUP">
      <div
        v-for="group in selectedStage.groups"
        :key="group.order"
        class="not-last:mb-1.5"
      >
        <span class="block font-medium mb-0.75">{{ getGroupName(group, selectedStage) }}</span>
        <StandingsTable
          display-mode="compact"
          disable-movement-transition
          :table-entry="undefined"
          :qualifier="group.qualifier"
          :standings="group.standings"
          :disabled-entries="getDisabledEntries(group)"
          @update:table-entry="handleSelectTeam($event?.team ?? '')"
        />
      </div>
    </template>
    <StandingsPanelPlayoff
      v-else-if="selectedStage?.type === StageType.PLAYOFF"
      :stage="selectedStage"
      :disabled-teams="selectedTeams"
      @select-team="handleSelectTeam"
    />
  </div>
</template>

<script lang="ts" setup>
import { IconLayoutSidebarLeftExpand } from '@tabler/icons-vue';
import { getTeamById } from '@/helpers/team';
import { getGroupName } from '~/helpers/group-stage';

const props = defineProps<{
  selectedTeams: Team['id'][];
}>();
const emit = defineEmits<{
  selectTeam: [Team];
  closePanel: [];
}>();

const tournamentStore = useTournamentStore();

const stageOptions = computed<SelectOptionList<TournamentStage>>(() => {
  return tournamentStore.activeTournament?.stages.map(stage => ({
    label: stage.name,
    value: stage,
  })) ?? [];
});

const selectedStage = ref<TournamentStage | undefined>(stageOptions.value[0]?.value);

function getDisabledEntries(group: GroupStage['groups'][number]): StandingsEntry['id'][] {
  return group.standings.filter(entry => props.selectedTeams.includes(entry.team ?? '')).map(entry => entry.id);
}

function handleSelectTeam(id: Team['id']) {
  const team = getTeamById(id);

  if (team) {
    emit('selectTeam', team);
  }
}
</script>
