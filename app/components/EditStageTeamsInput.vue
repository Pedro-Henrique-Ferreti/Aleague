<template>
  <div class="card card-border rounded-lg flex-row items-center">
    <label class="input input-ghost max-w-14 [anchor-name:--teams-input]">
      <IconSearch class="w-auto h-[1em] opacity-50 shrink-0" />
      <input
        v-model.trim="form.search"
        class="grow"
        type="search"
        placeholder="Search"
        :id="inputId"
        @click="showPopover"
        @keypress.enter="showPopover"
      />
      <ul
        ref="popoverRef"
        class="dropdown menu w-full max-w-14.5 max-h-14.5 rounded-box bg-base-100 top-0.25 border border-base-200 [position-anchor:--teams-input]"
        popover
        :id="popoverId"
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
            />
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

<script lang="ts">
type TeamTypeFilter = TeamType | '';

interface Form {
  search: string;
  filter: TeamTypeFilter;
  country: string;
}
</script>

<script lang="ts" setup>
import { IconSearch } from '@tabler/icons-vue';

const MAX_DISPLAYED_OPTIONS = 20;
const inputId = useId();
const popoverId = useId();

const TEAM_TYPE_OPTIONS: SelectOptionList<TeamTypeFilter> = [
  { label: 'Todos', value: '' },
  { label: 'Clube', value: TeamType.CLUB },
  { label: 'Seleção', value: TeamType.NATIONAL },
  { label: 'Personalizado', value: TeamType.CUSTOM },
];

const { getTeamById } = useTeamStore();

const emit = defineEmits<{
  (e: 'select', team: Team): void;
}>();
const props = defineProps<{
  selectedTeams: Array<Team['id']>;
}>();

const form = ref<Form>({
  search: '',
  filter: '',
  country: '',
});

const teamOptions = computed<TeamDetails[]>(() => DETAILED_TEAM_LIST.filter((t) => (
  !props.selectedTeams.includes(t.id) && (
    form.value.search === ''
    || normalizeString(t.name).toLowerCase().includes(normalizeString(form.value.search).toLowerCase())
  ) && (form.value.filter === '' || form.value.filter === t.type) && (
    form.value.country === '' || t.country === form.value.country
  )
)));

// Popover
const popoverRef = useTemplateRef<HTMLElement>('popoverRef');

function showPopover() {
  popoverRef.value?.showPopover();
}

// Exposed values
defineExpose({ teamOptions });
</script>
