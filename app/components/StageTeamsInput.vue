<template>
  <div class="card card-border rounded-lg flex-row items-center">
    <label class="input input-ghost max-w-14 [anchor-name:--teams-input]">
      <IconSearch class="w-auto h-[1em] opacity-50 shrink-0" />
      <input
        v-model.trim="form.search"
        :id="inputId"
        class="grow"
        type="search"
        placeholder="Search"
        @click="showPopover"
        @keypress.enter="showPopover"
      >
      <ul
        ref="popoverRef"
        :id="popoverId"
        class="dropdown menu w-full max-w-14.5 max-h-14.5 rounded-box bg-base-100 top-0.25 border border-base-200 [position-anchor:--teams-input]"
        popover
      >
        <li
          v-if="teamOptions.length === 0"
          class="opacity-60 p-0.5"
        >
          Nenhuma equipe encontrada
        </li>
        <li
          v-for="team in teamOptions.slice(0, MAX_DISPLAYED_OPTIONS)"
          :key="team.id"
        >
          <button
            class="cursor-pointer py-0.5 px-0.75 rounded-lg transition-colors duration-200 hover:bg-base-200 focus:bg-base-200"
            type="button"
            @click="$emit('select', { id: team.id, name: team.name })"
          >
            <img
              class="size-1.25"
              alt="Team badge"
              :src="getTeamById(team.id)?.badge || ''"
            >
            <span>{{ team.name }}</span>
          </button>
        </li>
      </ul>
    </label>
    <div class="divider divider-horizontal m-0" />
    <BaseSelect
      v-model="form.filter"
      class="w-7.5 select-sm select-ghost px-0.5"
      :options="TEAM_TYPE_OPTIONS"
    />
    <div class="divider divider-horizontal m-0" />
    <BaseSelect
      v-model="form.country"
      class="w-8 select-sm select-ghost px-0.5"
      :options="COUNTRY_OPTIONS"
    />
  </div>
</template>

<script lang="ts" setup>
import { IconSearch } from '@tabler/icons-vue';

/* eslint-disable ts/prefer-literal-enum-member */
// This is needed to allow using TeamType values as SelectOption values without type issues.
enum TeamTypeFilter {
  All = '',
  CLUB = TeamType.CLUB,
  NATIONAL = TeamType.NATIONAL,
  CUSTOM = TeamType.CUSTOM,
  TOURNAMENT = 'tournament',
}

interface Form {
  search: string;
  filter: TeamTypeFilter;
  country: string;
}

const props = defineProps<{
  selectedTeams: Array<Team['id']>;
  stageId: TournamentStage['id'];
}>();

defineEmits<{ select: [Team] }>();

const MAX_DISPLAYED_OPTIONS = 60;
const TEAM_TYPE_OPTIONS: SelectOptionList<TeamTypeFilter> = [
  { label: 'Todos', value: TeamTypeFilter.All },
  { label: 'Clube', value: TeamTypeFilter.CLUB },
  { label: 'Seleção', value: TeamTypeFilter.NATIONAL },
  { label: 'Personalizado', value: TeamTypeFilter.CUSTOM },
  { label: 'Campeonato', value: TeamTypeFilter.TOURNAMENT },
];

const inputId = useId();
const popoverId = useId();

const tournamentStore = useTournamentStore();
const { getTeamById } = useTeamStore();

const form = ref<Form>({
  search: '',
  filter: TeamTypeFilter.All,
  country: '',
});

const teamsInTournament = computed(() => {
  const stages = tournamentStore.activeTournament!.stages.filter(s => s.id !== props.stageId);

  return stages.flatMap((stage) => {
    if (stage.type === StageType.GROUPS) {
      return stage.groups.flatMap(group => group.standings.map(entry => entry.team));
    } else {
      return stage.rounds.flatMap(round => round.slots.flatMap(slot => slot.legs.flatMap(leg => [leg.homeTeam.id, leg.awayTeam.id])));
    }
  });
});

const teamOptions = computed<TeamDetails[]>(() => DETAILED_TEAM_LIST.filter((team) => {
  const parseName = (name: string) => normalizeString(name).toLowerCase();
  const { search, filter, country } = form.value;

  const isSearchValid = search === '' || parseName(team.name).includes(parseName(search));
  const isCountryValid = country === '' || team.country === country;
  const isTypeValid = filter === TeamTypeFilter.All || (
    (filter === TeamTypeFilter.TOURNAMENT) ? teamsInTournament.value.includes(team.id) : (filter as unknown as TeamType) === team.type
  );

  return !props.selectedTeams.includes(team.id) && isSearchValid && isTypeValid && isCountryValid;
}));

// Popover
const popoverRef = useTemplateRef<HTMLElement>('popoverRef');

function showPopover() {
  popoverRef.value?.showPopover();
}

// Exposed values
defineExpose({ teamOptions });
</script>
