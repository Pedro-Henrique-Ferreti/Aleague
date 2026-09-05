<template>
  <div
    class="standings-team flex items-center h-full"
    :style="`--clr: ${LEGEND_COLOR_VALUES[legend]};`"
  >
    <span
      v-if="disableLegendSelector"
      class="legend-button"
    >
      {{ position }}
    </span>
    <template v-else>
      <button
        class="legend-button btn btn-ghost p-0"
        type="button"
        :style="`anchor-name:--team-button-${popoverId}`"
        :popovertarget="popoverId"
        @click.stop
      >
        {{ position }}
      </button>
      <StandingsTableLegendPopover
        v-model:legend="legend"
        :popover-id="popoverId"
      />
    </template>
    <span class="size-0.25 ml-0.75 mr-1 rounded-full bg-base-200" />
    <TeamDetails
      v-if="team"
      :team="team"
      :show-country="tournamentStore.activeTournament?.showCountry"
    />
  </div>
</template>

<script lang="ts" setup>
import { getTeamById } from '@/helpers/team';

const props = defineProps<{
  position: number;
  teamId: TeamDetails['id'];
  disableLegendSelector?: boolean;
}>();

const tournamentStore = useTournamentStore();
const popoverId = useId();

const legend = defineModel<LegendColor>('legend', { required: true });

const team = computed(() => getTeamById(props.teamId));
</script>

<style scoped>
@reference '@/assets/css/main.css';

.legend-button {
  @apply flex justify-center items-center text-[1rem] size-1.5 font-medium;
}

.standings-team::before {
  @apply content-[''] absolute left-0 h-[calc(100%-0.5rem)] w-0.25 bg-(--clr) rounded-e-md;
}
</style>
