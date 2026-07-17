<template>
  <div
    class="standings-team flex items-center h-full"
    :style="`--clr: ${legend};`"
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
import { getTeamById } from '@/helpers/team';

const props = defineProps<{
  position: number;
  teamId: TeamDetails['id'];
  disableLegendSelector?: boolean;
}>();

const popoverId = useId();
const tournamentStore = useTournamentStore();

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
