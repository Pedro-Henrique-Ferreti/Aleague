<template>
  <div
    class="standings-team flex items-center h-full"
    :style="`--clr:${getColor(qualifier)};`"
  >
    <button
      class="font-medium text-[1rem] size-1.5 btn btn-ghost p-0"
      type="button"
      :style="`anchor-name:--team-button-${popoverId}`"
      :popovertarget="popoverId"
      @click.stop
    >
      {{ position }}
    </button>
    <div
      class="dropdown menu p-0.5 flex flex-row rounded-md bg-base-100 shadow-sm dropdown-right"
      popover
      :id="popoverId"
      :style="`position-anchor:--team-button-${popoverId}`"
    >
      <button
        v-for="color in QUALIFIER_COLORS"
        class="flex items-center justify-center size-1.75 cursor-pointer"
        aria-label="Select qualifier color"
        :key="color"
        @click.stop="qualifier === color ? qualifier = Qualifier.NONE : qualifier = color"
      >
        <component
          :style="`fill:${getColor(color)}`"
          :is="color === qualifier ? IconCircleDotFilled : IconCircleFilled"
        />
      </button>
    </div>
    <span class="size-0.25 ml-0.75 mr-1 rounded-full bg-base-200" />
    <img
      class="size-1.5 mr-0.75"
      alt="Team badge"
      :src="team?.badge || ''"
    />
    <div>
      {{ team?.name }}
        <span
          v-if="tournamentStore.activeTournament?.showCountry && team"
          v-text="team.country"
          class="badge badge-secondary badge-soft badge-xs inline-block ml-0.5"
        />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IconCircleDotFilled, IconCircleFilled } from '@tabler/icons-vue';

const QUALIFIER_COLORS = [
  Qualifier.GREEN,
  Qualifier.BLUE,
  Qualifier.RED,
  Qualifier.ORANGE
];

const popoverId = useId();

const tournamentStore = useTournamentStore();
const { getTeamById } = useTeamStore();

const props = defineProps<{
  position: number;
  teamId: TeamDetails['id'];
}>();

const qualifier = defineModel<Qualifier>('qualifier', { required: true });

const team = computed(() => getTeamById(props.teamId));

function getColor(value: Qualifier) {
  switch (value) {
    case Qualifier.GREEN:
      return '#00a63e';
    case Qualifier.BLUE:
      return '#2b7fff';
    case Qualifier.RED:
      return '#fb2c36';
    case Qualifier.ORANGE:
      return '#ff6900';
    case Qualifier.NONE:
    default:
      return 'transparent';
  }
}
</script>

<style scoped>
@reference '@/assets/css/main.css';

.standings-team::before {
  @apply content-[''] absolute left-0 h-[calc(100%-0.5rem)] w-0.25 bg-(--clr) rounded-e-md;
}
</style>
