<template>
  <div class="flex flex-col gap-0.5 items-center w-4.5 text-center text-xs">
    <span>Rodada {{ form.week }}</span>
    <img
      class="size-1.75"
      alt="Team badge"
      :src="team?.badge"
    >
    <span class="font-semibold text-[0.625rem]">{{ team?.name }}&nbsp;{{ isHomeTeam ? '(C)' : '(F)' }}</span>
    <div
      class="w-full mt-auto text-white font-medium rounded-b-lg"
      :class="bgColor"
    >
      {{ form.match.homeTeam.score }} - {{ form.match.awayTeam.score }}
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  form: TableEntryForm;
  teamId: TableEntry['team'];
}>();

const { getTeamById } = useTeamStore();

const isHomeTeam = computed(() => props.form.match.homeTeam.id === props.teamId);

const team = computed(() => {
  const { homeTeam, awayTeam } = props.form.match;
  return getTeamById((props.teamId === homeTeam.id) ? awayTeam.id : homeTeam.id);
});

const bgColor = computed(() => {
  switch (props.form.result) {
    case MatchResult.WON:
      return 'bg-green-700';
    case MatchResult.LOST:
      return 'bg-[#E73737]';
    case MatchResult.DRAW:
    default:
      return 'bg-gray-400';
  }
});
</script>
