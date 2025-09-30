<template>
  <div class="card card-border rounded-lg flex-row items-center">
    <label class="input input-ghost max-w-14 [anchor-name:--teams-input]">
      <IconSearch class="h-[1em] opacity-50" />
      <input
        v-model.trim="form.search"
        class="grow"
        type="search"
        placeholder="Search"
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
          v-for="team in teamOptions.slice(0, 12)"
          :key="team.id"
        >
          <button
            class="cursor-pointer py-0.5 px-0.75 rounded-lg transition-colors duration-200 hover:bg-base-200 focus:bg-base-200"
            type="button"
            @click="$emit('select', team)"
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
      class="w-8 select-sm select-ghost"
      :options="TEAM_FILTER_OPTIONS"
    />
  </div>
</template>

<script lang="ts">
enum TeamFilter {
  ALL,
  NATIONAL,
  CUSTOM,
}
</script>

<script lang="ts" setup>
import { IconSearch } from '@tabler/icons-vue';

const popoverId = useId();

const TEAM_FILTER_OPTIONS: SelectOptionList<TeamFilter> = [
  { label: 'Todos', value: TeamFilter.ALL },
  { label: 'Seleção', value: TeamFilter.NATIONAL },
  { label: 'Personalizado', value: TeamFilter.CUSTOM },
];

const { teamList, getTeamById } = useTeamStore();

const emit = defineEmits<{
  (e: 'select', team: Team): void;
}>();
const props = defineProps<{
  selectedTeams: Array<Team['id']>;
}>();

const form = ref<{ search: string; filter: TeamFilter }>({
  search: '',
  filter: TeamFilter.ALL,
});

const teamOptions = computed(() => teamList.filter((t) => (
  !props.selectedTeams.includes(t.id)
  && (
    form.value.search === ''
    || normalizeString(t.name).toLowerCase().includes(normalizeString(form.value.search).toLowerCase())
  )  && (form.value.filter === TeamFilter.ALL
    || (form.value.filter === TeamFilter.NATIONAL && t.national)
    || (form.value.filter === TeamFilter.CUSTOM && t.custom)
  )
)));

// Popover
const popoverRef = useTemplateRef<HTMLElement>('popoverRef');

function showPopover() {
  popoverRef.value?.showPopover();
}
</script>
