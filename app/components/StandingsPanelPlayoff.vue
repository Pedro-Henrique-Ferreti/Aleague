<template>
  <AppFilter
    v-model="selectedOption"
    class="mb-1"
    type="radio"
    input-name="rounds"
    :show-reset-button="false"
    :options="filterOptions"
  />
  <div
    v-for="slot in stage.rounds[selectedOption]?.slots"
    :key="slot.id"
    class="card card-border p-0.75 even:mb-0.75 odd:mb-1.5 last:mb-0"
  >
    <MatchCard
      layout="vertical"
      readonly
      home-team-clickable
      away-team-clickable
      :match="slot.legs[0]"
      :show-country="tournamentStore.activeTournament?.showCountry"
      :home-score="slot.legs[0].homeTeam.score"
      :away-score="slot.legs[0].awayTeam.score"
      :fixture-two-home-score="slot.legs[1]?.homeTeam.score"
      :fixture-two-away-score="slot.legs[1]?.awayTeam.score"
      :home-team-disabled="disabledTeams.includes(slot.legs[0].homeTeam.id ?? '')"
      :away-team-disabled="disabledTeams.includes(slot.legs[0].awayTeam.id ?? '')"
      @home-team-click="$event && $emit('selectTeam', $event)"
      @away-team-click="$event && $emit('selectTeam', $event)"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  stage: PlayoffStage;
  disabledTeams: Team['id'][];
}>();

defineEmits<{
  selectTeam: [Team['id']];
}>();

const tournamentStore = useTournamentStore();

const selectedOption = ref(0);

watch(() => props.stage, () => {
  selectedOption.value = 0;
});

const filterOptions = computed(() => {
  return props.stage.rounds.map((round, index) => ({
    label: round.name,
    value: index,
  }));
});
</script>
