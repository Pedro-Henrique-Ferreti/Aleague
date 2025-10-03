<template>
  <div class="standings-team flex items-center h-full">
    <button
      class="font-medium text-[1rem] size-[1.375rem]"
      type="button"
    >
      {{ position }}
    </button>
    <span class="size-0.25 mx-1 rounded-full bg-base-200" />
    <img
      class="size-1.5 mr-0.75"
      alt="Team badge"
      :src="team?.badge || ''"
    />
    <span>{{ team?.name }}</span>
  </div>
</template>

<script lang="ts" setup>
const { getTeamById } = useTeamStore();

const props = defineProps<{
  position: number;
  teamId: TeamDetails['id'];
}>();

const team = computed(() => getTeamById(props.teamId));
</script>

<style scoped>
@reference '@/assets/css/main.css';

.standings-team::before {
  @apply content-[''] absolute left-0 h-[calc(100%-0.5rem)] w-0.25 bg-base-200 rounded-e-md;
}
</style>
