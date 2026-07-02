<template>
  <div
    class="standings-team flex items-center h-full"
    :style="`--clr:${getColor(qualifier)};`"
  >
    <span
      v-if="disableQualifierSelector"
      class="qualifier-button"
    >
      {{ position }}
    </span>
    <template v-else>
      <button
        class="qualifier-button btn btn-ghost p-0"
        type="button"
        :style="`anchor-name:--team-button-${popoverId}`"
        :popovertarget="popoverId"
        @click.stop
      >
        {{ position }}
      </button>
      <div
        :id="popoverId"
        class="dropdown menu p-0.5 rounded-md bg-base-100 shadow-sm dropdown-right"
        popover
        :style="`position-anchor:--team-button-${popoverId}`"
      >
        <div class="flex flex-row">
          <button
            v-for="color in QUALIFIER_COLORS"
            :key="color"
            class="flex items-center justify-center size-1.75 cursor-pointer"
            aria-label="Cor da legenda"
            @click.stop="qualifier === color ? qualifier = Qualifier.NONE : qualifier = color"
          >
            <component
              :is="color === qualifier ? IconCircleDotFilled : IconCircleFilled"
              :style="`fill:${getColor(color)}`"
            />
          </button>
        </div>
      </div>
    </template>
    <span class="size-0.25 ml-0.75 mr-1 rounded-full bg-base-200" />
    <img
      class="size-1.5 mr-0.75"
      alt="Escudo da equipe"
      :src="team?.badge || ''"
    >
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
import { getTeamById } from '@/helpers/team';

const props = defineProps<{
  position: number;
  teamId: TeamDetails['id'];
  disableQualifierSelector?: boolean;
}>();

const QUALIFIER_COLORS = [
  Qualifier.GREEN,
  Qualifier.BLUE,
  Qualifier.RED,
  Qualifier.ORANGE,
];

const popoverId = useId();
const tournamentStore = useTournamentStore();

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

.qualifier-button {
  @apply flex justify-center items-center text-[1rem] size-1.5 font-medium;
}

.standings-team::before {
  @apply content-[''] absolute left-0 h-[calc(100%-0.5rem)] w-0.25 bg-(--clr) rounded-e-md;
}
</style>
