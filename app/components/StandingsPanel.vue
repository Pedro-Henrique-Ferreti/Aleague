<template>
  <div class="w-24 max-h-[76vh] overflow-y-auto pl-1 border-l border-base-200 sticky top-3">
    <div class="mb-1 flex items-center gap-0.5">
      <AppTooltip label="Fechar painel">
        <AppButton
          class="btn-square btn-ghost btn-sm -ml-0.5"
          aria-label="Fechar painel"
          :icon-left="IconLayoutSidebarLeftExpand"
          @click="$emit('closePanel')"
        />
      </AppTooltip>
      <div class="font-semibold text-lg">Classificação</div>
    </div>
    <div class="grid mb-1.5 gap-0.75">
      <AppSelect
        v-model="selectedTournament"
        label="Campeonato"
        :options="tournamentOptions"
      />
      <AppSelect
        v-if="stageOptions.length > 1"
        v-model="selectedStage"
        label="Fase"
        :options="stageOptions"
      />
    </div>
    <div v-if="showEmptyState">
      <div class="text-lg text-center font-semibold mb-0.5">
        {{ stageOptions.length > 1 ? 'Fase incompleta' : 'Campeonato incompleto' }}
      </div>
      <p class="text-center">
        Você deve adicionar todas as equipes para visualizar a classificação
        {{ stageOptions.length > 1 ? 'desta fase' : 'do campeonato' }}.
      </p>
    </div>
    <template v-else-if="selectedStage?.type === StageType.GROUP">
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
          :legend="group.legend"
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
import { getGroupName, isGroupStageSeeded } from '~/helpers/group-stage';
import { isPlayoffStageSeeded } from '~/helpers/playoff';

const props = defineProps<{
  selectedTeams: Team['id'][];
}>();
const emit = defineEmits<{
  selectTeam: [Team];
  closePanel: [];
}>();

const collectionStore = useCollectionStore();
const tournamentStore = useTournamentStore();

const tournamentOptions = computed(() => {
  return tournamentStore.tournaments.map((tournament): SelectOption<Tournament> => ({
    label: tournament.name,
    value: tournament,
    groupLabel: collectionStore.getCollection(tournament.collectionId)?.name,
  }));
});

const selectedTournament = ref<Tournament | undefined>(tournamentOptions.value[0]?.value);
const selectedStage = ref<TournamentStage>();

const stageOptions = computed(() => {
  return selectedTournament.value?.stages.map((stage): SelectOption<TournamentStage> => ({
    label: stage.name,
    value: stage,
  })) ?? [];
});

watchEffect(() => {
  selectedStage.value = stageOptions.value[0]?.value;
});

const showEmptyState = computed(() => {
  return (
    !selectedStage.value || (
      selectedStage.value.type === StageType.GROUP
        ? !isGroupStageSeeded(selectedStage.value.groups)
        : !isPlayoffStageSeeded(selectedStage.value.rounds)
    )
  );
});

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
