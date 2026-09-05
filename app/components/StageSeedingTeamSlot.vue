<template>
  <div class="flex gap-0.5 w-full h-2.5 p-0.5 border border-dashed border-base-200 rounded-lg items-center">
    <span
      v-if="!team"
      class="opacity-60"
    >
      Em aberto
    </span>
    <template v-else>
      <TeamDetails
        :team="team"
        :show-country="tournamentStore.activeTournament?.showCountry"
      />
      <CloseButton
        class="btn-xs ml-auto"
        aria-label="Remover equipe"
        @click="$emit('remove')"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { getTeamById } from '@/helpers/team';

const props = defineProps<{
  teamId: Team['id'] | null;
}>();

defineEmits<{ remove: [] }>();

const tournamentStore = useTournamentStore();

const team = computed(() => props.teamId ? getTeamById(props.teamId) : null);
</script>
