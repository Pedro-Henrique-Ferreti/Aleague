<template>
  <div class="flex gap-0.25 items-center">
    <span class="font-semibold">Sequência</span>
    <AppButton
      class="btn-square btn-ghost btn-xs"
      aria-label="Filters"
      :icon-left="showFilters ? IconChevronUp : IconChevronDown"
      @click="showFilters = !showFilters"
    />
  </div>
  <div
    v-if="showFilters"
    class="flex flex-wrap gap-0.5 mt-0.5"
  >
    <input
      v-for="team in teamOptions"
      v-model="selectedTeams"
      class="btn btn-xs rounded-md"
      type="checkbox"
      name="teams"
      :key="String(team)"
      :value="team"
      :aria-label="getTeamById(team)?.name"
    />
    <button
      class="btn btn-square btn-xs rounded-md"
      type="button"
      aria-label="Clear selected teams"
      @click="selectedTeams = []"
    >
      ✕
    </button>
  </div>
  <swiper-container
    class="mt-1"
    space-between="16"
    free-mode="true"
    slides-per-view="auto"
  >
    <swiper-slide
      v-for="item in displayedForm"
      :key="item.match.id"
      class="w-max last:mr-0!"
      data-allow-mismatch="class"
    >
      <StandingsFormItem
        class="min-h-7"
        :form="item"
        :team-id="teamId"
      />
    </swiper-slide>
  </swiper-container>
</template>

<script lang="ts" setup>
import { IconChevronDown, IconChevronUp } from '@tabler/icons-vue';

const { getTeamById } = useTeamStore();

const props = defineProps<{
  form: TableEntry['form'];
  teamId: TableEntry['team'];
}>();

const showFilters = ref(false);

// Team options
const selectedTeams = ref<Team['id'][]>([]);

const teamOptions = computed(() => (
  Array.from(
    new Set(props.form.flatMap((i) => [i.match.homeTeam.id, i.match.awayTeam.id]))
  ).filter((id) => id !== null && id !== props.teamId)
));

// Form
const displayedForm = computed(() => props.form.filter(({ match }) => (
  selectedTeams.value.length === 0
  || selectedTeams.value.includes(match.homeTeam.id!)
  || selectedTeams.value.includes(match.awayTeam.id!)
)));
</script>
