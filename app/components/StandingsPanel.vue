<template>
  <div class="w-24">
    <div class="mb-1 font-semibold text-lg">Classificação</div>
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
        class="not-last-of-type:mb-1.5"
      >
        <span
          v-if="selectedStage.groups.length > 1"
          class="block font-medium mb-0.75"
        >
          {{ getGroupName(group.order, selectedStage.nameFormat) }}
        </span>
        <StandingsTable
          display-mode="compact"
          disable-movement-transition
          :legend="group.legend"
          :standings="group.standings"
          :disabled-entries="getDisabledEntries(group)"
          @table-entry-click="handleSelectTeam($event?.team ?? '')"
        />
      </div>
      <LegendsCard
        class="mt-1"
        :legends="selectedStage.legendDescription"
      />
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
import { getTeamById } from '@/helpers/team';
import { isCollectionFile } from '~/helpers/file';
import { getGroupName, isGroupStageSeeded } from '~/helpers/group-stage';
import { isPlayoffStageSeeded } from '~/helpers/playoff-stage';

const props = defineProps<{
  selectedTeams: Team['id'][];
  initialTournament?: Tournament;
}>();
const emit = defineEmits<{
  selectTeam: [Team];
  closePanel: [];
}>();

const fileStore = useFileStore();

const tournamentOptions = computed(() => {
  return Object.values(fileStore.files).flatMap<SelectOption<Tournament>>((file) => {
    if (isCollectionFile(file)) {
      return Object.values(file.data.tournaments).map(t => ({
        label: t.name,
        value: t,
        groupLabel: file.data.name,
      }));
    }

    return {
      label: file.data.name,
      value: file.data,
    };
  });
});

const selectedTournament = ref(props.initialTournament ?? tournamentOptions.value[0]?.value);
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

function getDisabledEntries(group: GroupStageGroup): StandingsEntry['id'][] {
  return group.standings.filter(entry => props.selectedTeams.includes(entry.team ?? '')).map(entry => entry.id);
}

function handleSelectTeam(id: Team['id']) {
  const team = getTeamById(id);

  if (team) {
    emit('selectTeam', team);
  }
}
</script>
