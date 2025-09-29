<template>
  <div class="card card-border rounded-lg flex-row items-center">
    <label class="input input-ghost max-w-14">
      <IconSearch class="h-[1em] opacity-50" />
      <input
        class="grow"
        type="search"
        placeholder="Search"
        @keypress.enter="onSelectTeam"
      />
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

const TEAM_FILTER_OPTIONS: SelectOptionList<TeamFilter> = [
  { label: 'Todos', value: TeamFilter.ALL },
  { label: 'Seleção', value: TeamFilter.NATIONAL },
  { label: 'Personalizado', value: TeamFilter.CUSTOM },
];

const { teamList } = useTeamStore();

const emit = defineEmits<{
  (e: 'select', team: Team): void;
}>();
const props = defineProps<{
  selectedTeams: Array<Team['id']>;
}>();

const form = ref<{ filter: TeamFilter }>({
  filter: TeamFilter.ALL,
});

const teamOptions = computed(() => teamList.filter((t) => (
  !props.selectedTeams.includes(t.id)
  && (form.value.filter === TeamFilter.ALL
    || (form.value.filter === TeamFilter.NATIONAL && t.national)
    || (form.value.filter === TeamFilter.CUSTOM && t.custom)
  )
)));

function onSelectTeam() {
  emit('select', {
    id: teamOptions.value[0]!.id,
    name: teamOptions.value[0]!.name,
  });
}
</script>
